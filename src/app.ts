import { Server } from './presentation/server';
import { EnvConfig } from './config';
import { AppRoutes } from './presentation/routes';
import { PostgresDatabase } from './data';

(() => {
  main();
})();

async function main() {
  // Connection configuration to PostgreSQL
  await PostgresDatabase.connect({
    user: EnvConfig().DB_USER,
    host: EnvConfig().DB_HOST,
    database: EnvConfig().DB_DATABASE,
    password: EnvConfig().DB_PASSWORD,
    port: EnvConfig().DB_PORT,
  });

  await new Server({
    port: EnvConfig().PORT,
    routes: AppRoutes.routes,
  }).start();
}
