import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePayments1648774885884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE method_options AS ENUM ('cash', 'credit_card', 'pix');
      CREATE TABLE payments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        method method_options NOT NULL,
        installments int,
        card_number varchar(255),
        printed_name varchar(255),
        due_date varchar(255),
        security_code varchar(255),
        user_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp, 
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE payments; DROP TYPE method_options');
  }
}
