const express = require('express');
const groupRoute = require('./groups.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/create',
    route: groupRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;