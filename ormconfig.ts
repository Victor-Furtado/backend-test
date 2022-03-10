import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: ["dist/**/*.entity.js","dist/src/**/*.entity.js"],
  synchronize: true,
  migrations:[
    'dist/src/db/migrations/*.js'
  ],
  cli: {
    migrationsDir: 'src/migrations'
  }
};

export default config;
