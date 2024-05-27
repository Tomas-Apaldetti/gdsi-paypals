const httpStatus = require('http-status');
const { Group, Invite } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');

const createGroup = async (groupInfo) => {
  return Group.create(groupInfo);
};

const getGroupForUser = async (userId) => {
  if (!userId) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }
  return Group.find({
    members: mongoose.Types.ObjectId(userId),
  }).populate({
    path: 'members',
    select: '_id username',
  });
};

const getGroupMembers = async (groupId, forUser) => {
  if (!groupId || !forUser) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }

  const list = await Group.findOne({
    members: mongoose.Types.ObjectId(forUser),
    _id: mongoose.Types.ObjectId(groupId),
  }).populate({
    path: 'members',
    select: '_id username',
  });

  if (!list) {
    throw new ApiError(httpStatus.NOT_FOUND, `Group ${groupId} not found for user ${forUser}`);
  }

  return list.members;
};

const createInvitesForMembers = async (groupId, inviter, users) => {
  if (!groupId || users.length == 0) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }

  const group = await Group.findById(groupId);

  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, `Group ${groupId} does not exists`);
  }

  users.forEach((user) => {
    if (group.invites?.find((invite) => {
      // Avoid creating invites for users that already have/had invites and accepted them
      return mongoose.Types.ObjectId(user) === mongoose.Types.ObjectId(invite.for) && (invite.status === "PENDING" || invite.status === "ACCEPTED")
    })) return;

    group.invites.push(
      new Invite({
        type: 'PERSONAL',
        for: user,
        createdBy: inviter,
      }),
    );
  });

  await group.save();
};

const addMembersToGroup = async (groupId, members) => {
  if (!groupId || members.length == 0) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }

  const updatedGroup = await Group.updateOne(
    { _id: mongoose.Types.ObjectId(groupId) },
    { $push: { members: { $each: members } } },
  );

  if (!updatedGroup) {
    throw new ApiError(httpStatus.NOT_FOUND, `Group ${groupId} not found for user ${forUser}`);
  }

  return updatedGroup.members;
};

const acceptInvite = async (groupId, forUser, inviteId) => {
  if (!groupId || !forUser || !inviteId) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }

  const updateQuery = {
    'invites.$.status': 'ACCEPTED',
    'invites.$.answeredOn': new Date(),
  };

  const updated = await Group.findOneAndUpdate(
    { _id: groupId, 'invites._id': inviteId, 'invites.for': forUser, 'invites.status': 'PENDING' },
    { $set: updateQuery, $push: { members: { $each: [forUser] } } },
    { new: true, runValidators: true },
  );

  if (!updated) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Pending invite ${inviteId} not found for group ${groupId} and user ${forUser}`,
    );
  }
};

const rejectInvite = async (groupId, forUser, inviteId) => {
  if (!groupId || !forUser || !inviteId) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }

  const updateQuery = {
    'invites.$.status': 'DENIED',
    'invites.$.answeredOn': new Date(),
  };

  const updated = await Group.findOneAndUpdate(
    { _id: groupId, 'invites._id': inviteId, 'invites.for': forUser, 'invites.status': 'PENDING' },
    { $set: updateQuery },
    { new: true, runValidators: true },
  );

  if (!updated) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Pending invite ${inviteId} not found for group ${groupId} and user ${forUser}`,
    );
  }
};

const getPendingInvites = async (forUser) => {
  if (!forUser) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Bad service usage');
  }

  const groupAndInvites = await Group.aggregate([
    {
      $match: {
        'invites.for': mongoose.Types.ObjectId(forUser),
        'invites.status': 'PENDING',
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        category: 1,
        invites: {
          $filter: {
            input: '$invites',
            as: 'invite',
            cond: {
              $and: [{ $eq: ['$$invite.for', mongoose.Types.ObjectId(forUser)] }, { $eq: ['$$invite.status', 'PENDING'] }],
            },
          },
        },
      },
    },
    {
      $unwind: '$invites',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'invites.createdBy',
        foreignField: '_id',
        as: 'inviters',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        category: 1,
        invite: {
          _id: "$invites._id",
          createdBy: {
            _id: { $arrayElemAt: ['$inviters._id', 0] },
            username: { $arrayElemAt: ['$inviters.username', 0] },
          },
        }
      },
    },
  ]);

  return groupAndInvites;
};

module.exports = {
  createGroup,
  getGroupForUser,
  getGroupMembers,
  addMembersToGroup,
  createInvitesForMembers,
  acceptInvite,
  rejectInvite,
  getPendingInvites,
};
