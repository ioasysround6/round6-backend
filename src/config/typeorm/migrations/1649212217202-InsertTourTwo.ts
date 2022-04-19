import { MigrationInterface, QueryRunner } from 'typeorm';

const tourName = 'Sobre as águas';
const communityName = 'Anavilhanas e Araçari';
const description =
  'Já imaginou viver em um barco na Amazônia? Uma experiência singular, para aqueles que são apaixonados pela natureza. Aprecie as mais belas paisagens da Floresta Amazônica, navegando através dos rios e afluentes.';
const accommodation =
  'Você ficará hospedado em um barco hotel, com infraestrutura de qualidade para uma viagem confortável e segura. Neste pacote, café da manhã, almoço e jantar estão inclusos, podendo desfrutar das delícias típicas da região, preparadas pelas cozinheiras mais famosas da comunidade de Araçari.';
const activities =
  'Passeio pelo Arquipélago de Anavilhanas, um dos maiores arquipélagos fluviais do mundo! Apreciação do Encontro das águas entre o rio Negro, de água preta, e o rio Solimões, de água barrenta. Trilhas e visitas a algumas das mais belas cachoeiras locais. Junto do guia local, você irá conhecer a beleza da Cachoeira do Santuário, Cachoeira de Iracema, e a Cachoeira do Mutum. Visita à comunidade de Araçari acompanhando os moradores locais em um dia típico na comunidade que vive da pesca e artesanato de madeira';
const travelDate = 'Do dia 04/09 a 07/09 4 dias e 3 noites de passeio';
const hint =
  'Leve roupas leves e que te protejam do sol Leve seus materiais individuais para evitar o uso de descartáveis, em respeito a natureza Tire muitas fotos mas não divulgue imagens das pessoas da comunidade sem a autorização delas Divirta-se bastante e não esqueça de postar o seu diário de viagem no nosso feed';
const price = 1500;
const vacancies = 18;
const photo1 = 'https://i.imgur.com/QZ9ZJEk.jpg';
const photo2 = 'https://i.imgur.com/s9o5fLF.png';
const photo3 = 'https://i.imgur.com/T8myH01.jpg';

export class InsertTourTwo1649212217202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tours(id, tour_name, community_name, description, accommodation, activities, travel_date, hint, price, vacancies, photo1, photo2, photo3) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        process.env.ID_TOUR_TWO,
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
      `DELETE FROM tours WHERE id, tour_name, community_name, description, accommodation, activities, travel_date, hint, price, vacancies, photo1, photo2, photo3 = $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13`,
      [
        process.env.ID_TOUR_TWO,
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
