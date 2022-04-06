import { MigrationInterface, QueryRunner } from 'typeorm';

const communityName = 'Mãos na argila!';
const description =
  'Conheça de perto uma das comunidades tradicionais produtoras de artesanato de argila, Moita Redonda! Localizada em Cascavel, a 60 minutos de Fortaleza, é uma comunidade centenária e um local fantástico repleto de figuras icônicas no artesanato cearense! Moita tem aproximadamente 60% dos moradores vivendo exclusivamente da fabricação artesanal de peças de Argila, você encontra desde pequenos utensílios (Vasos, panelas e filtros) até Carrancas de 2 metros de altura.';
const accommodation =
  'Você ficará hospedado na pousada de Dona Fulana, ela faz uma tapioca tapioca orgânica com alimentos frescos no café da manhã que você só comerá igual neste local. Próximo do rio [nome do rio] você terá tranquilidade, muito verde e ar puro ao seu redor.';
const activities =
  'Neste pacote você irá: 1. Visitar a casa de um dos artesãos locais, onde poderá acompanhar todas as etapas da fabricação de uma peça de argila artesanal, podendo inclusive moldar a sua própria peça de barro nesta visita para recebê-la no último dia de viagem. 2. Você participará de uma trilha até o rio [nome do rio] com um guia local e no final participará de um momento de meditação e relaxamento no qual poderá fazer um banho relaxante e revigorante com argila úmida recém extraída do rio. 3. Visitará o museu do Barro Vivo onde conhecerá os projetos locais da associação de produtores de artesanato de barro do Ceará além de assistir uma orquestra infanto-juvenil que utiliza instrumentos musicais feitos com argila.';
const travelDate =
  'Serão 4 dias e 3 noites de passeio. Data disponível: 21/abril - 23/abril';
const hint =
  '1. Leve roupas leves e que te protejam do Sol. 2. Leve seus materiais individuais para evitar materiais descartáveis em respeito a natureza. 3. Tire bastante fotos mas não divulgue imagens das pessoas da comunidade sem a autorização das mesmas. 4. E divirta-se bastante e não esqueça de postar o seu diário de viagem no nosso feed!';
const price = 600;
const vacancies = 10;
const photo1 = 'https://imgur.com/EJftyc4';
const photo2 = 'https://imgur.com/bxtO5TP';
const photo3 = 'https://imgur.com/Ao6xwwU';

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
