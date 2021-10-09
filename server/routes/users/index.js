const fastifyPassport = require('fastify-passport');
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const { frontURL } = require('../../config');
const { isAuth } = require('../../middlewares/auth.middleware');

module.exports = async app => {

  // login
  app.get('/login', fastifyPassport.authenticate('google', { scope: ['email', 'profile'] }))

  app.get('/login/return', {
    preValidation: fastifyPassport.authenticate('google', { scope: ['email', 'profile'] })
  }, async (req, res) => {
    res.redirect(frontURL);
  })

  app.get('/logout', {
    preValidation: [
      isAuth()
    ]
  }, async (req, res) => {
    req.logout()
    res.redirect(frontURL);
  })

  // app.get('/current-balance', {
  //   preValidation: fastifyPassport.authenticate('jwt', { session: false })
  // }, async function (request, reply) {

  //   let allTransaction = await Transactions.find({ user: request.user._id }).select('type').select('value').exec()
  //   let balance = 0;

  //   for (let i = 0; i < allTransaction.length; i++)
  //     if (allTransaction[i].type == 'INCOME')
  //       balance += allTransaction[i].value
  //     else if (allTransaction[i].type == 'OUTCOME')
  //       balance -= allTransaction[i].value

  //   return reply.send({ success: true, balance })

  // });

  // get current user info
  app.get('/current', {
    preValidation: [
      isAuth()
    ]
  }, async function (request, reply) {
    reply.send({
      success: true,
      user: request.user
    });
  })

}