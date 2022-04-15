import { MigrationInterface, QueryRunner } from 'typeorm';

const communityName = 'Mato Serrado';
const description =
  'Uma comunidade centenária e um local fantástico repleto de figuras icônicas no artesanato cearense';
const localization =
  'Mato Serrado fica localizada em Crato, a 8 horas de Fortaleza no estado do Ceará';
const mainActivities =
  'Cerca de 60% dos moradores de Mato vivem exclusivamente da fabricação artesanal de peças de Argila. Você encontra desde pequenos utensílios (Vasos, panelas e filtros) até Carrancas de 2 metros de altura';
const curiosities =
  'O museu Argilas Vivas é um ponto turístico da comunidade, onde você pode conhecer projetos locais da associação de produtores de artesanato de barro do Ceará. A comunidade também possui uma escola de música que utiliza instrumentos musicais feitos com argila';
const photo1 = 'https://i.imgur.com/sXAMdo3.png';
const photo2 = 'https://i.imgur.com/GNCmSzR.png';

export class InsertStoryOne1649360781689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO stories(community_name, description, localization, main_activities, curiosities, photo1, photo2) VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [
        communityName,
        description,
        localization,
        mainActivities,
        curiosities,
        photo1,
        photo2,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM stories WHERE community_name, description, localization, main_activities, curiosities, photo1, photo2 = $1 $2, $3, $4, $5, $6, $7`,
      [
        communityName,
        description,
        localization,
        mainActivities,
        curiosities,
        photo1,
        photo2,
      ],
    );
  }
}
