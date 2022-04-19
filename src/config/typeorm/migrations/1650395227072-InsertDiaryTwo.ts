import { MigrationInterface, QueryRunner } from 'typeorm';

const title = 'Façam o passeio de barco para Anavilhanas';
const content =
  'Gentee, só façam esse passeio!! Nunca vi uma viagem igual a essa na minha vida. O barco passa em várias comunidades que ficam no Rio Negro. Pudemos participar de atividades de marcenaria em Araçari, fiz um banquinho de madeira lindo que trouxe comigo! Foi demais';
const photo = 'https://i.imgur.com/6PTwb6n.png';

export class InsertDiaryTwo1650395227072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO diares(title, content, photo, user_id) VALUES($1, $2, $3, $4)`,
      [title, content, photo, process.env.TOURIST2_ID],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM diares WHERE title, content, photo, user_id = $1, $2, $3, $4`,
      [title, content, photo, process.env.TOURIST2_ID],
    );
  }
}
