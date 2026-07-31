import express from "express";

import {configDotenv} from "dotenv"

configDotenv()

const app = express();

const port = process.env.PUERTO || 3030;

app.get("/", (req, res) => {
    res.send("Aprendiz ficha 3407186 SENA");
});

app.get("/ruta1", (req, res)=>{
    //template string
    res.send('<h1>Usando res.send</h1>')
})
app.get("/ruta2", (req, res)=>{
    //template string
    res.json({"dev":"node --watch app.js", "script":"node app.js"})
})
app.get("/ruta3/:nombre/:apellido", (req, res) => {
    const nameUsuario = req.params.nombre;
        const nameApellido = req.params.apellido;
    res.json({ usuario: nameUsuario,apellido:nameApellido });
});
app.get("/ruta4",(req, res)=>{
    const numero = req.query.phone ||3124260421
    const orden = req.query.orden ||"sin orden"
    const pagina = req.query.pagina ||777
    res.send(`<h1>Listado Aprendices</h1>
        <h2>El listado en orden ${orden}</h2>
        <p>Pagina: ${pagina}</p>
        <h3>Numero ${numero}</h3>
    `)
})
app.listen(port, () => {
    console.log(`SERVIDOR: http://localhost:${port}`);
});
