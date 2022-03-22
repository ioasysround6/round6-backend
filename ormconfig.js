require('dotenv/config');

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: ['src/app/**/*.entity.ts'],
  migrations: ['src/config/typeorm/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/app/**/',
    migrationsDir: 'src/config/typeorm/migrations',
  },
  seeds: ['src/config/typeorm/seeds/*.ts'],
};
