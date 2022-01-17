require('dotenv/config');

const dir =
  process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'test'
    ? 'src'
    : 'dist';
const file =
  process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'test'
    ? 'ts'
    : 'js';

// running seeds only in dev environment
const migrationsDir =
  process.env.NODE_ENV === 'DEV'
    ? [
        `./${dir}/shared/infra/typeorm/migrations/*.${file}`,
        `./${dir}/shared/infra/typeorm/seeds/*.${file}`,
      ]
    : [`./${dir}/shared/infra/typeorm/migrations/*.${file}`];

const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = {
  type: 'postgres',
  // logging: true,
  host: process.env.POSTGRESQL_HOST,
  port: Number(process.env.POSTGRESQL_PORT),
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  // database: process.env.NODE_ENV === 'test' && !!process.env.POSTGRESQL_TEST_DATABASE ? process.env.POSTGRESQL_TEST_DATABASE : process.env.POSTGRESQL_DATABASE,
  database: process.env.POSTGRESQL_DATABASE,
  entities: [`./${dir}/modules/**/infra/typeorm/entities/*.${file}`],
  migrations: migrationsDir,
  cli: {
    migrationsDir: `./${dir}/shared/infra/typeorm/migrations/`,
  },
  namingStrategy: new SnakeNamingStrategy(),
};
