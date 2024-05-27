const express = require('express');
const auth = require('../../middlewares/auth');
const notificationController = require('../../controllers/notification.controller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(auth('TODO'), notificationController.getNotifications);

  module.exports = router;
