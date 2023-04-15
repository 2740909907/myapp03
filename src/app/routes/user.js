const express = require("express");
const router = express.Router();
const pool = require("../db"); // 引入数据库连接池对象
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // 先查询数据库中是否已经存在该用户名或邮箱
    const [userByUsername] = await pool.query(
      `SELECT * FROM users WHERE username='${username}'`
    );
    if (userByUsername.length > 0) {
      return res.status(400).send({ error: "Username already exists" });
    }

    const [userByEmail] = await pool.query(
      `SELECT * FROM users WHERE email='${email}'`
    );
    if (userByEmail.length > 0) {
      return res.status(400).send({ error: "Email already exists" });
    }

    //const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`
    );
    res.status(201).send({ message: "User registered successfully"});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    if (rows.length > 0) {
      res.json(rows);
      // 返回数据
      //res.send({ message: "Login Successful" });
    } else {
      // 返回错误信息
      res.status(404).send({ error: "Not Found" });
    }
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    res.status(500).send(error.message);
  }
});

module.exports = router;
