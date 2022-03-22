import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UsersEntity } from '../../../app/users/users.entity';
import { hashSync } from 'bcrypt';
import { Role } from '../../enum/role.enum';

const adminPassword = process.env.ADMIN_PASSWORD;
const hashedPassword = hashSync(adminPassword, 10);

export class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UsersEntity)
      .values([
        {
          fullName: process.env.ADMIN_FULL_NAME,
          email: process.env.ADMIN_EMAIL,
          password: `${hashedPassword}`,
          cpf: process.env.ADMIN_CPF,
          telephone: process.env.ADMIN_TELEPHONE,
          gender: process.env.ADMIN_GENDER,
          role: Role.Admin,
        },
      ])
      .execute();
  }
}
