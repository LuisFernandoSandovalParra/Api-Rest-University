'use strict'
const router = require('express').Router()

const { getStudents, getOneStudent, addStudent, modifyStudent, deleteStudent } = require('../controllers/students.controller.js')
const {verifyToken} = require('../controllers/users.controller')

router.get('/students', verifyToken, getStudents);
router.get('/students/:document_num', verifyToken, getOneStudent);
router.post('/students',verifyToken, addStudent);
router.put('/students/:document_num', verifyToken, modifyStudent);
router.delete('/students/:document_num', verifyToken, deleteStudent);

module.exports = router; 
