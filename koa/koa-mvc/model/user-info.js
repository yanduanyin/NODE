const md5 = require('md5');
const { query } = require('../util/index.js');
// 注册
const insertData = function (val) {
  console.log(val);
  // 数据库 mysql .... sequlize
  let sql = "insert into user_info(name, password) value (?, ?)";
  // 哈希
  // 输出固定的 不可逆的  同样的输入 需要同样的输出
  // 赵猛17 -> 哈希算法  ->   472818903 
  // 赵猛16 -> 哈希算法  ->   472818904 
  // 赵猛15 -> 哈希算法  ->   472818905 
  return query(sql,[val.name, md5(val.password)]);
}
const queryByName = async () => {
  let sql = 'select * from user_info where name = ?';
  return query(sql, [name])
}
module.exports = { 
  insertData,
  queryByName
}