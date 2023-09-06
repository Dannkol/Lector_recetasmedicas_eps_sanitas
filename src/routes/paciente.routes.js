import { Router } from "express";
import { UsuarioController } from "../controllers/Usuario.js";

export const routes=Router()

routes.post('/login', UsuarioController.Login)