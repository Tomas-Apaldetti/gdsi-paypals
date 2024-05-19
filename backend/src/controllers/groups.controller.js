const httpStatus = require('http-status');
const groupService = require('../services/group.service');
const catchAsync = require('../utils/catchAsync');

const createGroup = catchAsync(async (req, res) => {

  const creator = req.user._id.toString();

  if (!req.body.members.includes(creator)) {
    return res.status(httpStatus.BAD_REQUEST, 'The creator must be a member of the group').send()
  }

  const group = await groupService.createGroup({
    ...req.body,
    creator
  })

  return res.status(httpStatus.CREATED).send(group);
});

const getGroups = catchAsync(async (req, res) => {
  const forUser = req.user._id;

  const groups = await groupService.getGroupForUser(forUser);

  return res.status(httpStatus.OK).send(groups);
});

const getGroupMembers = catchAsync(async (req, res) => {

  const groupId = req.params.groupId;
  const userId = req.user._id;

  const members = await groupService.getGroupMembers(groupId, userId);

  return res.status(httpStatus.OK).send(members);
})

module.exports = {
  createGroup,
  getGroups,
  getGroupMembers
};
