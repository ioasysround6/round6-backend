import { MigrationInterface, QueryRunner } from 'typeorm';

export class ControlVacanciesTrigger1648850248059
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TRIGGER tr_control_vacancies
      AFTER INSERT OR UPDATE OR DELETE ON orders
      FOR EACH ROW
      EXECUTE PROCEDURE control_vacancies();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER tr_control_vacancies
      ON orders
    `);
  }
}
