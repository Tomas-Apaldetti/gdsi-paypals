const httpStatus = require('http-status');
const groupService = require('../services/group.service');
const catchAsync = require('../utils/catchAsync');


function wrapNotifications(notificationType, data){
  return data.map(d => ({
    type: notificationType,
    data: d
  }));
}
const getNotifications = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const groupInvites = wrapNotifications('GROUP_REQUEST', await groupService.getPendingInvites(userId));
  return res.status(httpStatus.OK).send(groupInvites)
})


module.exports = {
  getNotifications,
}
