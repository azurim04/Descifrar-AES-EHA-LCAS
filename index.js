// Librerias
const crypto = require("crypto-js"); //llaman a la libreria crypto js 
const fileSystem = require("fs"); //llaman a los metodos de file system
const Buffer = require('buffer/').Buffer; //traen el buffer para interpretar el binario
const express = require('express'); //traen express para levantar el servidor
const subirArchivos = require('express-fileupload'); //esto es para poder subir archivos

// Configuracion
const app = express();
const puerto = process.env.PORT || "5000";

//traemos los archivos y comprobamos que el puerto este abierto
app.use(subirArchivos());
app.listen(puerto, () => {
    console.log(`Listening to requests on http://localhost:${puerto}`);
});

// Para que se vea el index
app.use(express.static('./public'));
app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.post("/descifar", (req, res) => {
    // Nombre de outputs
    let Desencriptado = "desencriptado.txt";
    // Leer clave
    let clave = req.body.clave;
    // Leer el archivo a desencriptar
    let inputTexto = req.files.Texto.data.toString();
    // Desencriptar
    let desencriptado = crypto.AES.decrypt(inputTexto.toString(), clave).toString(crypto.enc.Utf8);
    // Guardar en un archivo
    fileSystem.writeFileSync(Desencriptado, desencriptado);
    res.download(Desencriptado);
});