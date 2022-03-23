require('dotenv/config');

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [process.env.ENTITIES],
  migrations: [process.env.MIGRATIONS],
  cli: {
    entitiesDir: 'src/app/**/',
    migrationsDir: 'src/config/typeorm/migrations',
  },
  seeds: ['src/config/typeorm/seeds/*.ts'],
};
