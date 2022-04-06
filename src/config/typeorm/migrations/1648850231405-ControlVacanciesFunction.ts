import { MigrationInterface, QueryRunner } from 'typeorm';

export class ControlVacanciesFunction1648850231405
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE OR REPLACE FUNCTION control_vacancies() RETURNS TRIGGER
    AS
    $$
    DECLARE
      vacancies_quantity int;
      requested_vacancies int;
    BEGIN
      IF (TG_OP = 'INSERT') THEN
        SELECT vacancies FROM tours WHERE id = NEW.tour_id INTO vacancies_quantity;
        IF vacancies_quantity < NEW.amount_people THEN 
          RAISE EXCEPTION 'Não é possível atender o número de vagas solicitadas';
        ELSE
          UPDATE tours SET vacancies = vacancies - NEW.amount_people
            WHERE id = NEW.tour_id;
        END IF;
      END IF;
      
      IF (TG_OP = 'UPDATE') THEN
        IF OLD.amount_people <> NEW.amount_people THEN
          SELECT vacancies FROM tours WHERE id = NEW.tour_id INTO vacancies_quantity;
          requested_vacancies = NEW.amount_people - OLD.amount_people;
          IF vacancies_quantity < requested_vacancies THEN 
            RAISE EXCEPTION 'Não é possível atender o número de vagas solicitadas';
          END IF;
          IF NEW.amount_people < OLD.amount_people THEN
            UPDATE tours SET vacancies = vacancies + (OLD.amount_people - NEW.amount_people)
              WHERE id = NEW.tour_id;
          END IF;
          IF NEW.amount_people > OLD.amount_people THEN
            UPDATE tours SET vacancies = vacancies - (NEW.amount_people - OLD.amount_people)
              WHERE id = NEW.tour_id;
          END IF;
        END IF;
      END IF;
      
      IF (TG_OP = 'DELETE') THEN
        UPDATE tours SET vacancies = vacancies + OLD.amount_people
          WHERE id = OLD.tour_id;
      END IF;
      
        RETURN NEW;
    END
    $$ LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP FUNCTION control_vacancies');
  }
}
