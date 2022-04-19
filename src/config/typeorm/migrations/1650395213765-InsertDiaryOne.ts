import { MigrationInterface, QueryRunner } from 'typeorm';

const title = 'Experiência incrível!!';
const content =
  'Fiz o passeio para Serra do Paraíso na semana passada com um amigo! Cada um ficou na casa de uma família por lá e foi simplesmente INCRÍVEL! Ajudamos na colheita da estação, participamos dos eventos da comunidade e todos foram muito receptivos com a gente. Fizemos muitoas amizades por lá!';

export class InsertDiaryOne1650395213765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO diares(title, content, user_id) VALUES($1, $2, $3)`,
      [title, content, process.env.TOURIST1_ID],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM diares WHERE title, content, user_id = $1, $2, $3`,
      [title, content, process.env.TOURIST1_ID],
    );
  }
}
