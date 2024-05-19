const httpStatus = require('http-status');
const { Group } = require('../models');
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
    members: mongoose.Types.ObjectId(userId)
  })
  .populate({
     path: 'members',
     select: '_id username'
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

module.exports = {
  createGroup,
  getGroupForUser,
  getGroupMembers,
};
