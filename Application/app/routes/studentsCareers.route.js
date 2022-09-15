'use strict'

const router = require('express').Router();
const {getStudentCareer, assingCareer, changeToCareer, deleteStudentToCareer, getAllStudentsPerCareer} = require('../controllers/studentsCareers.controller.js');
const {verifyToken} = require('../controllers/users.controller.js');

router.get('/studentCareer/:document_num', verifyToken, getStudentCareer);
router.get('/studentCareer/all/:snies_code', verifyToken, getAllStudentsPerCareer);
router.post('/assingStudentToCareer', verifyToken, assingCareer);
router.put('/changeStudentToCareer/:document_num', verifyToken, changeToCareer);
router.delete('/deleteStudentToCareer/:document_num', verifyToken, deleteStudentToCareer);

module.exports = router;