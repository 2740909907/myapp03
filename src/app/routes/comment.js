const express = require("express");
const router = express.Router();
const pool = require("../db"); // 引入数据库连接池对象

router.get("/comments/:product_id", async (req, res) => {
  try {
    const productId = req.params.product_id;

    // 查询评论和用户名字
    const query = `SELECT comments.id, comments.product_id, users.username, comments.comment_text, comments.comment_time
                       FROM comments
                       JOIN users ON comments.user_id = users.user_id
                       WHERE comments.product_id = ${productId}`;
    const results = await pool.query(query);

    // 返回评论列表
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving comments");
  }
});

// 发表评论
router.post("/comments", async (req, res) => {
  const { product_id, user_id, comment_text } = req.body;

  // 插入评论
  const query = `INSERT INTO comments (product_id, user_id, comment_text, comment_time) VALUES (${product_id}, ${user_id}, '${comment_text}', NOW())`;
  try {
    const results = await pool.query(query);
    const comment = {
      id: results.insertId,
      product_id,
      user_id,
      comment_text,
      comment_time: new Date(),
    };
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting comment");
  }
});

module.exports = router;
