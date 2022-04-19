import { hashSync } from 'bcrypt';
import { Role } from '../../enum/role.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

const hashedPassword = hashSync(process.env.TOURIST1_PASSWORD, 10);

export class InsertTouristOne1648842847683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users(id, first_name, last_name, email, password, birth_date, photo, role) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        process.env.TOURIST1_ID,
        process.env.TOURIST1_FIRST_NAME,
        process.env.TOURIST1_LAST_NAME,
        process.env.TOURIST1_EMAIL,
        hashedPassword,
        process.env.TOURIST1_BIRTH_DATE,
        process.env.TOURIST1_PHOTO,
        Role.Tourist,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE id, first_name, last_name, email, password, birth_date, photo, role = $1, $2, $3, $4, $5, $6, $7, $8`,
      [
        process.env.TOURIST1_ID,
        process.env.TOURIST1_FIRST_NAME,
        process.env.TOURIST1_LAST_NAME,
        process.env.TOURIST1_EMAIL,
        hashedPassword,
        process.env.TOURIST1_BIRTH_DATE,
        process.env.TOURIST1_PHOTO,
        Role.Tourist,
      ],
    );
  }
}
