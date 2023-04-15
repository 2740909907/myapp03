const mysql = require('mysql2/promise');

// 创建与 SQL 数据库的连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'database_name',
  connectionLimit: 20 // 连接池大小
});

// 导出连接池对象
module.exports = pool;