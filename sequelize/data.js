const Sequelze = require('sequelize');
const sequelize = new Sequelze('learn_sequelize',
'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

// Shop表的映射对象 ORM
const Shop = sequelize.define('shops', {
  id: {
    type: Sequelze.INTEGER,
    primaryKey: true,
    autoIncrement: true    
  },
  name: {
    type: Sequelze.STRING,
    allowNull: false,
  },
  thumb_url: Sequelze.STRING,
  created_at: Sequelze.DATE,
  updated_at: Sequelze.DATE,
  address: Sequelze.STRING
}, {
  tableName: 'shops',
  timestamps: false
})


async function SearchShopById (id) {
  // Shop  数据表的映射对象
  return Shop.findByPk(id);
}
async function CreateShops(shop) {
  return Shop.create(shop);
}

module.exports = {
  SearchShopById,
  CreateShops
}
