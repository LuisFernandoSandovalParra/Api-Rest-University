'use strict'

const router = require('express').Router();
const {getStudentCareer, assingCareer, changeToCareer, deleteStudentToCareer, getAllStudentsPerCareer} = require('../controllers/studentsCareers.controller.js');
const {verifyToken} = require('../controllers/users.controller.js');

router.get('/studentCareer/:id', verifyToken, getStudentCareer);
router.get('/studentCareer/all/:id', verifyToken, getAllStudentsPerCareer);
router.post('/assingStudentToCareer', verifyToken, assingCareer);
router.put('/changeStudentToCareer', verifyToken, changeToCareer);
router.delete('/deleteStudentToCareer/:id', verifyToken, deleteStudentToCareer);

module.exports = router;