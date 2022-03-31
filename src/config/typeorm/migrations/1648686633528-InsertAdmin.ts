import { hashSync } from 'bcrypt';
import { Role } from '../../enum/role.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

const adminPassword = process.env.ADMIN_PASSWORD;
const hashedPassword = hashSync(adminPassword, 10);

export class InsertAdmin1648686633528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users(id, first_name, last_name, email, password, birth_date, role, created_at, updated_at) VALUES(uuid_generate_v4(), '${process.env.ADMIN_FIRST_NAME}', '${process.env.ADMIN_LAST_NAME}', '${process.env.ADMIN_EMAIL}', '${hashedPassword}', '${process.env.ADMIN_BIRTH_DATE}', '${Role.Admin}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE id, first_name, last_name, email, password, birth_date, role, created_at, updated_at = uuid_generate_v4(), '${process.env.ADMIN_FIRST_NAME}', '${process.env.ADMIN_LAST_NAME}', '${process.env.ADMIN_EMAIL}', '${hashedPassword}', '${process.env.ADMIN_BIRTH_DATE}', '${Role.Admin}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP`,
    );
  }
}