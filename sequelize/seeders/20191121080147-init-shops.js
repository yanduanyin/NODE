'use strict';
const timestamps = {
  created_at: new Date(),
  updated_at: new Date()
}


module.exports = {
  up: (queryInterface, Sequelize) => 
  queryInterface.bulkInsert(
    'shops',
    [
      {
        id: 1,
        name: 'dianpu1',
        thumb_url: '1.jpg',
        ...timestamps
      },
      { id: 2, name: '店铺2', thumb_url: '2.png', ...timestamps },
      { id: 3, name: '店铺3', thumb_url: '3.png', ...timestamps },
      { id: 4, name: '店铺4', thumb_url: '4.png', ...timestamps },
    ],
    {
      
    }
  )
,
  down: (queryInterface, Sequelize) => 
  {
    const { op } = Sequelize;
    return queryInterface.bulkDelete(
      'shops', {
        id: {[op.in]: [1,2,3,4]}
      }, 
      {}
    )
  }
};
