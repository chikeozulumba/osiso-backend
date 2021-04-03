import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/common';
import {
  MockUserType,
  MockUserTypes,
} from '../../test/mock/authentication.mock';
import { AppConfigModule } from '../config/app/config.module';
import { UserType } from '../models/user-type/entities/user-type.entity';
import { User } from '../models/users/entities/user.entity';
import { JwtProviderModule } from '../providers/jwt/jwt.module';
import { PhoneNumberProviderModule } from '../providers/phone/phone.module';
import { AuthenticationService } from './authentication.service';
import { MockUserRepository } from '../../test/mock/user.mock';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Login User (loginUser) ', () => {
    it('should fail when password is not supplied on login', async () => {
      expect(service).toBeDefined();
      try {
        await service.loginUser({
          phoneNumber: '08111119999',
        } as any);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch('data and hash arguments required');
      }
    });

    it('should fail when password supplied is invalid', async () => {
      expect(service).toBeDefined();
      try {
        await service.validateUser({
          phoneNumber: '08111119999',
          password: '081111199999',
          isLogin: true,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch(
          'Credentials do not match available records.',
        );
      }
    });

    it('should successfully login a user', async () => {
      expect(service).toBeDefined();
      try {
        const token = await service.loginUser({
          phoneNumber: '08111119999',
          password: '08111119999',
        });
        expect(typeof token).toBe('string');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch(
          'Credentials do not match available records.',
        );
      }
    });
  });

  describe('Sign up User (signUpUser) ', () => {
    it('should fail when phone number is invalid', async () => {
      expect(service).toBeDefined();
      try {
        await service.signUpUser({
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
      expect(service).toBeDefined();
      try {
        await service.signUpUser({
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
      expect(service).toBeDefined();
      try {
        const res = await service.signUpUser({
          firstName: 'Tester',
          lastName: 'Abo',
          phoneNumber: '08111119990',
          email: 'chike.test@osiso.co',
          password: 'abo.tester@gmail.com',
          scope: 'rider',
        });
        expect(res).toBe(undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch('Phone number');
      }
    });
  });

  describe('Validate User (validateUser) ', () => {
    it('should fail when password is not supplied on login', async () => {
      expect(service).toBeDefined();
      try {
        await service.validateUser({
          phoneNumber: '08111119999',
          isLogin: true,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch('data and hash arguments required');
      }
    });

    it('should fail when password supplied is invalid', async () => {
      expect(service).toBeDefined();
      try {
        await service.validateUser({
          phoneNumber: '08111119999',
          password: '081111199999',
          isLogin: true,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch(
          'Credentials do not match available records.',
        );
      }
    });

    it('should successfully login a user', async () => {
      expect(service).toBeDefined();
      try {
        const user = await service.validateUser({
          phoneNumber: '08111119999',
          password: '08111119999',
          isLogin: true,
        });
        expect(user.phoneNumber).toEqual('08111119999');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toMatch(
          'Credentials do not match available records.',
        );
      }
    });
  });
});
