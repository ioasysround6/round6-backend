import { MigrationInterface, QueryRunner } from 'typeorm';

const communityName = 'Serra do Paraíso';
const description =
  'Uma comunidade quilombola que vive da agricultura familiar na Bahia. É uma comunidade bastante tradicional e com muita cultura';
const localization =
  'A comunidade de Serra do Paraíso fica localizada na cidade de Jacobina no interior da Bahia a 5h de Salvador';
const mainActivities =
  'A comunidade de Serra do Paraíso vive da agricultura familiar, destacando-se principalmente o plantio de frutas, café e milho. Toda a família participa da atividade';
const curiosities =
  'A comunidade tem origem desde a época da colonização no Brasil e carrega até hoje traços culturais muito fortes da sua origem. Todas as famílias são muito engajadas e são muito comuns as festas na comunidade com muita música e danças';
const photo = 'link da foto da comunidade Serra do Paraíso';

export class InsertStoryThree1649373119197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO stories(community_name, description, localization, main_activities, curiosities, photo) VALUES($1, $2, $3, $4, $5, $6)`,
      [
        communityName,
        description,
        localization,
        mainActivities,
        curiosities,
        photo,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM stories WHERE community_name, description, localization, main_activities, curiosities, photo = $1 $2, $3, $4, $5, $6`,
      [
        communityName,
        description,
        localization,
        mainActivities,
        curiosities,
        photo,
      ],
    );
  }
}