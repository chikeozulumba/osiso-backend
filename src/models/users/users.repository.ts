import { EntityRepository } from 'typeorm';
import { ModelsRepository } from '../models.repository';
import { User } from './entities/user.entity';
import { UserEntity } from './serializers/users.serializer';

@EntityRepository(User)
export class UsersRepository extends ModelsRepository<User, UserEntity> {}
