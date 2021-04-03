import * as Faker from 'faker';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { IObject } from '../../definition';
import { User } from '../../src/models/users/entities/user.entity';
import { FindOneOptions } from 'typeorm';

export const MockAuthenticatedUsers = Array(5).map((faker: typeof Faker) => {
  const user = new User();
  user.id = uuidv4();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.email();
  user.phoneNumber = faker.phone.phoneNumber();
  user.password = 'Password.';
  user.accountStatus = 'pending';
  return user;
});

export const MockAuthenticatedUser = async () => {
  const user = new User();
  user.id = uuidv4();
  user.firstName = 'Chike';
  user.lastName = 'Ozulumba';
  user.email = 'chike.test@osiso.co';
  user.phoneNumber = '08111119999';
  user.password = await bcrypt.hash('08111119999', 10);
  user.accountStatus = 'pending';
  return user;
};

const MockDB = [...MockAuthenticatedUsers, MockAuthenticatedUser()];

export class MockUserRepository {
  find(): any[] {
    return MockDB;
  }

  async findOne(params: FindOneOptions | any) {
    // console.log(params);
    const user = await MockAuthenticatedUser();
    if (Array.isArray(params.where)) {
      for (let p = 0; p < params.where.length; p++) {
        const param = params.where[p];
        return user.phoneNumber === param.phoneNumber ||
          user.email === param.email
          ? user
          : null;
      }
    } else {
      return user.phoneNumber === params.where.phoneNumber ||
        user.email === params.where.email
        ? user
        : null;
    }
  }

  save(params: IObject) {
    return { ...MockAuthenticatedUser(), ...params };
  }

  update(query, params: IObject) {
    return { ...MockAuthenticatedUser(), ...params };
  }
}
