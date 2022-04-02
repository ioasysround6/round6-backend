require('dotenv/config');

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: process.env.NODE_ENV === 'production' ? true : false,
  extra:
    process.env.NODE_ENV === 'production'
      ? {
          ssl: { rejectUnauthorized: false },
        }
      : null,
  entities: [process.env.ENTITIES],
  migrations: [process.env.MIGRATIONS],
  cli: {
    entitiesDir: 'src/app/**/',
    migrationsDir: 'src/config/typeorm/migrations',
  },
};
