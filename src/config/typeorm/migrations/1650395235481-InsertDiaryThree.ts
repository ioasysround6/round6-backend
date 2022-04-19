import { MigrationInterface, QueryRunner } from 'typeorm';

const title = 'Superou todas as expectativas!';
const content =
  'Foi a primeira vez que fiz uma viagem com o conceito de base comunitária. Fui com um grupo de amigos para a comunidade do Mato Serrado no Ceará e foi muito boa a experiência, muito melhor do que eu imaginava. Acho que fazer viagem de turismo tradicional até vai ficar sem graça daqui pra frente! Kkkkkkk';
const photo = 'https://i.imgur.com/X2hsnFR.png';

export class InsertDiaryThree1650395235481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO diares(title, content, photo, user_id) VALUES($1, $2, $3, $4)`,
      [title, content, photo, process.env.TOURIST3_ID],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM diares WHERE title, content, photo, user_id = $1, $2, $3, $4`,
      [title, content, photo, process.env.TOURIST3_ID],
    );
  }
}
