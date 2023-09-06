import getConnection from "../database/connections.js";
import { generateAccessToken } from '../helpers/createToken.js'

export class FormulaController {
    static async Data(req, res) {
        try {
            const { correo, password } = req.body;
            const con = await getConnection();

            const [rows] = await con.execute(
                "SELECT data FROM formula WHERE id=?",
                [req.user.formula_id]
            );

            if (rows.length >= 1) {
               res.status(200).json(rows)
            } else {
                res.status(400).send("Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            res.status(500).send("Error en el servidor." + error.message);
        }
    }
}