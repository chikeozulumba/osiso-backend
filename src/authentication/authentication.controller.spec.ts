import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MockUserTypes,
  MockUserType,
} from '../../test/mock/authentication.mock';
import { MockUserRepository } from '../../test/mock/user.mock';
import { AppConfigModule } from '../config/app/config.module';
import { UserType } from '../models/user-type/entities/user-type.entity';
import { User } from '../models/users/entities/user.entity';
import { JwtProviderModule } from '../providers/jwt/jwt.module';
import { PhoneNumberProviderModule } from '../providers/phone/phone.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      imports: [PhoneNumberProviderModule, JwtProviderModule, AppConfigModule],
      providers: [
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: async (param: any) => Promise.resolve(param),
            set: async () => Promise.resolve(jest.fn()),
            del: async () => Promise.resolve(jest.fn().mockResolvedValue(true)),
          },
        },
        AuthenticationService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(UserType),
          useValue: {
            find: jest.fn().mockResolvedValue(MockUserTypes),
            findOne: jest.fn().mockResolvedValue(MockUserType),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  describe('Login User (loginUser) ', () => {
    it('should fail when password is not supplied on login', async () => {
      expect(controller).toBeDefined();
      try {
        await controller.LoginUser({
          phoneNumber: '08111119999',
        } as any);
      } catch (error) {
        expect(error.message).toMatch('data and hash arguments required');
      }
    });

    it('should fail when password supplied is invalid', async () => {
      expect(controller).toBeDefined();
      try {
        await controller.LoginUser({
          phoneNumber: '08111119999',
          password: '081111199999',
        });
      } catch (error) {
        expect(error.message).toMatch(
          'Credentials do not match available records.',
        );
      }
    });

    it('should successfully login a user', async () => {
      expect(controller).toBeDefined();
      const response = await controller.LoginUser({
        phoneNumber: '08111119999',
        password: '08111119999',
      });
      expect(typeof response).toBe('object');
      expect(response).toHaveProperty('statusCode');
      expect(response).toHaveProperty('data');
      expect(response.data).toHaveProperty('token');
      expect(response.statusCode).toBe(200);
      expect(typeof response.data.token).toBe('string');
    });
  });

  describe('Sign up User (SignUpUser) ', () => {
    it('should fail when phone number is invalid', async () => {
      expect(controller).toBeDefined();
      try {
        await controller.SignUpUser({
          firstName: 'Tester',
          lastName: 'Abo',
          phoneNumber: '0811111999999a',
          email: 'abo.tester@gmail.com',
          password: 'abo.tester@gmail.com',
          scope: 'rider',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch('Unprocessable Entity Exception');
      }
    });

    it('should fail when phone number is in use', async () => {
      expect(controller).toBeDefined();
      try {
        await controller.SignUpUser({
          firstName: 'Tester',
          lastName: 'Abo',
          phoneNumber: '08111119999',
          email: 'abo.tester@gmail.com',
          password: 'abo.tester@gmail.com',
          scope: 'rider',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch('Phone number');
      }
    });

    it('should successfully sign up a user', async () => {
      expect(controller).toBeDefined();
      const res = await controller.SignUpUser({
        firstName: 'Tester',
        lastName: 'Abo',
        phoneNumber: '08111119990',
        email: 'chike.test@osiso.co',
        password: 'abo.tester@gmail.com',
        scope: 'rider',
      });
      expect(typeof res).toBe('object');
      expect(res).toHaveProperty('status');
      expect(res.status).toBe('success');
      expect(res.statusCode).toBe(201);
    });
  });
});
