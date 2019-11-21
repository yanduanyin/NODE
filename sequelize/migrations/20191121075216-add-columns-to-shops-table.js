'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'shops',
    'address',
    {
      type: Sequelize.STRING
    }
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'shops',
    'address'
  )
};
