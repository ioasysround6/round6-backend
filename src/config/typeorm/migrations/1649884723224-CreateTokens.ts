import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTokens1649884723224 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE tokens (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        hash varchar(255) NOT NULL,
        user_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE tokens');
  }
}
