const express = require("express");
const router = express.Router();
const pool = require("../db"); // 引入数据库连接池对象

// 添加商品到购物车
router.post('/add-to-cart', async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    if (!user_id || !product_id || !quantity) { // 检查请求参数是否缺失
        return res.status(400).json({ error: '缺少必要的参数' });
      }
    try {
      const [existingCart] = await pool.query('SELECT * FROM carts WHERE user_id=? AND product_id=?', [user_id, product_id]);
      if (existingCart.length > 0) {
        // 如果购物车中已经有该商品，则更新数量
        await pool.query('UPDATE carts SET quantity=quantity+? WHERE cart_id=?', [quantity, existingCart[0].cart_id]);
        res.status(200).json({ success: true });
      } else {
        // 否则插入新纪录
        const result = await pool.query('INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity]);
        res.status(200).json({ success: true });
      }
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '服务器错误，请稍后再试' });
    }
  });
  
  // 获取用户购物车中的所有商品
  router.get('/cart-items/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const cartItems = await pool.query(`
        SELECT c.cart_id, p.title, p.price, c.quantity, p.image1, c.selected
        FROM carts c INNER JOIN product_details p ON c.product_id=p.product_id
        WHERE c.user_id=?
      `, [user_id]);
      res.status(200).json(cartItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '服务器错误，请稍后再试' });
    }
  });
  
  // 更新购物车商品数量
  router.put('/update-quantity/:cart_id', async (req, res) => {
    const cart_id = req.params.cart_id;
    const { quantity } = req.body;
    try {
      await pool.query('UPDATE carts SET quantity=? WHERE cart_id=?', [quantity, cart_id]);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '服务器错误，请稍后再试' });
    }
  });
  
  // 删除购物车中的商品
  router.delete('/remove-item/:cart_id', async (req, res) => {
    const cart_id = req.params.cart_id;
    try {
      await pool.query('DELETE FROM carts WHERE cart_id=?', [cart_id]);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '服务器错误，请稍后再试' });
    }
  });
  
  module.exports = router;