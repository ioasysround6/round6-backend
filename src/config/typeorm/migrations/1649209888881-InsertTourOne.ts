import { MigrationInterface, QueryRunner } from 'typeorm';

const communityName = 'Mãos na argila!';
const description =
  'Conheça de perto uma das comunidades tradicionais produtoras de artesanato de argila, Mato Serrado. Localizada em Crato, a 8 horas de Fortaleza, é uma comunidade centenária e um local fantástico repleto de figuras icônicas no artesanato cearense!';
const accommodation =
  'Você ficará hospedado na pousada de Dona Maria, ela faz uma tapioca tapioca orgânica com alimentos frescos no café da manhã, que não tem igual. O local é próximo do Rio Preguiças, onde você terá tranquilidade, muito verde e ar puro ao seu redor.';
const activities =
  'Visita na casa de um dos artesãos locais, acompanhando todas as etapas da fabricação de uma peça de argila artesanal, podendo inclusive moldar a sua própria peça de barro Trilha até o Rio Preguiças com um guia local, com um momento de meditação e relaxamento, além de um banho relaxante e revigorante com argila úmida recém extraída do rio no final Visita ao museu Argilas Vivas onde conhecerá os projetos locais, além de assistir uma orquestra infanto-juvenil que utiliza instrumentos musicais feitos com argila';
const travelDate = 'Do dia 21/06 a 23/06 4 dias e 3 noites de passeio.';
const hint =
  'Leve roupas leves e que te protejam do sol Leve seus materiais individuais para evitar o uso de descartáveis, em respeito a natureza Tire muitas fotos mas não divulgue imagens das pessoas da comunidade sem a autorização delas Divirta-se bastante e não esqueça de postar o seu diário de viagem no nosso feed';
const price = 600;
const vacancies = 7;
const photo1 = 'https://i.imgur.com/bxtO5TP.jpg';
const photo2 = 'https://i.imgur.com/EJftyc4.jpg';
const photo3 = 'https://i.imgur.com/Oa2gFW5.jpg';

export class InsertTourOne1649209888881 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tours(community_name, description, accommodation, activities, travel_date, hint, price, vacancies, photo1, photo2, photo3) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
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
      `DELETE FROM tours WHERE community_name, description, accommodation, activities, travel_date, hint, price, vacancies, photo1, photo2, photo3 = $1 $2, $3, $4, $5, $6, $7, $8, $9, $10, $11`,
      [
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
