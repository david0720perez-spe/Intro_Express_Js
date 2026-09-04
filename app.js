const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PUERTO || 3000;

const rutaArchivo = path.join(__dirname, "datos.json");

// Middleware para recibir JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get("/", (req, res) => {
    res.send("Aprendices ficha 3407186");
});

// ===============================
// GET - Obtener todos los aprendices
// ===============================
app.get("/api/aprendices", (req, res) => {

    fs.readFile(rutaArchivo, "utf-8", (error, datos) => {

        if (error) {
            return res.status(500).json({
                mensaje: "No se puede leer el archivo"
            });
        }

        try {
            const listaAprendices = JSON.parse(datos);

            res.status(200).json({
                mensaje: "Lista de aprendices",
                aprendices: listaAprendices
            });

        } catch (error) {
            res.status(500).json({
                mensaje: "Error al convertir el archivo JSON"
            });
        }
    });
});

// ===============================
// POST - Crear aprendiz
// ===============================
app.post("/api/aprendices", (req, res) => {

    const DatosAprendiz = req.body;

    fs.readFile(rutaArchivo, "utf-8", (error, datos) => {

        if (error) {
            return res.status(500).json({
                mensaje: "No se puede leer el archivo"
            });
        }

        try {
            const listaAprendices = JSON.parse(datos);

            listaAprendices.push(DatosAprendiz);

            fs.writeFile(
                rutaArchivo,
                JSON.stringify(listaAprendices, null, 2),
                (error) => {

                    if (error) {
                        return res.status(500).json({
                            mensaje: "No se pudo guardar el aprendiz"
                        });
                    }

                    res.status(201).json({
                        mensaje: "Aprendiz creado correctamente",
                        DatosAprendiz: DatosAprendiz
                    });
                }
            );

        } catch (error) {
            res.status(500).json({
                mensaje: "Error al procesar el archivo JSON"
            });
        }
    });
});

// ===============================
// PUT - Editar aprendiz
// ===============================
app.put("/api/aprendices/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const nuevosDatos = req.body;

    fs.readFile(rutaArchivo, "utf-8", (error, datos) => {

        if (error) {
            return res.status(500).json({
                mensaje: "No se puede leer el archivo"
            });
        }

        try {
            const listaAprendices = JSON.parse(datos);

            if (id < 0 || id >= listaAprendices.length) {
                return res.status(404).json({
                    mensaje: "Aprendiz no encontrado"
                });
            }

            listaAprendices[id] = {
                ...listaAprendices[id],
                ...nuevosDatos
            };

            fs.writeFile(
                rutaArchivo,
                JSON.stringify(listaAprendices, null, 2),
                (error) => {

                    if (error) {
                        return res.status(500).json({
                            mensaje: "No se pudo actualizar el aprendiz"
                        });
                    }

                    res.status(200).json({
                        mensaje: "Aprendiz actualizado correctamente",
                        aprendiz: listaAprendices[id]
                    });
                }
            );

        } catch (error) {
            res.status(500).json({
                mensaje: "Error al procesar el JSON"
            });
        }
    });
});

// ===============================
// DELETE - Borrar aprendiz
// ===============================
app.delete("/api/aprendices/:id", (req, res) => {

    const id = parseInt(req.params.id);

    fs.readFile(rutaArchivo, "utf-8", (error, datos) => {

        if (error) {
            return res.status(500).json({
                mensaje: "No se puede leer el archivo"
            });
        }

        try {
            const listaAprendices = JSON.parse(datos);

            if (id < 0 || id >= listaAprendices.length) {
                return res.status(404).json({
                    mensaje: "Aprendiz no encontrado"
                });
            }

            const aprendizEliminado = listaAprendices.splice(id, 1);

            fs.writeFile(
                rutaArchivo,
                JSON.stringify(listaAprendices, null, 2),
                (error) => {

                    if (error) {
                        return res.status(500).json({
                            mensaje: "No se pudo eliminar el aprendiz"
                        });
                    }

                    res.status(200).json({
                        mensaje: "Aprendiz eliminado correctamente",
                        aprendiz: aprendizEliminado[0]
                    });
                }
            );

        } catch (error) {
            res.status(500).json({
                mensaje: "Error al procesar el JSON"
            });
        }
    });
});

// ===============================
// Ruta para probar JSON
// ===============================
app.post("/rutaJson", (req, res) => {

    const todosDatos = req.body;
    const edad = req.body.edad;

    if (edad >= 18) {
        return res.json({
            mensaje: "Es mayor de edad",
            datosJson: todosDatos
        });
    }

    return res.json({
        mensaje: "Es menor de edad",
        datosJson: todosDatos
    });
});

// ===============================
// Ruta para probar formularios
// ===============================
app.post("/rutaFormulario", (req, res) => {

    const todosDatos = req.body;
    const programa = req.body.programa;

    res.json({
        todosDatos: todosDatos,
        MiPrograma: programa
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
