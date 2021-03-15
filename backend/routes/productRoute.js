import express from "express";
import asyncHandler from "express-async-handler";
import data from "../data2.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const productRoute = express.Router();

productRoute.get(
  "/getbackup",
  asyncHandler(async (req, res) => {
    const pList = await Product.find({});
    const uList = await User.find({});
    const oList = await Order.find({});
    res.json({ uList, pList, oList });
  })
);

productRoute.get(
  "/changeMany",
  asyncHandler(async (req, res) => {
    // const pList = await Product.updateMany({}, [
    //   { $set: { video: { $concat: ["$video", "$brand"] } } },
    // ]);

    // { category: "Computers" },
    //   {
    //     $set: {
    //       ship: 9.99,
    //     },
    //   }
    res.json({ pList });
  })
);

productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const category = req.query.category || "";
    const categoryFilter = category ? { category } : {};
    let pageSize = Number(req.query.pageSize) || 6;
    if (pageSize == 999) {
      // only for Search functions
      const list = await Product.find(categoryFilter);
      const productList = list.map((p) => ({
        name: p.name,
        // _id: p._id,
        // category: p.category,
      }));
      res.send({ productList });
      return;
    }
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    const seller = req.query.seller || "";
    const order = req.query.order || "";
    const deal =
      req.query.deal && Number(req.query.deal) !== 0
        ? Number(req.query.deal)
        : 0;
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const sellerFilter = seller ? { seller } : {};
    const dealFilter = deal ? { deal: { $gte: deal } } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "bestselling"
        ? { numReviews: -1 }
        : { _id: -1 }; /* date */
    const count = await Product.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...dealFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...dealFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate("seller", "seller.name seller.logo")
      .sort(sortOrder)
      .skip(pageSize > 500 ? 0 : pageSize * (page - 1)) /* > 500 = all */
      .limit(pageSize > 500 ? 0 : pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize), count });
  })
);

productRoute.get(
  "/categories",
  asyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

productRoute.get(
  "/seed",
  asyncHandler(async (req, res) => {
    // await Product.remove({});
    const seller = await User.findOne({ isSeller: true });
    if (seller) {
      const products = data.products.map((product) => ({
        ...product,
        seller: seller._id,
      }));
      const createdProducts = await Product.insertMany(products);
      res.send({ createdProducts });
    } else {
      res
        .status(500)
        .send({ message: "No seller found. first run /api/users/seed" });
    }
  })
);

productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "seller.name seller.logo seller.rating seller.numReviews"
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRoute.use(isAuth);

productRoute.post(
  "/",
  isSellerOrAdmin,
  asyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name " + Date.now(),
      seller: req.user._id,
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

productRoute.put(
  "/:id",
  isSellerOrAdmin,
  asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.deal = req.body.deal;
      product.ship = req.body.ship;
      product.image = req.body.image;
      product.video = req.body.video;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRoute.delete(
  "/:id",
  isAdmin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRoute.post(
  "/:id/reviews",
  asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRoute;
