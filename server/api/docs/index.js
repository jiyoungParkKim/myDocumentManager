'use strict';
var express = require('express');
var controller = require('./Controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:label', controller.tree); // get json tree of the label
router.post('/', controller.newNode);
router.post('/delete', controller.destroy);
router.post('/deleteRoot', controller.destroyRoot);
router.post('/read', controller.read);
router.post('/save', controller.save);
router.post('/newRoot', controller.newRoot);
module.exports = router;