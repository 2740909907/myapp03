const express = require("express");
const router = express.Router();
const pool = require("../db"); // 引入数据库连接池对象

// 获取所有产品信息
router.get("/userhotels", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT userhotels.*, users.username FROM userhotels INNER JOIN users ON users.user_id = userhotels.user_id");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 添加新产品
router.post("/userhotels", async (req, res) => {
  const { user_id, title, roomType, totalPrice, totalNights } = req.body;

  if (!user_id || !title || !roomType || !totalPrice || !totalNights) {
    return res.status(400).send("Missing required fields");
  }

  try {
    // 插入新产品
    const [result] = await pool.query(
      "INSERT INTO userhotels (user_id, title, roomType, totalPrice, totalNights) VALUES (?, ?, ?, ?, ?)",
      [user_id, title, roomType, totalPrice, totalNights]
    );

    const newProduct = {
      id: result.insertId,
      user_id,
      title,
      roomType,
      totalPrice,
      totalNights,
      paid: 0,
    };

    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 获取某用户的产品信息
router.get("/userhotels/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM userhotels WHERE user_id = ?",
      [user_id]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
