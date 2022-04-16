import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrders1648667796008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE orders (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        amount_people int NOT NULL,
        total_cost decimal(10, 2) NOT NULL,
        user_id UUID,
        tour_id UUID,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE SET NULL 
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE orders');
  }
}
