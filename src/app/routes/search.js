const express = require("express");
const router = express.Router();
const pool = require("../db"); // 引入数据库连接池对象

router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    const query = `SELECT * FROM product WHERE name1 LIKE ?`;
    const results = await pool.query(query, [`%${keyword}%`]);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving comments");
  }
});

module.exports = router;
