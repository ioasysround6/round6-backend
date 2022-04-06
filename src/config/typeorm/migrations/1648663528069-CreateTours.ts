import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTours1648663528069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE tours (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        community_name varchar(255) NOT NULL,
        description text NOT NULL,
        accommodation text NOT NULL,
        activities text NOT NULL,
        travel_date text NOT NULL,
        hint text NOT NULL,
        price decimal(10, 2) NOT NULL,
        vacancies int NOT NULL,
        photo1 varchar(255),
        photo2 varchar(255),
        photo3 varchar(255),
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
