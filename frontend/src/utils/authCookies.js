import Cookies from "js-cookie";

const AUTH_COOKIE = 'access_token';
const REFRESH_COOKIE = 'refresh_token';

function getSetToken(tokenType, token, expires, path = ''){
  if(!token){
    return Cookies.get(tokenType);
  }

  Cookies.set(tokenType, token, {expires, path});
}

export function authCookie(token, expires, path = ''){
  return getSetToken(AUTH_COOKIE, token, expires, path);
}

export function refreshCookie(token, expire, path= ''){
  return getSetToken(REFRESH_COOKIE, token, expire, path)
}
