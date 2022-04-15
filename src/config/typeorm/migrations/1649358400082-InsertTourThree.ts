import { MigrationInterface, QueryRunner } from 'typeorm';

const tourName = 'Folhas, flores e frutos';
const communityName = 'Serra do Paraíso';
const description =
  'Uma experiência imersiva no campo, perfeita para aqueles que procuram por uma viagem tranquila. Conheça quem são os responsáveis por levar o alimento à mesa do brasileiro diariamente, participando do cultivo e experimentando as delícias da terra! Esse passeio é feito na comunidade Serra do Paraíso, na cidade de Jacobina a 5h de Salvador.';
const accommodation =
  'Você ficará hospedado na casa de uma família local, tendo disponível um quarto e as dependências da casa. Não estão inclusas as refeições, mas você pode consumir os frutos e vegetais oferecidos pela família.';
const activities =
  'Conhecer uma comunidade de agricultores incrível, podendo realizar tours com o nosso guia Aprender sobre a agricultura familiar e participar do plantio e colheita dos alimentos';
const travelDate = 'Do dia 14/05 a 15/05 2 dias e 1 noite de passeio';
const hint =
  'Leve roupas leves e que te protejam do sol Leve seus materiais individuais para evitar o uso de descartáveis, em respeito a natureza Tire muitas fotos mas não divulgue imagens das pessoas da comunidade sem a autorização delas Divirta-se bastante e não esqueça de postar o seu diário de viagem no nosso feed';
const price = 500;
const vacancies = 10;
const photo1 = 'https://i.imgur.com/QCuaxld.jpg';
const photo2 = 'https://i.imgur.com/HYM58bl.jpg';
const photo3 = 'https://i.imgur.com/sk7umAc.jpg';

export class InsertTourThree1649358400082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tours(tour_name, community_name, description, accommodation, activities, travel_date, hint, price, vacancies, photo1, photo2, photo3) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        tourName,
        communityName,
        description,
        accommodation,
        activities,
        travelDate,
        hint,
        price,
        vacancies,
        photo1,
        photo2,
        photo3,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM tours WHERE tour_name, community_name, description, accommodation, activities, travel_date, hint, price, vacancies, photo1, photo2, photo3 = $1 $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12`,
      [
        tourName,
        communityName,
        description,
        accommodation,
        activities,
        travelDate,
        hint,
        price,
        vacancies,
        photo1,
        photo2,
        photo3,
      ],
    );
  }
}
