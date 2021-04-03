import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Country1612699518477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'countries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'continent',
            type: 'varchar',
          },
          {
            name: 'capital',
            type: 'varchar',
          },
          {
            name: 'currency',
            type: 'varchar',
          },
          {
            name: 'emoji',
            type: 'varchar',
          },
          {
            name: 'languages',
            type: 'varchar',
            isArray: true,
          },
          {
            name: 'emojiU',
            type: 'varchar',
          },
          {
            name: 'slug',
            type: 'varchar',
          },
          {
            name: 'alphaTwo',
            type: 'varchar',
          },
          {
            name: 'alphaThree',
            type: 'varchar',
          },
          {
            name: 'resourceUri',
            type: 'varchar',
          },
          {
            name: 'active',
            type: 'int2',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('countries');
  }
}
