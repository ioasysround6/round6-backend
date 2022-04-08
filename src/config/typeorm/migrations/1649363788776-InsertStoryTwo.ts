import { MigrationInterface, QueryRunner } from 'typeorm';

const communityName = 'Araçari';
const description =
  'Uma comunidade bem pequena próxima a Boa Vista no Amazonas, pouco conhecida, mas com paisagens incríveis!';
const localization =
  'A comunidade de Araçari fica as margens do Rio Negro e faz parte do Arquipélago de Anavilhanas';
const mainActivities =
  'A comunidade de Araçari vive principalmente da pesca no Rio Negro e da produção de peças de artesanato de madeira que é extraído da própria região';
const curiosities =
  'Um produto comercializado que garante a subsistência dos moradores locais são palitos de churrasco, que são produzidos também com recursos da região. A comunidade recebe o nome em homenagem à ave Araçari típica da região';
const photo = 'link da foto da comunidade Araçari';

export class InsertStoryTwo1649363788776 implements MigrationInterface {
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
