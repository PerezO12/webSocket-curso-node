const express = require('express');
const cors = require('cors');
const { pathToFileURL } = require('url');
const { socketController } = require('../sockets/controller');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')( this.server );


        this.paths = {}
        
        //middlewares
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();

        //Sicjets
        this.sockets()
    }

    middlewares(){
        //cors (seguridad)
        this.app.use( cors() );

        //directorio publico
        this.app.use(express.static('public'));
    }
    
    routes(){
        //this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }
    
    sockets(){

        this.io.on('connection', socketController)

    }


    listen(){
        this.server.listen( this.port, () =>{
            console.log( `Servidor corriendo en el puerto ${this.port}` );
        });
    }
}




module.exports = Server;