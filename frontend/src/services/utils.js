import { authCookie } from "utils/authCookies";

export const BASE_URL = "http://localhost:5000"

export async function stdFetch(url, config = {}){
  var auth = authCookie();

  if(!config.headers){
    const headers = {};
    if(auth){
      headers['Authorization'] = `Bearer ${auth}`;
    }
    headers['Content-Type'] = 'application/json';
    config.headers = headers;
  }
  if(!config.headers['Content-Type']){
    config.headers['Content-Type'] = 'application/json';
  }
  if(!config.headers['Authorization']){
    config.headers['Authorization'] = `Bearer ${auth}`;
  }

  return fetch(
    url,
    config
  )
}

export async function post(url, body){
  return stdFetch(url, {body: JSON.stringify(body), method: 'POST'})
}
