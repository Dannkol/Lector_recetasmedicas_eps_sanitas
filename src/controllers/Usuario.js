import { compare } from "../helpers/bcrypt";

export class UsuarioController{
    static async Login(req,res){
        try {
            const { correo, password } = req.body;
            const con = await getConnection();
        
            const [rows] = await con.execute(
              "SELECT id, correo, password, formula_id FROM paciente WHERE correo=?",
              [correo]
            );
        
            if (rows.length >= 1) {
             
              const user = rows[0];
        
         
                if (password!=user.password) {
                    return res.status(401).send("Password Incorrecta");
                }
              
        
              const { id, correo, formula_id } = user;
        
              const data = { id, correo, formula_id };
              const accessToken = generateAccessToken(data);
        
              return res.status(200).json({ message:'Token jwt', jwt:accessToken})
            } else {
              res.status(400).send("Usuario o contraseña incorrectos.");
            }
          } catch (error) {
            res.status(500).send("Error en el servidor." + error.message);
          }
    }
}