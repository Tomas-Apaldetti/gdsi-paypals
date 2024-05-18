// For now, let's just ignore this
const allRoles = {
  user: ['getUsers', 'manageUsers', 'TODO'],
  admin: ['getUsers', 'manageUsers', 'TODO'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
