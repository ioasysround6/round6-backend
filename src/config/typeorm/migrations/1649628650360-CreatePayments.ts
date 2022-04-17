import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePayments1649628650360 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE method_options AS ENUM ('cash', 'credit_card', 'pix');
      CREATE TABLE payments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        method method_options NOT NULL,
        installments int,
        installment_value decimal(10, 2),
        card_number varchar(255),
        printed_name varchar(255),
        due_date varchar(250),
        security_code varchar(255),
        order_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE payments; DROP TYPE method_options');
  }
}
