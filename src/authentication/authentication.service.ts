import {
  BadRequestException,
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { pickBy, identity } from 'lodash';
import { Repository } from 'typeorm';
import { Cache as CacheManager } from 'cache-manager';
import * as DayJs from 'dayjs';

import { IObject } from '../../definition';
import { UserType } from '../models/user-type/entities/user-type.entity';
import { User } from '../models/users/entities/user.entity';
import { UsersRepository } from '../models/users/users.repository';
import { PhoneNumberService } from '../providers/phone/phone.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AppConfigService } from '../config/app/config.service';
import { PasswordResetInitiateDTO } from './dto/password-reset-initiate.dto';
import { randomIntFromInterval } from '../common/utils/number';
import { PasswordResetCompleteDTO } from './dto/password-reset-complete.dto';

/**
 *
 *
 * @export
 * @class AuthenticationService
 */
@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
    private readonly phoneNumberService: PhoneNumberService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheManager,
  ) {}

  /**
   * @name loginUser
   * @description Service method for authenticating a user.
   *
   * @param {LoginDto} payload
   * @return {*}  {Promise<any>}
   * @memberof AuthenticationService
   */
  async loginUser(data: LoginDto): Promise<string> {
    const user = await this.validateUser({ ...data, isLogin: true });
    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      { expiresIn: this.appConfigService.jwtExpires },
    );
    return token;
  }

  /**
   * @name passwordResetComplete
   * @description Service method for initiating user password reset.
   *
   * @param {PasswordResetInitiateDTO} payload
   * @return {*}  {Promise<any>}
   * @memberof AuthenticationService
   */
  async passwordResetComplete(
    payload: PasswordResetCompleteDTO,
  ): Promise<void> {
    this.phoneNumberService
      .parsePhoneNumber(payload.phoneNumber)
      .validateNumber({ throwError: true });

    const user = await this.validateUser(payload);
    const key = 'password-reset-' + user.id;
    const checkExists = JSON.parse(await this.cacheManager.get(key));

    if (!checkExists) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'You are not authorized to complete this request.',
      });
    }

    if (checkExists.code !== payload.code) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid authorization code.',
      });
    }

    await this.usersRepository.update(
      { id: user.id },
      { password: await bcrypt.hash(payload.password, 10) },
    );
    await this.cacheManager.del(key);

    // TODO: Send password change mail success
  }

  /**
   * @name passwordResetInitiate
   * @description Service method for initiating user password reset.
   *
   * @param {PasswordResetInitiateDTO} payload
   * @return {*}  {Promise<any>}
   * @memberof AuthenticationService
   */
  async passwordResetInitiate(
    payload: PasswordResetInitiateDTO,
  ): Promise<IObject> {
    this.phoneNumberService
      .parsePhoneNumber(payload.phoneNumber)
      .validateNumber({ throwError: true });
    const user = await this.validateUser(payload);

    const key = 'password-reset-' + user.id;
    let ttl = this.appConfigService.passwordResetTTL;
    const checkExists = JSON.parse(await this.cacheManager.get(key));
    if (checkExists?.date) {
      console.log(checkExists);
      ttl =
        ttl - DayJs(new Date().toUTCString()).diff(checkExists.date, 'seconds');
    } else {
      const code = randomIntFromInterval(100000, 999999);
      await this.cacheManager.set(
        key,
        JSON.stringify({ code, date: new Date() }),
        {
          ttl,
        },
      );
      //TODO: Set job for sending sms notification
    }
    return { ttl };
  }

  /**
   * @name signUpUser
   * @description Service method for creating a user account.
   *
   * @param {SignUpDto} payload
   * @return {*}  {Promise<any>}
   * @memberof AuthenticationService
   */
  async signUpUser(payload: SignUpDto): Promise<void> {
    this.phoneNumberService
      .parsePhoneNumber(payload.phoneNumber)
      .validateNumber({ throwError: true });

    const checkUserExist = await this.usersRepository.findOne({
      where: [{ phoneNumber: payload.phoneNumber }, { email: payload.email }],
    });

    if (checkUserExist) {
      throw new ConflictException({
        statusCode: 409,
        message: `${
          (checkUserExist.email === payload.email
            ? 'Email'
            : checkUserExist.phoneNumber === payload.phoneNumber
            ? 'Phone number'
            : '') + ' field already in use.'
        }`,
      });
    }

    const userType = await this.userTypeRepository.findOne({
      where: { slug: payload.scope },
    });

    if (!userType) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        errors: {
          scope: 'Invalid account scope.',
        },
        type: 'validation',
      });
    }

    try {
      const user = new User();
      Object.assign(
        user,
        {},
        {
          ...payload,
          userType,
        },
      );
      await this.usersRepository.save(user);
    } catch (error) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        message: {
          scope: 'Invalid account scope.',
        },
      });
    }
  }

  /**
   * @name validateUser
   * @description Service method for validating a user credentials.
   *
   * @param {IObject} payload
   * @return {*}  {Promise<any>}
   * @memberof AuthenticationService
   */
  async validateUser(payload: IObject): Promise<User> {
    const { password, phoneNumber, isLogin, id, email = null } = payload;

    const phoneValidation = this.phoneNumberService.parsePhoneNumber(
      phoneNumber,
    );

    phoneValidation.validateNumber({
      number: phoneValidation.number,
      throwError: true,
    });

    const user = await this.usersRepository.findOne({
      where: [
        isLogin
          ? { phoneNumber }
          : pickBy({ id, email, phoneNumber }, identity),
      ],
    });

    if (isLogin) {
      const checkPassword = await bcrypt.compare(
        password,
        user?.password || '',
      );
      if (!user || !checkPassword) {
        throw new UnauthorizedException({
          statusCode: 401,
          message: 'Credentials do not match available records.',
        });
      }
    } else {
      if (!user) {
        throw new UnauthorizedException({
          statusCode: 401,
          message: 'You are unauthorized for this request.',
        });
      }
    }
    return user;
  }
}
