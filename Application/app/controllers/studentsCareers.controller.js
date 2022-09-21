'use strict'

const {json} = require('express');
const connection = require('../../config/connection.js');
const jwt = require('jsonwebtoken');


const getStudentCareer = (req, res) => {
    const {document_num} = req.params;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try {
                const result = await connection.query(`Select s.document_type, s.document_num, concat(s.first_name, ' ', s.last_name) as full_name, c.name  from students s, careers c, students_careers sc where sc.student_document_num = ${connection.escape(document_num)} and sc.student_document_num = s.document_num and c.snies_code = sc.career_snies_code`);
                if(result.length === 1){
                    res.json(result);
                }else{
                    res.json({message: "El estudiante no existe."})
                }
            } catch (error) {
                res.json({message: `Ha ocurrido un error: ${error}`});
            }
        }else{
            res.sendStatus(403);
        }
    });
}

const getAllStudentsPerCareer = (req, res) => {
    const {snies_code} = req.params;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try {
                const result = await connection.query(`select s.document_type, s.document_num, concat(s.first_name, ' ', s.last_name) as full_name, c.name as career from students s, careers c, students_careers sc where sc.career_snies_code = ${connection.escape(snies_code)} and sc.career_snies_code = c.snies_code and s.document_num = sc.student_document_num`);
                if(result.length > 0){
                    res.json(result);
                }else{
                    res.json({message: "La carrera no existe o no cuenta con estudiantes matriculados."})
                }
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
            let queryValidate = await connection.query(`SELECT * FROM students_careers WHERE student_document_num = ${connection.escape(data.student_document_num)}`);
            if(queryValidate.length === 0){
                try{
                    const result = await connection.query(`insert into students_careers (student_document_num, career_snies_code) values (${connection.escape(data.student_document_num)}, ${connection.escape(data.career_snies_code)})`);
                    res.json({message: `Se inscribío correctamente el estudiante a la carrera.`});
                }catch(error){
                    res.json({message: `Ha ocurrido un error: ${error}`});
                }
            }else{
                res.json({message: "El estudiante ya se encuentra matriculado."})
            }
        }else{
            res.sendStatus(403);
        }
    });
}

const changeToCareer = (req, res) => {
    const {document_num} = req.params;
    const {career_snies_code} = req.body;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            let queryValidate = await connection.query(`SELECT * FROM students_careers WHERE student_document_num = ${connection.escape(document_num)}`);
            if(queryValidate.length === 1){
                try {
                    const result = await connection.query(`Update students_careers set career_snies_code = ${connection.escape(career_snies_code)} where student_document_num = ${connection.escape(document_num)}`);
                    res.json({message: "El estudiante ha cambiado exitosamente de carrera."})
                } catch (error) {
                    res.json({message: `El estudiante no existe.`});
                }
            }else{
                res.json({message: `No existe un estudiante con numero de documento ${document_num}`});
            }
        }else{
            res.sendStatus(403);
        }
    })
}

const deleteStudentToCareer = (req, res) => {
    const {document_num} = req.params;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            let queryValidate = await connection.query(`SELECT * FROM students_careers WHERE student_document_num = ${connection.escape(document_num)}`);
            if(queryValidate.length === 1){
                try {
                    const result = await connection.query(`delete from students_careers where student_document_num = ${connection.escape(document_num)}`);
                    res.json({message: 'Se ha eliminado correctamente el estudiante de la carrera.'});
                } catch (error) {
                    res.json({message: `Ha ocurrido un error: ${error}`});
                }
            }else{
                res.json({message: `No existe un estudiante con numero de documento ${document_num}`});
            }    
        }else{
            res.sendStatus(403);
        }
    })
}

module.exports = {getStudentCareer, getAllStudentsPerCareer, assingCareer, changeToCareer, deleteStudentToCareer};