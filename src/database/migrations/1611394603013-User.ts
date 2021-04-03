import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class User1611394603013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'userTypeId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'accountStatus',
            type: 'enum',
            enum: ['pending', 'active', 'restricted', 'blacklisted'],
            default: [`'pending'`],
          },
          {
            name: 'emailVerifiedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'phoneNumberVerifiedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP(6)',
            onUpdate: 'CURRENT_TIMESTAMP(6)',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['userTypeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user-types',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userTypeId') !== -1,
    );
    await queryRunner.dropForeignKey('users', foreignKey);
    await queryRunner.dropTable('users');
  }
}
