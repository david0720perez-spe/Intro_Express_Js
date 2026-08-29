const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PUERTO || 3000; 

//middleware para parsear datos de el body//
app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.get("/", (_, res) => { 
    res.send('Aprendices ficha 3407186'); 
});

app.get("/api/aprendices", (req, res) => {
    res.status(200).json({
        "mensaje": "Lista de aprendices :)" 
    })
})

app.get("/api/aprendices", (req, res) => {
    res.status(200).json({
        "mensaje": "Lista de aprendices :)" 
    })
})

//endpoint crear aprendices//
app.post("/api/aprendices", (req, res) => {
    res.status(200).json({
        "mensaje": "Crear aprendices"
    })
})

// Ruta para EDITAR un aprendiz (usando PUT y un ID dinámico)
app.put("/api/aprendices", (req, res) => {
    res.status(200).json({
        "mensaje": "Editar aprendiz con ID: "
    });
});

app.delete("/api/aprendices", (req, res) => {
    res.status(200).json({
        "mensaje": "Borrar aprendiz : "
    })
})

app.post("/rutaJson", (req, res)=>{
    const todosDatos = req.body
    const edad =req.body.edad
 if (edad >= 18) {
    res.json({ mensaje: "Es mayor de edad" });
} else {
    res.json({ mensaje: "Es menor de edad" });
}
    res.json({datosJson: todosDatos})
})

app.post("/rutaFormulario", (req, res)=>{
    const todosDatos =req.body
    const programa = req.body.programa
    res.json({todosDatos: todosDatos, MiPrograma:programa})
})


app.listen(port, () => { 
    console.log(`Servidor corriendo en http://localhost:${port}`); 
});