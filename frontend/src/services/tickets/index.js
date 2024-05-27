import { BASE_URL, get, post, put } from "services/utils"

const PATHS = {
  create: 'v1/tickets',
  createForGroup: (group) => `v1/groups/${group}/tickets`,
  edit: 'v1/tickets',
  editForGroup: (group) => `v1/groups/${group}/tickets`,
  get: 'v1/tickets',
  getForGroup: (group) => `v1/groups/${group}/tickets`
}

export async function ticketCreate(body, group) {
  if (!group) {
    return post(`${BASE_URL}/${PATHS.create}`, body)
  }
  return post(`${BASE_URL}/${PATHS.createForGroup(group)}`, body)
}

export async function ticketEdit(body, group, ticketId) {
  if (!group) {
    return put(`${BASE_URL}/${PATHS.edit}/${ticketId}`, body)
  }
  return put(`${BASE_URL}/${PATHS.editForGroup(group)}/${ticketId}`, body)
}

export async function getTickets(group) {
  if (!group) {
    return get(`${BASE_URL}/${PATHS.get}`)
  }
  return get(`${BASE_URL}/${PATHS.getForGroup(group)}`)
}
