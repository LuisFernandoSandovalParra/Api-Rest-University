'use strict'

const {json} = require('express');
const connection = require('../../confing/connection.js');
const jwt = require('jsonwebtoken');


const validateUser = async (req, res) =>{
    const {id} = req.params;
    const user = await connection.query(`Select * from users where id = ${connection.escape(id)}`);
    jwt.sign({user}, 'secretkey', {expiresIn: '2h'}, (err, token) => {
        res.json({token});
    });
}

// AUthorization: Bearer <token>
const verifyToken = (req, res, next) =>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}


const addUser = (req, res) =>{
    const data = req.body;
    jwt.verify(req.token, 'secretkey', async (error) =>{
        if(!error){
            try {
                const result = await connection.query(`Insert into users (name, email) values (${connection.escape(data.name)}, ${connection.escape(data.email)})`);
                res.json({message: "Usuario creado correctamente."})
            }catch (error) {
                res.json({message: `Ha ocurrido un error: ${error}`});
            }
        }else{
            res.sendStatus(403);
        }
    }) 
}

const deleteUser = (req, res) =>{
    const {id} = req.params;
    jwt.verify(req.token, 'secretkey', async (error) =>{
        if(!error){
            try {
                const result = await connection.query(`Delete from users where id = ${connection.escape(id)}`);
                res.json({message:"Usuario eliminado correctamente."})
            }catch (error) {
                res.json({message: `Ha ocurrido un error: ${error}`});
            }
        }else{
            res.sendStatus(403);
        }
    })
}

const getUser = async (req, res) =>{
    const {id} = req.params;
    jwt.verify(req.token, 'secretkey', async (error, authData) =>{
        if(!error){
            try {
                const result = await connection.query(`Select * from users where id = ${connection.escape(id)}`);
                res.json(result);
            } catch (error) {
                res.json({message: `Ha ocurrido un error: ${error}`});
            }
        }else{
            res.sendStatus(403);
        } 
    })
}

module.exports = {addUser, deleteUser, getUser, verifyToken, validateUser};