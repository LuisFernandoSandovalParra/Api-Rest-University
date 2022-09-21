'use strict'
const router = require('express').Router();
const {verifyToken} = require('../controllers/users.controller')
const { addUser, deleteUser, getUser, validateUser } = require('../controllers/users.controller.js');

router.post('/login/:email/:password', validateUser);
router.post('/users', verifyToken, addUser);
router.get('/users/:email', verifyToken, getUser);
router.delete('/users/:email/:password', verifyToken, deleteUser);

module.exports = router;