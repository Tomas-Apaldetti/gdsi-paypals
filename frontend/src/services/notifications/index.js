import { BASE_URL, get } from "services/utils"

const PATHS = {
  get: 'v1/notifications'
}

export function getNotifications(){
  return get(`${BASE_URL}/${PATHS.get}`)
}
