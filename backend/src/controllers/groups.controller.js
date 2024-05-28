const httpStatus = require('http-status');
const groupService = require('../services/group.service');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const createGroup = catchAsync(async (req, res) => {
  const creator = req.user._id;
  const invite = req.body.members.filter(user => user !== creator.toString())
  req.body.members = [creator.toString()]

  if(!req.body.members.includes(creator.toString())){
    throw new ApiError(httpStatus.BAD_REQUEST, 'The creator must be a member of the group')
  }
  const group = await groupService.createGroup({
    ...req.body,
    creator
  })
  await groupService.createInvitesForMembers(group.id, creator, invite);
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

const createInviteLink = catchAsync(async (req, res) => {
  const groupId = req.params.groupId;
  const inviter = req.user._id;

  const {_id} = await groupService.createInviteLink(groupId, inviter);

  return res.status(httpStatus.OK).send({inviteId:_id})
});

const acceptInviteLink = catchAsync(async (req, res) => {
  const groupId = req.params.groupId;
  const inviteId = req.params.inviteId;
  const answerer = req.user._id;

  await groupService.acceptInviteLink(groupId, inviteId, answerer);

  return res.status(httpStatus.NO_CONTENT).send({})
});

const getGroupForInviteLink = catchAsync(async (req, res) => {
  const inviteId = req.params.inviteId;

  const groupInfo = await groupService.getGroupForInviteLink(inviteId);

  return res.status(httpStatus.OK).send(groupInfo)
})

module.exports = {
  createGroup,
  getGroups,
  getGroupMembers,
  createInvitesForGroup,
  respondInvite,
  createInviteLink,
  acceptInviteLink,
  getGroupForInviteLink
};
