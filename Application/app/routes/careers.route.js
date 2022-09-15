'use strict'

const router = require('express').Router();
const {verifyToken} = require('../controllers/users.controller.js')
const { getCareers, getOneCareer, addCareer, deleteCareer, modifyCareer } = require('../controllers/careers.controller.js');

router.get('/careers', verifyToken, getCareers);
router.get('/careers/:snies_code', verifyToken, getOneCareer);
router.post('/careers', verifyToken, addCareer);
router.delete('/careers/:snies_code', verifyToken, deleteCareer);
router.put('/careers/:snies_code', verifyToken, modifyCareer);

module.exports = router;