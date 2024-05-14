import { BASE_URL, post, get } from "services/utils"

const PATHS = {
  create: 'group/create',
  getGroups: 'group/groups' 
}

export async function groupCreate(body){
  return post(`${BASE_URL}/${PATHS.create}`, body)
}

export async function getGroups() {
  return get(`${BASE_URL}/${PATHS.getGroups}`)
}
