import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { shuffle } from '../../common/utils/array';
import { UserType } from '../../models/user-type/entities/user-type.entity';
import { User } from '../../models/users/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const userTypes = await connection.manager.getRepository(UserType).find();
    await factory(User)()
      .map(async (user: User) => {
        const type: UserType = shuffle(userTypes)[0];
        user.userType = type;
        return user;
      })
      .createMany(2);
  }
}
