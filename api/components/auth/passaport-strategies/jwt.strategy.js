// components/auth/strategies/jwtStrategy.js
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');
const config = require('../../../../config/config')

module.exports = function setupJwtStrategy(passport, store) {
  const TABLE = 'User';

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret, // Debe ser una clave secreta segura
  };

  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await store.findOne(TABLE, { id: jwtPayload.sub });

        if (!user) {
          return done(boom.unauthorized('Usuario no encontrado'), false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
