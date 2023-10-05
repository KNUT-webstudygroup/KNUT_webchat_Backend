import { SHA256 } from 'crypto-js';
import dotenv from 'dotenv';
dotenv.config()


export const hashPw = (pw: string) : string => {
    const salt = process.env.pw_salt;
    const hash = SHA256(pw + salt).toString();
    return hash;
};