import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStories1649014853479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE stories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        community_name varchar(255) NOT NULL,
        description text NOT NULL,
        localization varchar(255) NOT NULL,
        main_activities text NOT NULL,
        curiosities text NOT NULL,
        photo varchar(255) NOT NULL,
        user_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE stories');
  }
}
