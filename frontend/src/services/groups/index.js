import { BASE_URL, post } from "services/utils"

const PATHS = {
  create: 'group/create'
}

export async function groupCreate(body){
  return post(`${BASE_URL}/${PATHS.create}`, body)
}
