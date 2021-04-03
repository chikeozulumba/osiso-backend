import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import slugify from 'slugify';
import { UserType } from '../../models/user-type/entities/user-type.entity';

const UserTypeData = [
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
}));

export default class UserTypeSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserType)
      .values(UserTypeData)
      .execute();
  }
}

exports = { UserTypeData };
