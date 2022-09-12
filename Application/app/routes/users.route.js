'use strict'
const router = require('express').Router();
const {verifyToken} = require('../controllers/users.controller')
const { addUser, deleteUser, getUser, validateUser } = require('../controllers/users.controller.js');

router.post('/login/:id', validateUser);
router.post('/users', verifyToken, addUser);
router.get('/users/:id', verifyToken, getUser);
router.delete('/users/:id', verifyToken, deleteUser);

module.exports = router;