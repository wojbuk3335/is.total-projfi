const { text } = require('body-parser');
const express = require('express');
const ApiSectionController = require('../controllers/api/section-controller');

const router = express.Router();

// api routes
router.get('/sections',ApiSectionController.getAllSections);


module.exports = router;

