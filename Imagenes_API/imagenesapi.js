const http = require("node:http");
const fs = require("node:fs");
const puerto = 3000;

const imagen = fs.readFileSync("./img/Jakpack.png");

const server = http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");

    switch(request.method){
        case "GET":
            response.statusCode = 200;
            response.setHeader("Content-Type", "image/png");
            response.end(imagen);
        break;

        case "POST":
            var informacion = "";
            request.on("data", info => {
                informacion += info;
            });
            request.on("end", () => {

                const objeto_imagen = JSON.parse(informacion);
                console.log(objeto_imagen);

                var imagen_sin_prefijo = objeto_imagen.imagen.replace("data:"+ objeto_imagen.tipo +";base64,", "");
                var imagen_binario = Buffer.from(imagen_sin_prefijo, "base64");

                fs.writeFile("./img/"+ objeto_imagen.nombre, imagen_binario, err => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("imagen guardada");
                    }
                })
            });
        break;
    }

});

server.listen(puerto, () => {
    console.log("Servidor a la escucha en http://localhost:" + puerto);
});