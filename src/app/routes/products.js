const express = require("express");
const router = express.Router();
const pool = require("../db"); // 引入数据库连接池对象

// 获取所有产品信息
router.get("/products", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT products.*, users.username FROM products INNER JOIN users ON users.user_id = products.user_id"
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 添加新产品
router.post("/products", async (req, res) => {
  const { user_id, title, price, quantity } = req.body;

  if (!user_id || !title || !price || !quantity) {
    return res.status(400).send("Missing required fields");
  }

  try {
    // 插入新产品
    const [result] = await pool.query(
      "INSERT INTO products (user_id, title, price, quantity) VALUES (?, ?, ?, ?)",
      [user_id, title, price, quantity]
    );

    const newProduct = {
      id: result.insertId,
      user_id,
      title,
      price,
      quantity,
      paid: 0,
    };

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 获取某用户的产品信息
router.get("/products/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE user_id = ?",
      [user_id]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
