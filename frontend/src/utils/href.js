export const fullHref = () => {
  return window.location.href.slice(window.location.origin.length);
}

export const createInviteLink = (inviteId) => {
  return `${window.location.origin}/invite?invite=${inviteId}`
}
