const express = require('express');  
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3030;

// Middlewares para parsear el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Módulos para manejo de archivos
const sistemaArchivo = require('fs');
const ruta = require('path');
const rutaArchivo = ruta.join(__dirname, 'datos.json');

const multer = require('multer');

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'misImagenes/');  
  },
  filename: (req, file, cb) => {
    // Corregido: se usa el módulo 'ruta' en lugar de 'file.extname'
    const extension = ruta.extname(file.originalname);
    cb(null, `${Date.now()}${extension}`);
  }
});

const cargar = multer({ storage: almacenamiento });

app.get("/", (req, res) => {
  res.send('API REST APRENDICES');
});

// Endpoint para listar aprendices
app.get("/api/aprendices", (req, res) => {
  sistemaArchivo.readFile(rutaArchivo, 'utf-8', (error, datos) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al leer el archivo" });
    }
    const listaAprendices = JSON.parse(datos);    
    res.status(200).json({ "mensaje": listaAprendices });
  }); // Corregido: cierre de función
});

// Endpoint para listar un aprendiz por ID
app.get("/api/aprendices/:id", (req, res) => {      
  res.status(200).json({
    "mensaje": "Lista de un aprendiz"
  });
});  

// Endpoint para crear un aprendiz con imagen
app.post("/api/aprendices", cargar.single('imagen'), (req, res) => {
  const nuevoAprendiz = req.body;
  // Agregar la ruta de la imagen
  nuevoAprendiz.imagen = req.file ? `/misImagenes/${req.file.filename}` : "sin imagen";

  // Leer archivo y agregar un nuevo aprendiz
  sistemaArchivo.readFile(rutaArchivo, 'utf-8', (error, datos) => {
    if (error) {
      return res.status(500).json({ mensaje: "Error al leer el archivo" });
    }
    const listaAprendices = JSON.parse(datos);
   
    // Agregar el nuevo aprendiz al arreglo
    listaAprendices.push(nuevoAprendiz);

    sistemaArchivo.writeFile(rutaArchivo, JSON.stringify(listaAprendices, null, 2), (error) => {
      if (error) {
        return res.status(500).json({ mensaje: "No se puede escribir en el archivo, o BD" });
      }
      res.status(201).json({ "mensaje": "Aprendiz creado", "datos aprendiz": nuevoAprendiz });
    });
  });
});

// Endpoint para actualizar un aprendiz
app.put("/api/aprendices/:id", (req, res) => {
  res.status(200).json({
    "mensaje": "Actualizar aprendiz"
  });
});

// Endpoint para eliminar aprendiz
app.delete("/api/aprendices/:id", (req, res) => {
  res.status(200).json({
    "mensaje": "Eliminar aprendiz"
  });
});            

app.post("/rutaJson", (req, res) => {
  const todosDatos = req.body;
  const edad = req.body.edad2;
  if (edad >= 18) {
    res.json({ mensaje: "Es mayor de edad" });
  } else {
    res.json({ datosJson: todosDatos });
  }
});

app.post("/rutaFormulario", (req, res) => {
  const todosDatos = req.body;
  const programa = req.body.programa;
  res.json({ todosDatos: todosDatos, Miprograma: programa });
});

app.listen(port, () => {
  console.log(`SERVIDOR: http://localhost:${port}`);
});