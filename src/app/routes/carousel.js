const express = require('express');
const router = express.Router();
const pool = require('../db'); // 引入数据库连接池对象

// 轮播图接口
router.get('/', async (req, res) => {
  try {
    // 查询 carousel 表中的所有记录
    const [rows] = await pool.query('SELECT * FROM carousel');

    // 返回数据
    res.json(rows);
  } catch (err) {
    console.error(err);
    // 返回错误信息
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;