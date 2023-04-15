const express = require("express");
const router = express.Router();
const pool = require("../db"); // 引入数据库连接池对象

// 商品详情接口
router.get("/:product_id", async (req, res) => {
  try {
    const productId = parseInt(req.params.product_id); // 获取商品 ID

    // 查询 product_details 视图中指定 ID 的记录
    const [rows] = await pool.query(
      "SELECT * FROM product_details WHERE id = ?",
      [productId]
    );

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

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM product_details");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 增加产品详情
router.post("/products", async (req, res) => {
  try {
    const {
      product_id,
      image1,
      image2,
      image3,
      title,
      title1,
      title2,
      price,
      content1,
      content2,
      phone,
      hotel1name,
      hotel1a,
      hotel1price,
      hotel2name,
      hotel2a,
      hotel2price,
      hotel3name,
      hotel3a,
      hotel3price,
      picture1,
      picture2,
      picture3,
    } = req.body; // 获取请求体中的数据
    const [result] = await pool.query(
      "INSERT INTO product_details (product_id, image1, image2, image3, title, title1, title2, price, content1, content2, phone, hotel1name, hotel1a, hotel1price, hotel2name, hotel2a, hotel2price, hotel3name, hotel3a, hotel3price, picture1, picture2, picture3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        product_id,
        image1,
        image2,
        image3,
        title,
        title1,
        title2,
        price,
        content1,
        content2,
        phone,
        hotel1name,
        hotel1a,
        hotel1price,
        hotel2name,
        hotel2a,
        hotel2price,
        hotel3name,
        hotel3a,
        hotel3price,
        picture1,
        picture2,
        picture3,
      ]
    ); // 插入产品详情数据并返回结果

    if (result.insertId) {
      // 新增成功
      res.json({
        message: "Product detail added successfully!",

        id: result.insertId,
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

// 删除产品详情
router.delete("/:product_id", async (req, res) => {
  try {
    const productId = parseInt(req.params.product_id); // 获取商品 ID

    // 查询 productdetail_hotel 表中是否存在引用要删除的产品详情的记录
    const [rows1] = await pool.query(
      "SELECT * FROM productdetail_hotel WHERE product_id = ?",
      [productId]
    );
    const [rows2] = await pool.query(
      "SELECT hotel_id FROM productdetail_hotel WHERE product_id = ?",
      [productId]
    );
    const [rows3] = await pool.query("SELECT * FROM product WHERE id = ?", [
      productId,
    ]);
    const [rows4] = await pool.query(
      "SELECT * FROM carts WHERE product_id = ?",
      [productId]
    );

    if (rows1.length > 0) {
      // 存在引用该产品详情的记录，则先删除这些记录
      await pool.query("DELETE FROM productdetail_hotel WHERE product_id = ?", [
        productId,
      ]);
      for (let i = 0; i < rows2.length; i++) {
        await pool.query("DELETE FROM hotels WHERE hotel_id = ?", [
          rows2[i].hotel_id,
        ]);
      }
      await pool.query("DELETE FROM product WHERE id = ?", [productId]);
    }
    if (rows4.length > 0) {
      await pool.query("DELETE FROM carts WHERE product_id = ?", [productId]);
    }

    // 查询 product_details 表中指定 ID 的记录是否存在
    const [rows] = await pool.query(
      "SELECT * FROM product_details WHERE product_id = ?",
      [productId]
    );

    if (rows.length > 0) {
      // 存在该产品详情，则删除记录
      await pool.query("DELETE FROM product_details WHERE product_id = ?", [
        productId,
      ]);
      res.json({ message: "Product detail deleted successfully!" });
    } else {
      // 不存在该产品详情
      res.status(404).send("Not Found");
    }
  } catch (err) {
    console.error(err);
    // 返回错误信息
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
