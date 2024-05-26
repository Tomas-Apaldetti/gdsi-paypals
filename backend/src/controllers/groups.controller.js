const httpStatus = require('http-status');
const groupService = require('../services/group.service');
const catchAsync = require('../utils/catchAsync');

const createGroup = catchAsync(async (req, res) => {

  const creator = req.user._id;

  if(!req.body.members.includes(creator.toString())){
    return res.status(httpStatus.BAD_REQUEST, 'The creator must be a member of the group')
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

  const members = await groupService.getGroupMembers(groupId, req.user._id);

  return res.status(httpStatus.OK).send(members);
})

const createInvitesForGroup = catchAsync(async (req, res) => {
  const groupId = req.params.groupId;
  const inviter = req.user._id;

  await groupService.createInvitesForMembers(groupId, inviter, req.body.members);

  return res.status(httpStatus.NO_CONTENT).send({});
})

const respondInvite = catchAsync(async (req, res) => {
  const groupId = req.params.groupId;
  const inviteId = req.params.inviteId;
  const whoAnswers = req.user._id;
  const response = req.body.answer;

  if(response === "ACCEPT"){
    await groupService.acceptInvite(groupId, whoAnswers, inviteId);
  }else{
    await groupService.rejectInvite(groupId, whoAnswers, inviteId);
  }

  return res.status(httpStatus.NO_CONTENT).send({})
})

module.exports = {
  createGroup,
  getGroups,
  getGroupMembers,
  createInvitesForGroup,
  respondInvite
};
