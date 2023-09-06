import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'

dotenv.config();

export function generateAccessToken (id) {
  console.log(id , process.env.SECRET_KEY);
  return jwt.sign(id, process.env.SECRET_KEY, { expiresIn: '1h' })
}