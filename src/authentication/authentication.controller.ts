import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../common/guards/authentication/local.guard';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { LoginUserValidation } from '../common/validations/authentication/login.validation';
import { SignUpUserValidation } from '../common/validations/authentication/signup.validation';
import { Public } from '../common/decorators/authentication/user/api/route.decorator';
import { IObject, IResponse, IResponseData } from '../../definition';
import { PasswordResetInitiateDTO } from './dto/password-reset-initiate.dto';
import { PasswordResetInitiateValidation } from '../common/validations/authentication/password-reset-initiate.validation';
import { PasswordResetCompleteValidation } from '../common/validations/authentication/password-reset-complete.validation';
import { PasswordResetCompleteDTO } from './dto/password-reset-complete.dto';

/**
 *
 *
 * @export
 * @class AuthenticationController
 */
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  /**
   * @name LoginUser
   * @description Authentication method that handles route for authorizing a user
   *
   * @param {LoginDto} body
   * @return {*}
   * @memberof AuthenticationController
   */
  @Public()
  @Post('/login')
  @HttpCode(200)
  async LoginUser(
    @Body(new JoiValidationPipe(LoginUserValidation))
    body: LoginDto,
  ): Promise<IResponse<IResponseData>> {
    const data: string = await this.authenticationService.loginUser(body);
    return {
      statusCode: 200,
      status: 'success',
      data: {
        token: data,
      },
    };
  }

  /**
   * @name SignUpUser
   * @description Authentication method that handles route for creating a user account
   *
   * @param {SignUpDto} body
   * @return {*}
   * @memberof AuthenticationController
   */
  @Public()
  @Post('/signup')
  @HttpCode(201)
  async SignUpUser(
    @Body(new JoiValidationPipe(SignUpUserValidation))
    body: SignUpDto,
  ): Promise<IResponse<void>> {
    await this.authenticationService.signUpUser(body);
    return {
      statusCode: 201,
      status: 'success',
      message: 'Account created successfully',
    };
  }

  /**
   * @name ResetUserPasswordComplete
   * @description Authentication method that handles route for completing user password reset
   *
   * @param {PasswordResetCompleteDTO} body
   * @return {*}
   * @memberof AuthenticationController
   */
  @Public()
  @Post('/password/reset/complete')
  async ResetUserPasswordComplete(
    @Body(new JoiValidationPipe(PasswordResetCompleteValidation))
    body: PasswordResetCompleteDTO,
  ): Promise<IResponse<void>> {
    await this.authenticationService.passwordResetComplete(body);
    return {
      statusCode: 200,
      status: 'success',
    };
  }

  /**
   * @name ResetUserPasswordInitiate
   * @description Authentication method that handles route for resetting user password
   *
   * @param {PasswordResetInitiateDTO} body
   * @return {*}
   * @memberof AuthenticationController
   */
  @Public()
  @Post('/password/reset')
  async ResetUserPasswordInitiate(
    @Body(new JoiValidationPipe(PasswordResetInitiateValidation))
    body: PasswordResetInitiateDTO,
  ): Promise<IResponse<IObject>> {
    const data = await this.authenticationService.passwordResetInitiate(body);
    return {
      statusCode: 200,
      status: 'success',
      data,
    };
  }
}
