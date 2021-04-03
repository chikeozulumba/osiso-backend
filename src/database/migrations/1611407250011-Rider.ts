import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Rider1611407250011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'riders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'nin',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'motorcycleName',
            type: 'varchar',
          },
          {
            name: 'motorcycleModel',
            type: 'varchar',
          },
          {
            name: 'motorcycleRegisterationNumber',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'motorcycleRegisterationState',
            type: 'varchar',
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
      'riders',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('riders');
  }
}
