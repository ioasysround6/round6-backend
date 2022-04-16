import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCheckouts1649629621060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE checkouts (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        first_name varchar(255) NOT NULL,
        last_name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        birth_date date NOT NULL,
        cpf varchar(255) NOT NULL,
        order_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE checkouts');
  }
}
