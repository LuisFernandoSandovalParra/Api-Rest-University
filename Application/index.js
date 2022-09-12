'use strict'

const app = require('./app/app.js')

app.listen(app.get('port'), (error)=>{
    if(error){
        console.log(`Hay un error ${error}`);
    }else{
        console.log(`Servidor corriendo en el puerto: ${app.get('port')}`);
    }
})