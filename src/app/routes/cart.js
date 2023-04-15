const express = require("express");
const router = express.Router();
const pool = require("../db"); // 引入数据库连接池对象

// 获取购物车中所有商品
router.get("/getcart", (req, res) => {
  const query =
    "SELECT cart_items.id, cart_items.product_id, product_details.title, product_details.price, product_details.image1, cart_items.quantity, cart_items.selected FROM cart_items INNER JOIN product_details ON cart_items.product_id = product_details.product_id";
  pool
    .query(query)
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      throw error;
    });
});

// 添加商品到购物车
router.post("/postcart", (req, res) => {
  const { product_id, quantity } = req.body;
  const query = `INSERT INTO cart_items (product_id, quantity) VALUES (${product_id}, ${quantity})`;
  pool
    .query(query)
    .then((results) => {
      res.json({ message: "Product added to cart." });
    })
    .catch((error) => {
      throw error;
    });
});

// 更新购物车中的商品数量
router.put("/:id/putcart", (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const query = `UPDATE cart_items SET quantity = ${quantity} WHERE product_id = ${id}`;
  pool
    .query(query)
    .then((results) => {
      res.json({ message: "Cart item updated." });
    })
    .catch((error) => {
      throw error;
    });
});

// 删除购物车中的商品
router.delete("/:id/deletecart", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM cart_items WHERE product_id = ${id}`;
  pool
    .query(query)
    .then((results) => {
      res.json({ message: "Cart item deleted." });
    })
    .catch((error) => {
      throw error;
    });
});

module.exports = router;
