import { BASE_URL, get, post, put } from "services/utils"

const PATHS = {
  create: 'v1/tickets',
  edit: 'v1/tickets',
  get: 'v1/tickets',
  forGroup: (group) => `v1/groups/${group}/tickets`
}

export async function ticketCreate(body, group) {
  if (!group) {
    return post(`${BASE_URL}/${PATHS.create}`, body)
  }
  return post(`${BASE_URL}/${PATHS.forGroup(group)}`, body)
}

export async function ticketEdit(body, group, ticketId) {
  if (!group) {
    return put(`${BASE_URL}/${PATHS.edit}/${ticketId}`, body)
  }
  return put(`${BASE_URL}/${PATHS.forGroup(group)}/${ticketId}`, body)
}

export async function getTickets(group) {
  if (!group) {
    return get(`${BASE_URL}/${PATHS.get}`)
  }
  return get(`${BASE_URL}/${PATHS.forGroup(group)}`)
}

export async function payTicket(group, ticket, payment){
  if(!group){
    return post(`${BASE_URL}/${ticket}/payment`, payment)
  }
  return post(`${BASE_URL}/${PATHS.forGroup(group)}/${ticket}/payment`, payment)
}

export async function waiveTicket(group, ticket, waiver){
  if(!group){
    return post(`${BASE_URL}/${ticket}/waiver`, waiver)
  }
  return post(`${BASE_URL}/${PATHS.forGroup(group)}/${ticket}/waiver`, waiver)
}
