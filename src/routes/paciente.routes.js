import { Router } from "express";
import { UsuarioController } from "../controllers/Usuario.js";
import { FormulaController } from "../controllers/Formulas.js";

import passport from "../middlewares/http-passport-bearer.js";

export const routes=Router()



routes.post('/login', UsuarioController.Login)
routes.get('/formula', passport.authenticate("bearer", {session : false}) ,FormulaController.Data)
