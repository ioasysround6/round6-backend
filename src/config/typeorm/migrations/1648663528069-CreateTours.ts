import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTours1648663528069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE tours (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name varchar(255) NOT NULL,
        long_description text NOT NULL,
        short_description text NOT NULL,
        accommodation varchar(255) NOT NULL,
        activity varchar(255) NOT NULL,
        date varchar(100) NOT NULL,
        hint varchar(255) NOT NULL,
        price decimal(10, 2) NOT NULL,
        photo varchar(255),
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp 
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE tours');
  }
}
