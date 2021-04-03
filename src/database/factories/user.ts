import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../models/users/entities/user.entity';

define(User, (faker: typeof Faker) => {
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
