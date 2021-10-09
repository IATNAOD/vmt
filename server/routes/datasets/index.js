const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const { isAuth } = require('../../middlewares/auth.middleware');
const datasets = require('../../utils/datasets');

module.exports = async app => {

  // get current user info
  app.get('/', { preValidation: [isAuth()] },
    async function (request, reply) {
      reply.send({
        success: true,
        datasets: await datasets()
      });
    }
  )

}