import { BASE_URL, post, get } from 'services/utils';
import { user } from 'utils/auth';

const PATHS = {
  create: 'v1/groups',
  get: 'v1/groups',
  getMembersForGroup: (group) => `v1/groups/${group}/members`,
  addMembertToGroup: (group) => `v1/groups/${group}/members`,
  answerInvite: (group,invite) => `v1/groups/${group}/invites/${invite}/responses`,
  getInviteLink: (group) => `v1/groups/${group}/invite-link`,
  getGroupFromInvite: (invite) => `v1/groups/invite-link/${invite}`,
  acceptInviteLink: (group, invite) => `v1/groups/${group}/invite-link/${invite}/responses`
};

export async function groupCreate(body) {
  if (!body.members.includes(user().sub)) {
    body.members.push(user().sub);
  }
  return post(`${BASE_URL}/${PATHS.create}`, body);
}

export async function getGroups() {
  return get(`${BASE_URL}/${PATHS.get}`);
}

export async function getGroupMembers(group) {
  return get(`${BASE_URL}/${PATHS.getMembersForGroup(group)}`);
}

export async function addMembersToGroup(members, group) {
  return post(`${BASE_URL}/${PATHS.addMembertToGroup(group)}`, members)
}

export function getSelfAsDebtor() {
  const userInfo = user();
  return [
      {
        id: userInfo.sub,
        username: userInfo.username,
      },
    ]
}

export async function acceptInvite(groupId, inviteId){
  return post(`${BASE_URL}/${PATHS.answerInvite(groupId, inviteId)}`, {answer: 'ACCEPT'})
}

export async function denyInvite(groupId, inviteId){
  return post(`${BASE_URL}/${PATHS.answerInvite(groupId, inviteId)}`, {answer: 'DENY'})
}

export async function getInviteLink(groupId){
  return get(`${BASE_URL}/${PATHS.getInviteLink(groupId)}`);
}

export async function getGroupFromInvite(inviteId){
  return get(`${BASE_URL}/${PATHS.getGroupFromInvite(inviteId)}`)
}

export async function acceptInviteLink(group, invite){
  return post(`${BASE_URL}/${PATHS.acceptInviteLink(group, invite)}`, {answer: 'ACCEPT'})
}
