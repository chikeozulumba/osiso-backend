import * as Faker from 'faker';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../src/models/users/entities/user.entity';

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

export const MockAuthenticatedUser = () => {
  const user = new User();
  user.id = uuidv4();
  user.firstName = 'Chike';
  user.lastName = 'Ozulumba';
  user.email = 'chike.test@osiso.co';
  user.phoneNumber = '08131976306';
  user.password = 'Password.';
  user.accountStatus = 'pending';
  return user;
};

export const MockUserTypes = [
  {
    name: 'Rider',
  },
  {
    name: 'Customer',
  },
].map((td) => ({
  slug: slugify(td.name, {
    replacement: '-',
    lower: true,
  }),
  ...td,
  id: uuidv4(),
}));

export const MockUserType = [
  {
    name: 'Rider',
  },
  {
    name: 'Customer',
  },
].map((td) => ({
  slug: slugify(td.name, {
    replacement: '-',
    lower: true,
  }),
  ...td,
  id: uuidv4(),
}));
