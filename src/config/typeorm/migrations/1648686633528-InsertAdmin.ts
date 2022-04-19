import { hashSync } from 'bcrypt';
import { Role } from '../../enum/role.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

const hashedPassword = hashSync(process.env.ADMIN_PASSWORD, 10);

export class InsertAdmin1648686633528 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users(first_name, last_name, email, password, birth_date, photo, role) VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [
        process.env.ADMIN_FIRST_NAME,
        process.env.ADMIN_LAST_NAME,
        process.env.ADMIN_EMAIL,
        hashedPassword,
        process.env.ADMIN_BIRTH_DATE,
        process.env.ADMIN_PHOTO,
        Role.Admin,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE first_name, last_name, email, password, birth_date, photo, role = $1, $2, $3, $4, $5, $6, $7`,
      [
        process.env.ADMIN_FIRST_NAME,
        process.env.ADMIN_LAST_NAME,
        process.env.ADMIN_EMAIL,
        hashedPassword,
        process.env.ADMIN_BIRTH_DATE,
        process.env.ADMIN_PHOTO,
        Role.Admin,
      ],
    );
  }
}
