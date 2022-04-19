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
const photo1 = 'https://i.imgur.com/cKmz4Nx.png';
const photo2 = 'https://i.imgur.com/aENC1E6.png';

export class InsertStoryTwo1649363788776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO stories(community_name, description, localization, main_activities, curiosities, photo1, photo2, tour_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        communityName,
        description,
        localization,
        mainActivities,
        curiosities,
        photo1,
        photo2,
        process.env.ID_TOUR_TWO,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM stories WHERE community_name, description, localization, main_activities, curiosities, photo1, photo2, tour_id = $1, $2, $3, $4, $5, $6, $7, $8`,
      [
        communityName,
        description,
        localization,
        mainActivities,
        curiosities,
        photo1,
        photo2,
        process.env.ID_TOUR_TWO,
      ],
    );
  }
}
