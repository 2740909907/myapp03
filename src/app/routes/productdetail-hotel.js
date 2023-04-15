const express = require("express");
const router = express.Router();
const pool = require("../db"); // 引入数据库连接池对象

router.post("/producthotel", async (req, res) => {
  try {
    const { product_id, hotel_id } = req.body; // 获取请求体中的数据
    const [productDetail] = await pool.query(
      "SELECT * FROM product_details WHERE product_id = ?",
      [product_id]
    ); // 检查productdetail表是否存在product_id对应的记录
    const [hotel] = await pool.query(
      "SELECT * FROM hotels WHERE hotel_id = ?",
      [hotel_id]
    ); // 检查hotel表是否存在hotel_id对应的记录

    if (!productDetail || !hotel) {
      // 若查询结果为空，则表示记录不存在
      res.status(404).json({ error: "Product or hotel not found." });
      return;
    }

    const [result] = await pool.query(
      "INSERT INTO productdetail_hotel (product_id, hotel_id) VALUES (?, ?)",
      [product_id, hotel_id]
    ); // 插入产品详情数据并返回结果

    // 新增成功
    res.json({
      message: "Product detail added successfully!",

      //id: result.insertId,
    });
    //product_id= result.insertId;
  } catch (err) {
    console.error(err);
    // 返回错误信息
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
