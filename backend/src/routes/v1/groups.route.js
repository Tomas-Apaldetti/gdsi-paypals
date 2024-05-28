const groupController = require('../../controllers/groups.controller');
const ticketRoute = require('./ticket.route');
const express = require('express');
const groupValidation = require('../../validations/group.validation');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(auth('TODO'), validate(groupValidation.createGroup), groupController.createGroup)
  .get(auth('TODO'), groupController.getGroups);

router
  .route('/:groupId/members')
  .get(auth('TODO'), validate(groupValidation.getMembers), groupController.getGroupMembers)
  .post(auth('TODO'), validate(groupValidation.addMembers), groupController.createInvitesForGroup);

router
  .route('/:groupId/invites/:inviteId/responses')
  .post(auth('TODO'),validate(groupValidation.inviteResponse), groupController.respondInvite);

router
  .route('/:groupId/invite-link')
  .get(auth('TODO'), validate(groupValidation.inviteLinkCreate), groupController.createInviteLink);

router
  .route('/invite-link/:inviteId')
  .get(auth('TODO'), validate(groupValidation.inviteLinkInfo), groupController.getGroupForInviteLink)

router
  .route('/:groupId/invite-link/:inviteId/responses')
  .post(auth('TODO'), validate(groupValidation.inviteLinkAccept), groupController.acceptInviteLink);

router.use('/:groupId/tickets', validate(groupValidation.groupIdParam), ticketRoute.maybeGroupRouter);

module.exports = router;
