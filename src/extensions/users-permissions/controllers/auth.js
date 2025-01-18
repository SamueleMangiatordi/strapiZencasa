const { sanitizeEntity } = require('@strapi/utils');

module.exports = {
  async register(ctx) {
    console.log("Dati ricevuti:", ctx.request.body);

    const { email, password, username } = ctx.request.body;

    if (!email || !password || !username) {
      return ctx.badRequest('Username, email e password sono obbligatori');
    }

    try {
      const newUser = await strapi.query('plugin::users-permissions.user').create({
        data: {
          username,
          email,
          password,
        },
      });

      const sanitizedUser = sanitizeEntity(newUser, {
        model: strapi.getModel('plugin::users-permissions.user'),
      });

      return ctx.send({
        jwt: strapi.plugins['users-permissions'].services.jwt.issue({ id: sanitizedUser.id }),
        user: sanitizedUser,
      });
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      return ctx.internalServerError('Errore durante la registrazione');
    }
  },
};
