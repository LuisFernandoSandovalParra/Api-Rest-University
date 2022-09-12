'use strict'

const { json } = require('express');
const connection = require('../../confing/connection.js')
const jwt = require('jsonwebtoken');

const getCareers = (req, res) =>{
    jwt.verify(req.token, 'secretkey', async (error) =>{
        if(!error){
            try {
                const result = await connection.query("select * from careers");
                res.json(result);
            } catch (error) {
                res.json({message: "Ha ocurrido un error."})
            }
        }else{
            res.sendStatus(403);
        }
    })
   
}

const getOneCareer = (req, res) =>{
    const {id} = req.params;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try {
                const result = await connection.query(`select * from careers where id = ${connection.escape(id)}`);
                res.json(result);
            } catch (error) {
                res.json({message: `Hay un error: ${error}`});
            }
        }else{
            res.sendStatus(403);
        }
    })  
}

const addCareer = (req, res) =>{
    const data = req.body;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try {
                const result = await connection.query(`Insert into careers(faculty, name) values (${connection.escape(data.faculty)}, ${connection.escape(data.name)})`);
                res.json({message: `Se agregó correctamente la carrera ${data.name}`});
            } catch (error) {
                res.json({message: `Hay un error: ${error}`})
            }
        }else{
            res.sendStatus(403);
        }
    })
}

const deleteCareer = (req, res) =>{
    const {id} = req.params;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try {
                const result = await connection.query(`delete from careers where id = ${connection.escape(id)}`);
                res.json({message: "Se ha eliminado correctamente la carrera."});
            } catch (error) {
                res.json({message: `Ha ocurrido un error: ${error}`});
            }
        }else{
            res.sendStatus(403);
        }
    })
   
}

const modifyCareer = async (req, res) =>{
    const {id} = req.params;
    const data = req.body;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            try {
                const result = await connection.query(`update careers set faculty = ${connection.escape(data.faculty)}, name = ${connection.escape(data.name)} where id = ${connection.escape(id)}`);
                res.json({message:`Se ha modificado correctamente la carrera`});
            } catch (error) {
                res.json({message: `Ha ocurrido un error: ${error}`});
            }
        }else{
            res.sendStatus(403);
        }
    })
}

module.exports = { getCareers, getOneCareer, addCareer, deleteCareer, modifyCareer };