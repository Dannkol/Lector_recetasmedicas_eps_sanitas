import express from "express";
import passport from 'passport'

const configureApp = (app) => {
  // Configuraciones de Express
  app.use(express.json({limit: '50mb'}));
  app.use(express.urlencoded({limit: '50mb'}));
  // Otros middlewares y configuraciones de Express
    
  app.use(passport.initialize())

    // reat-limit
    
  // ...

  // Manejador de errores global
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Error interno del servidor");
  });
};

export default configureApp;