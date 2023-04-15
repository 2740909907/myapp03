const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// 引入路由模块
const carouselRoutes = require("./routes/carousel");
const productRoutes = require("./routes/product");
const productDetailsRoutes = require("./routes/product-details");
const hotelRouter = require("./routes/hotel");
const cartRoutes = require("./routes/cart");
const userRoutes = require("./routes/user");
const cartsRoutes = require("./routes/cart2");
const productsRoutes = require("./routes/products");
const userhotelsRoutes = require("./routes/userhotels");
const commentsRoutes = require("./routes/comment");
const searchRoutes = require("./routes/search");
const productdetailhotelRoutes = require("./routes/productdetail-hotel");

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 注册路由模块
app.use("/api/carousel", carouselRoutes);
app.use("/api/product", productRoutes);
app.use("/api/product-details", productDetailsRoutes);
app.use("/api", hotelRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/text", productsRoutes);
app.use("/api/hotel", userhotelsRoutes);
app.use("/api/usercomment", commentsRoutes);
app.use("/api/findproduct", searchRoutes);
app.use("/api/productdetail-hotel", productdetailhotelRoutes);

// 启动服务器
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
