import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import jwt from 'jsonwebtoken'

passport.use(new BearerStrategy((token, done) => {
  try {
    const userr = jwt.verify(token, process.env.SECRET_KEY)
    return done(null, userr)
  } catch (error) {
    return done(null, false)
  }
}))

export default passport