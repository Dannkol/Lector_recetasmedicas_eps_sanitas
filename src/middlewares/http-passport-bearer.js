import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'

dotenv.config();



passport.use(new BearerStrategy((token, done) => {
  try {

    const user = jwt.verify(token, process.env.SECRET_KEY)
    return done(null, user)
  } catch (error) {
    console.log(error);
    return done(null, false)
  }
}))

export default passport