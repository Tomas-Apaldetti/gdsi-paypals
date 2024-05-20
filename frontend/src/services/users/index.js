import { BASE_URL, get } from "services/utils"

const PATHS = {
  get: 'v1/users'
}

export function getUsers(){
  return get(`${BASE_URL}/${PATHS.get}`)
}
