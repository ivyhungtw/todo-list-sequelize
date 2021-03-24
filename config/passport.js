const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          // Email should exist in users table
          const user = await User.findOne({ where: { email } })

          if (!user) {
            return done(null, false, {
              message: 'That email is not registered!',
            })
          }

          // Password should match the email
          const isMatch = await bcrypt.compare(password, user.password)

          if (!isMatch) {
            return done(null, false, {
              message: 'Incorrect Password',
            })
          }

          return done(null, user)
        } catch (err) {
          done(err, false)
        }
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name, email } = profile._json
          const user = await User.findOne({ where: { email } })

          if (user) return done(null, user)

          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt

          const salt = await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(randomPassword, salt)
          await User.create({
            name,
            email,
            password: hash,
          })

          return done(null, user)
        } catch (err) {
          done(err, false)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findByPk(id)
      user = user.toJSON()
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })
}
