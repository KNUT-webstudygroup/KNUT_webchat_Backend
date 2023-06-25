// https://velog.io/@yhg0337/kyselyplanetscaleprisma

import { DB } from '../db/types';
import { Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'

const genSecret = () => {
  if (process.env.DATABASE_URL) {
    const url = process.env.DATABASE_URL.split('/')[2];
    const username = url.split(':')[0];
    const password = url.split(':')[1].split('@')[0];
    return { username, password };
  }
};

export const db = new Kysely<DB>({ // DB는 prisma-kysely를 통해 만들어진 타입입니다.
  dialect: new PlanetScaleDialect({
    host: 'aws.connect.psdb.cloud',
    username: genSecret()?.username || '',
    password: genSecret()?.password || '',
  }),
});
