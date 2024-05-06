const Group = require('../models/group.model');

const createGroup = async (args) => {
  try {
    const newGroup = new Group({
      name: args.name,
      description: args.description,
      category: args.category
    });

    const savedGroup = await newGroup.save();

    return savedGroup;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

module.exports = createGroup;