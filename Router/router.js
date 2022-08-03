const express = require('express');
const router = express.Router();
const controller = require('../Controller/Controller');

router.get('/', controller.GetGithub);

module.exports = router;