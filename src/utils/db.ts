// https://velog.io/@yhg0337/kyselyplanetscaleprisma

import { DB } from '../db/types';
import { Kysely,MysqlDialect } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'
import { createPool } from 'mysql2' // do not use 'mysql2/promises'!
import dotenv from 'dotenv'
dotenv.config()

const genSecret = () => {
  if (process.env.DATABASE_URL) {
    const url = process.env.DATABASE_URL.split('/')[2];
    const username = url.split(':')[0];
    const password = url.split(':')[1].split('@')[0];
    return { username:username, password:password};
  }
};

/*export const db = new Kysely<DB>({ // DB는 prisma-kysely를 통해 만들어진 타입입니다.
  dialect: new PlanetScaleDialect({
    url:process.env.DATABASE_URL
  }),
});*/
const dialect = new MysqlDialect({
	pool: createPool({
		database: "seoro",
		host: "gcp.connect.psdb.cloud",
		user: genSecret()?.username||'',
		password: genSecret()?.password||'',
		port: 3306,
    ssl:{"rejectUnauthorized":true} // 맘에는 안드는데 일단 해결책을 찾기전까지..
	})
})




export const db = new Kysely<DB>({
	dialect
})
