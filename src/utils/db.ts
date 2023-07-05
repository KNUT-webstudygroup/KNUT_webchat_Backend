// https://velog.io/@yhg0337/kyselyplanetscaleprisma

import { DB } from '../db/types';
import { Kysely,MysqlDialect } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'
import { createPool } from 'mysql2' // do not use 'mysql2/promises'!
import dotenv from 'dotenv'
dotenv.config()

const genSecret = () => {
  if (process.env.DATABASE_URL) {
    const us = process.env.DATABASE_URL.split('/');
    const url = us[2] ;
    console.log(url)
    const middle = url.split(':')
    const username = middle[0];
    const password = middle[1].split('@')[0];
    const db_name = us[3].split('?')[0];
    const host = us[2].split('@')[1];

    return { username:username, password:password,dbname : db_name,host:host};
  }
};

console.log("DB INFOS : ")
console.log(genSecret());
/*export const db = new Kysely<DB>({ // DB는 prisma-kysely를 통해 만들어진 타입입니다.
  dialect: new PlanetScaleDialect({
    url:process.env.DATABASE_URL
  }),
});*/
const dialect = new MysqlDialect({
	pool: createPool({
		database: genSecret()?.dbname||'',
		host:  genSecret()?.host||'',
		user: genSecret()?.username||'',
		password: genSecret()?.password||'',
		port: 3306,
    ssl:{"rejectUnauthorized":true} // 맘에는 안드는데 일단 해결책을 찾기전까지..
	})
})




export const db = new Kysely<DB>({
	dialect
})
