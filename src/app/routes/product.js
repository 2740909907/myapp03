const express = require("express");
const router = express.Router();
const pool = require("../db"); // 引入数据库连接池对象

// 商品列表接口
router.get("/", async (req, res) => {
  try {
    const { category, page = 1, per_page = 20 } = req.query; // 获取查询参数

    let sql = "SELECT * FROM product";
    let values = [];

    if (category) {
      // 添加分类过滤条件
      sql += " WHERE category = ?";
      values.push(category);
    }

    // 添加分页限制
    sql += ` LIMIT ${(page - 1) * per_page}, ${per_page}`;

    // 查询数据
    const [rows] = await pool.query(sql, values);

    // 查询总商品数量
    const [countRows] = await pool.query(
      "SELECT COUNT(*) as count FROM product",
      values
    );

    // 返回数据
    res.json({
      page,
      per_page,
      total: countRows[0].count,
      products: rows,
    });
  } catch (err) {
    console.error(err);
    // 返回错误信息
    res.status(500).send("Internal Server Error");
  }
});

// 增加产品详情
router.post("/products", async (req, res) => {
  try {
    const { name1, name2, price, image_url } = req.body; // 获取请求体中的数据
    const [result] = await pool.query(
      "INSERT INTO product (name1, name2, price, image_url) VALUES (?, ?, ?, ?)",
      [name1, name2, price, image_url]
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

    // 查询 product_details 表中指定 ID 的记录是否存在
    const [rows] = await pool.query("SELECT * FROM product WHERE id = ?", [
      productId,
    ]);

    if (rows.length > 0) {
      // 存在该产品详情，则删除记录
      await pool.query("DELETE FROM product WHERE id = ?", [productId]);
      res.json({ message: "Product deleted successfully!" });
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
