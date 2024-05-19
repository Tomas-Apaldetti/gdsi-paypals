import { BASE_URL, get, post } from "services/utils"

const PATHS = {
  create: 'v1/tickets',
  createForGroup: (group) => `v1/groups/${group}/tickets`,
  get: 'v1/tickets',
  getForGroup: (group) => `v1/groups/${group}/tickets`
}

export async function ticketCreate(body, group) {
  if (!group) {
    return post(`${BASE_URL}/${PATHS.create}`, body)
  }
  return post(`${BASE_URL}/${PATHS.createForGroup(group)}`, body)
}

export async function getTickets(group) {
  if (!group) {
    return get(`${BASE_URL}/${PATHS.get}`)
  }
  return get(`${BASE_URL}/${PATHS.getForGroup(group)}`)
}
