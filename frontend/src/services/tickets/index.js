import { BASE_URL, post, get } from "services/utils"

const PATHS = {
  create: 'ticket/create',
}

export async function ticketCreate(body){
    return post(`${BASE_URL}/${PATHS.create}`, body)
}