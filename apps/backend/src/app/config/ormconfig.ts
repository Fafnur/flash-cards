import { join } from 'node:path';

import { getTypeOrmConfig } from './config';

// Note: Config for migrations
export = {
  ...getTypeOrmConfig(),
  entities: [`${join(__dirname, '../')}**/*.entity.{ts,js}`, `${join(__dirname, '../../../../../')}libs/backend/**/*.entity.{ts,js}`],
  migrations: [`${join(__dirname, '../../../../../')}apps/backend/migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: `apps/backend/migrations`,
  },
};
