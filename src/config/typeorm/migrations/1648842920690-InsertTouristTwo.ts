import { hashSync } from 'bcrypt';
import { Role } from '../../enum/role.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

const hashedPassword = hashSync(process.env.TOURIST2_PASSWORD, 10);

export class InsertTouristTwo1648842920690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users(first_name, last_name, email, password, birth_date, role) VALUES($1, $2, $3, $4, $5, $6)`,
      [
        process.env.TOURIST2_FIRST_NAME,
        process.env.TOURIST2_LAST_NAME,
        process.env.TOURIST2_EMAIL,
        hashedPassword,
        process.env.TOURIST2_BIRTH_DATE,
        Role.Tourist,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE first_name, last_name, email, password, birth_date, role = $1 $2, $3, $4, $5, $6`,
      [
        process.env.TOURIST2_FIRST_NAME,
        process.env.TOURIST2_LAST_NAME,
        process.env.TOURIST2_EMAIL,
        hashedPassword,
        process.env.TOURIST2_BIRTH_DATE,
        Role.Tourist,
      ],
    );
  }
}
