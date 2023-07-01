// https://velog.io/@yhg0337/kyselyplanetscaleprisma

import { DB } from '../db/types';
import { Kysely } from 'kysely'
import { MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';

export const db = new Kysely<DB>({ 
  // DB는 prisma-kysely를 통해 만들어진 타입입니다.
  dialect: new MysqlDialect({
    pool: createPool({
      database: 'knut-web-dev',
      host: process.env.DATABASE_URL,
    })
  }),
});