import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStories1649014853479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE stories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        community_name varchar(255) NOT NULL,
        description text NOT NULL,
        localization text NOT NULL,
        main_activities text,
        curiosities text,
        photo1 varchar(255) NOT NULL,
        photo2 varchar(255) NOT NULL,
        tour_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE stories');
  }
}
