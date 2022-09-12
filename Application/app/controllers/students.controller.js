'use strict'

const { json } = require('express');
const connection = require('../../confing/connection.js')
const jwt = require('jsonwebtoken');

const getStudents = (req, res) => {   
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try{
                const result = await connection.query("select * from students");
                res.json(result);
            }catch(error){
                res.json({message: `Ha ocurrido un error: ${error}`});
        }
        }else{
            res.sendStatus(403);
        }
    })   
}

async function getOneStudent(req, res){
    const {id} = req.params
    jwt.verify(req.token, 'secretkey', async (error) =>{
        if(!error){
            try{
                const result = await connection.query(`select * from students where id = ${connection.escape(id)}`);
                res.json(result);
            }catch(error){
                res.json(error);
            }
        }else{
            res.sendStatus(403);
        }
    })
}

const addStudent = async (req, res) =>{
    const data = req.body;
    jwt.verify(req.token, 'secretkey', async (error) =>{
        if(!error){
            try {
                const result = await connection.query(`Insert into students(first_name, last_name, phone_number, semester, birthdate) values (${connection.escape(data.first_name)}, ${connection.escape(data.last_name)}, ${connection.escape(data.phone_number)}, ${connection.escape(data.semester)}, ${connection.escape(data.birthdate)})`)
                res.json({message: `${connection.escape(data.first_name)} fue agregado correctamente.`})
            } catch (error) {
                res.json(error)
            }
        }else{
            res.sendStatus(403);
        }
    })  
}

const modifyStudent = async (req, res) =>{
    const {id} = req.params;
    const {first_name, last_name, phone_number, semester, birthdate} = req.body; 
    jwt.verify(req.token, 'secretkey', async (error) =>{
        if(!error){
            try {
            const result = await connection.query(`update students set first_name = ${connection.escape(first_name)}, last_name = ${connection.escape(last_name)}, phone_number = ${connection.escape(phone_number)}, semester = ${connection.escape(semester)}, birthdate = ${connection.escape(birthdate)} where id= ${connection.escape(id)}`)
            res.json({message: `${connection.escape(first_name)} se ha modificado correctamente`})
            } catch (error) {
                res.json({message: `Aca ocurrio un error ${error}`});
            }
        }else{
            res.sendStatus(403);
        }
    })
}

const deleteStudent = async (req, res) => {
    const {id} = req.params;
    jwt.verify(req.token, 'secretkey', async (error) =>{
        if(!error){
            try {
                const result = await connection.query(`delete from students where id = ${connection.escape(id)}`)
                res.json({message: "Estudiante eliminado correctamente"})
            } catch (error) {
                res.json(error);
            }
        }else{
            res.sendStatus(403);
        }
    })        
}

module.exports = {getStudents, getOneStudent, addStudent, modifyStudent, deleteStudent}