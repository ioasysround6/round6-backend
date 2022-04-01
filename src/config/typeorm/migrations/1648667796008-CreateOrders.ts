import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrders1648667796008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE orders (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        amount_people int NOT NULL,
        user_id uuid,
        tour_id uuid,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (tour_id) REFERENCES tours(id)  
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE orders');
  }
}
