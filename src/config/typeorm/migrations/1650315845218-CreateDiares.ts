import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDiares1650315845218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE diares (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title varchar(255) NOT NULL,
        content text NOT NULL,
        photo varchar(255),
        user_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE diares');
  }
}
