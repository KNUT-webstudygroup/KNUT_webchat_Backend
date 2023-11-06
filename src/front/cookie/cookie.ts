import cookie from 'react-cookies';



export const setCookie = (key,value,opt)=>{
    cookie.save(key,value,opt);
}
export const getCookie = (key)=>{
    return cookie.load(key);
}