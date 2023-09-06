import jwt from 'jsonwebtoken'

export function generateAccessToken (id) {
  return jwt.sign(id, process.env.SECRET_KEY, { expiresIn: '1h' })
}