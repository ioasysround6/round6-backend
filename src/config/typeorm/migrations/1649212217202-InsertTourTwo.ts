import { MigrationInterface, QueryRunner } from 'typeorm';

const communityName = 'Sobre as águas';
const description =
  'Já imaginou viver em um barco na Amazônia? Uma experiência singular, para aqueles que são apaixonados pela natureza. Aprecie as mais belas paisagens da Floresta Amazônica, navegando através dos rios e afluentes.';
const accommodation =
  'Você ficará hospedado em Barcos Hotéis, onde oferecemos infraestrutura de qualidade para uma viagem confortável e segura. Neste pacote, café da manhã, almoço e jantar estão inclusos, podendo desfrutar das delícias típicas da região, preparadas por cozinheiras capacitadas da comunidade.';
const activities =
  'Neste pacote você irá: 1. Passeio pelo Arquipélago de Anavilhanas, um dos maiores arquipélagos fluviais do mundo! São cerca de 400 ilhas, que podem ser vistas dependendo do volume de água. 2. Passeio para apreciação do Encontro das águas entre o rio Negro, de água preta, e o rio Solimões, de água barrenta. 3. Trilhas e visitas à algumas das mais belas cachoeiras! Junto do guia local, certificado para te guiar em segurança, você irá conhecer a beleza da Cachoeira do Santuário, Cachoeira de Iracema, e a Cachoeira do Mutum.';
const travelDate =
  'Serão 4 dias e 3 noites de passeio. As viagens acontecem entre Abril e Outubro. Data disponível: 04/set - 07/set';
const hint =
  '1. Leve roupas leves e que te protejam do Sol. 2. Leve seus materiais individuais para evitar materiais descartáveis em respeito a natureza. 3. Tire bastante fotos mas não divulgue imagens das pessoas da comunidade sem a autorização das mesmas. 4. E divirta-se bastante e não esqueça de postar o seu diário de viagem no nosso feed!';
const price = 1500;
const vacancies = 18;
const photo1 = 'foto da comunidade Sobre as águas';

export class InsertTourTwo1649212217202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tours(community_name, description, accommodation, activities, travel_date, hint, price, vacancies, photo1) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
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
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM tours WHERE community_name, description, accommodation, activities, travel_date, hint, price, vacancies, photo1 = $1 $2, $3, $4, $5, $6, $7, $8, $9`,
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
      ],
    );
  }
}
