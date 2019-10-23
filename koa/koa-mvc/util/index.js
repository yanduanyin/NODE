const mysql = require('mysql');

const pool = mysql.createPool({
  user: 'root',
  password: '849072',
  host: '192.168.31.98',
  port: 3306,
  database: 'chat'
})
let query = function(sql, val) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connect) => {
      if (err) reject(err);
      connect.query(sql, val, (err, rows) => {
        if(err) reject(err);
        else resolve(rows);
        connect.release();// 释放
      }) 
    })
  })
}
//  A temporary password is generated for root@localhost: Bk1U:T#C3HF=
//  
module.exports = {
  query
}