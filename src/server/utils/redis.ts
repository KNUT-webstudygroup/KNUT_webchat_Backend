import { createClient } from 'redis';
import dotenv from 'dotenv'

dotenv.config();

export const redisClient = createClient({
    password: process.env["REDIS_PW"],
    socket: {
        host: process.env["REDIS_URL"],
        port: 17310
    }
});