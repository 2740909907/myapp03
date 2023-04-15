const express = require("express");
const router = express.Router();
const pool = require("../db"); // 引入数据库连接池对象
//const mysql = require("mysql2/promise");

// router.get("/hotels", (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     const sql = "SELECT * FROM hotels";
//     connection.query(sql, (err, result) => {
//       connection.release(); // 释放连接
//       if (err) throw err;
//       res.send(result);
//     });
//   });
// });
router.get("/hotels/:hotel_id", async (req, res) => {
  try {
    const hotelId = parseInt(req.params.hotel_id); // 获取商品 ID

    // 查询 product_details 视图中指定 ID 的记录
    const [rows] = await pool.query("SELECT * FROM hotels WHERE hotel_id = ?", [
      hotelId,
    ]);

    if (rows.length > 0) {
      // 返回数据
      res.json(rows[0]);
    } else {
      // 返回错误信息
      res.status(404).send("Not Found");
    }
  } catch (err) {
    console.error(err);
    // 返回错误信息
    res.status(500).send("Internal Server Error");
  }
});

// router.get("/:productId/hotels", async (req, res) => {
//   console.log('Received request to /product/:productId/hotels endpoint');
//   const productId = req.params.productId;
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error(err);
//       throw err;
//     }
//     const sql = `SELECT hotels.*
//                  FROM hotels
//                  JOIN productdetail_hotel ON hotels.hotel_id = productdetail_hotel.hotel_id
//                  WHERE productdetail_hotel.product_id = ${productId}`;
//     connection.query(sql, (err, result) => {
//       connection.release(); // 释放连接
//       if (err) {
//         console.error(err);
//         throw err;
//       }
//       console.log(`Successfully retrieved data for productId=${productId}`);
//       res.send(result);
//     });
//   });
// });
router.get("/:productId/hotels", async (req, res) => {
  try {
    const productId = parseInt(req.params.productId); // 获取商品 ID

    // 查询 product_details 视图中指定 ID 的记录
    const [rows] = await pool.query(
      "SELECT hotels.*  FROM hotels JOIN productdetail_hotel ON hotels.hotel_id = productdetail_hotel.hotel_id WHERE productdetail_hotel.product_id = ?",
      [productId]
    );

    if (rows.length > 0) {
      // 返回数据
      res.json(rows);
    } else {
      // 返回错误信息
      res.status(404).send("Not Found");
    }
  } catch (err) {
    console.error(err);
    // 返回错误信息
    logger.error("An error occurred while processing request:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/texthotels", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM hotels");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 增加产品详情
router.post("/hotel", async (req, res) => {
  try {
    const {
      hotel_name,
      address,
      phone_number,
      image_url,
      price1,
      price2,
      price3,
    } = req.body; // 获取请求体中的数据
    const [result] = await pool.query(
      "INSERT INTO hotels (hotel_name, address, phone_number, image_url, price1, price2, price3, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [hotel_name, address, phone_number, image_url, price1, price2, price3, 0]
    ); // 插入产品详情数据并返回结果

    if (result.insertId) {
      // 新增成功
      res.json({
        message: "Product detail added successfully!",

        hotel_id: result.insertId,
      });
      //product_id= result.insertId;
    } else {
      // 新增失败
      res.status(500).json({ error: "Failed to add product detail." });
    }
  } catch (err) {
    console.error(err);
    // 返回错误信息
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
