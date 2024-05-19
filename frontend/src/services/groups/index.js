import { BASE_URL, post, get } from "services/utils"
import { user } from "utils/auth";

const PATHS = {
  create: 'v1/groups',
  get: 'v1/groups',
  getMembersForGroup: (group) => `v1/groups/${group}/members`
}

export async function groupCreate(body) {
  if (!(body.members.includes(user().sub))) {
    body.members.push(user().sub)
  }
  return post(`${BASE_URL}/${PATHS.create}`, body)
}

export async function getGroups() {
  return get(`${BASE_URL}/${PATHS.get}`)
}

export async function getGroupMembers(group) {
  if (!group) {
    return getSelfAsDebtor();
  }
  const response = await get(`${BASE_URL}/${PATHS.getMembersForGroup(group)}`);
  return response.json()
}

export function getSelfAsDebtor() {
  const userInfo = user();
  return [{
    _id: userInfo.sub,
    username: userInfo.username,
  }]
}
