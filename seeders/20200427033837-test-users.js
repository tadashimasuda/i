'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('users', [
      {
        username: 'tanaka',
        email: 'tanaka@gmail.com',
        password: bcrypt.hashSync('tanakatanaka', bcrypt.genSaltSync(8)),
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};