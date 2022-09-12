'use strict'

const {json} = require('express');
const connection = require('../../confing/connection.js');
const jwt = require('jsonwebtoken');


const getStudentCareer = (req, res) => {
    const {id} = req.params;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try {
                const result = await connection.query(`Select concat(s.first_name, ' ', s.last_name) as full_name, c.name  from students s, careers c, students_careers sc where sc.student_id = ${connection.escape(id)} and sc.student_id = s.id and c.id = sc.career_id`);
                res.json(result);
            } catch (error) {
                res.json({message: `Ha ocurrido un error: ${error}`});
            }
        }else{
            res.sendStatus(403);
        }
    });
}

const getAllStudentsPerCareer = (req, res) => {
    const {id} = req. params;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try {
                const result = await connection.query(`select concat(s.first_name, ' ', s.last_name) as full_name, c.name from students s, careers c, students_careers sc where sc.career_id = ${connection.escape(id)} and sc.career_id = c.id and s.id = sc.student_id`);
                res.json(result);
            } catch (error) {
                res.json({message: `Ha ocurrido un error: ${error}`})
            }
        }else{
            res.sendStatus(403);
        }
    });
}

const assingCareer = (req, res) => {
    const data = req.body;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try{
                const result = await connection.query(`insert into students_career (student_id, career_id) values (${connection.escape(data.student_id)}, ${connection.escape(data.career_id)})`);
                res.json({message: `Se inscribío correctamente el estudiante a la carrera.`});
            }catch(error){
                res.json({message: `Ha ocurrido un error: ${error}`});
            }
        }else{
            res.sendStatus(403);
        }
    });
}

const changeToCareer = (req, res) => {
    const {id} = req.params;
    const {career_id} = req.body;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try {
                const result = await connection.query(`Update students_careers set career_id = ${connection.escape(career_id)} where student_id = ${connection.escape(id)}`);
            } catch (error) {
                res.json({message: `Ha ocurrido un error: ${error}`});
            }
        }else{
            res.sendStatus(403);
        }
    })
}

const deleteStudentToCareer = (req, res) => {
    const {id} = req. params;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try {
                const result = await connection.query(`delete from students_careers where student_id = ${connection.escape(id)}`);
                res.json({message: 'Se ha eliminado correctamente el estudiante de la carrera.'});
            } catch (error) {
                res.json({message: `Ha ocurrido un error: ${error}`});
            }
        }else{
            res.sendStatus(403);
        }
    })
}

module.exports = {getStudentCareer, getAllStudentsPerCareer, assingCareer, changeToCareer, deleteStudentToCareer};