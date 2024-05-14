const Group = require('../models/group.model');
const mongoose = require('mongoose');


const createGroup = async (args) => {
  try {
    const newGroup = new Group({
      name: args.name,
      description: args.description,
      category: args.category,
      users: [args.user]
    });

    const savedGroup = await newGroup.save();

    return savedGroup;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

const getGroups = async (args) => {
  try {
    var userId = mongoose.Types.ObjectId(args.userId);
    const groups = await Group.find({ users: { $in: [userId]}})


    return groups
  } catch (error) {
    console.error('Error fetching the groups', error)
    throw error
  }
}

module.exports = {
  createGroup,
  getGroups
};