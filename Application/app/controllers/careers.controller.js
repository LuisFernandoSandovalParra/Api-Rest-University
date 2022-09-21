'use strict'

const { json } = require('express');
const connection = require('../../config/connection.js')
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
    const {snies_code} = req.params;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            let queryValidate = await connection.query(`SELECT * FROM careers WHERE snies_code = ${connection.escape(snies_code)}`);
            if(queryValidate.length === 1){
                try {
                    const result = await connection.query(`select * from careers where snies_code = ${connection.escape(snies_code)}`);
                    res.json(result);
                } catch (error) {
                    res.json({message: `Hay un error: ${error}`});
                }
            }else{
                res.json({message: "La carrera que intenta buscar no existe."});
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
            let queryValidate = await connection.query(`SELECT * FROM careers WHERE snies_code = ${connection.escape(data.snies_code)}`);
            if(queryValidate.length === 0){
                try {
                    const result = await connection.query(`Insert into careers(snies_code, faculty, name) values (${connection.escape(data.snies_code)} ,${connection.escape(data.faculty)}, ${connection.escape(data.name)})`);
                    res.json({message: `Se agregó correctamente la carrera ${data.name}`});
                } catch (error) {
                    res.json({message: `Hay un error: ${error}`})
                }
            }else{
                res.json({message: "La carrera que intenta agregar ya existe."});
            }
        }else{
            res.sendStatus(403);
        }
    })
}

const deleteCareer = (req, res) =>{
    const {snies_code} = req.params;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            let queryValidate = await connection.query(`SELECT * FROM careers WHERE snies_code = ${connection.escape(snies_code)}`);
            if(queryValidate.length === 1){
                try {
                    const result = await connection.query(`delete from careers where snies_code = ${connection.escape(snies_code)}`);
                    res.json({message: "Se ha eliminado correctamente la carrera."});
                } catch (error) {
                    res.json({message: `Ha ocurrido un error: ${error}`});
                }
            }else{
                res.json({message: "La carrera que intenta eliminar, no existe."});
            }
        }else{
            res.sendStatus(403);
        }
    })
   
}

const modifyCareer = async (req, res) =>{
    const {snies_code} = req.params;
    const data = req.body;
    jwt.verify(req.token, 'secretkey', async (error) => {
        if(!error){
            let queryValidate = await connection.query(`SELECT * FROM careers WHERE snies_code = ${connection.escape(snies_code)}`);
            if(queryValidate.length === 1){
                try {
                    const result = await connection.query(`update careers set faculty = ${connection.escape(data.faculty)}, name = ${connection.escape(data.name)} where snies_code = ${connection.escape(snies_code)}`);
                    res.json({message:`Se ha modificado correctamente la carrera`});
                } catch (error) {
                    res.json({message: `Ha ocurrido un error: ${error}`});
                }
            }else{
                res.json({message: "La carrera que intenta modificar, no existe."})
            }
        }else{
            res.sendStatus(403);
        }
    })
}

module.exports = { getCareers, getOneCareer, addCareer, deleteCareer, modifyCareer };