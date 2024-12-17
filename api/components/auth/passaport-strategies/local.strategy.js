// components/auth/strategies/localStrategy.js
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

module.exports = function setupLocalStrategy(passport, store) {
  const TABLE = 'Auth';

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await store.findOne(TABLE, { email });

          if (!user) {
            return done(boom.unauthorized('Credenciales inválidas'), false);
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return done(boom.unauthorized('Credenciales inválidas'), false);
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
