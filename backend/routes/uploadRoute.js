import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";
import cloudinary from "cloudinary";
import Product from "../models/productModel.js";

const uploadRoute = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "-tmp/multi/uploads/");
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });

// const upload = multer({ storage });

const upload = multer({ dest: "uploads/" });

uploadRoute.post("/", isAuth, upload.array("images", 8), (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CD_NAME,
    api_key: process.env.CD_API_KEY,
    api_secret: process.env.CD_API_SECRET,
  });

  (async () => {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .send({ message: "Something wrong happens. Product Not Found" });

    const images = req.files;
    if (!images)
      return res.status(404).send({ message: "No Image has been sent" });

    const cloudImages = images.map(
      (image) =>
        new Promise((resolve, reject) =>
          cloudinary.v2.uploader.upload(
            image.path,
            { folder: `amazin/${productId}` },
            (error, data) => {
              if (error) reject(error);
              else resolve(data.public_id.split("/").pop()); // appName/sellerID/productId/imgName only need to save the imgName to DB
            }
          )
        )
    );

    Promise.all(cloudImages)
      .then((urls) => {
        product.image = [product.image, ...urls].join("^");
        product.save();
        res.send(urls);
      })
      .catch((error) => res.status(401).send({ message: "here" + error }));
  })();
});

uploadRoute.patch("/", isAuth, upload.none(), (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CD_NAME,
    api_key: process.env.CD_API_KEY,
    api_secret: process.env.CD_API_SECRET,
  });

  (async () => {
    const { productId, imgLink, image } = req.body;
    const imgName = imgLink.split("/").pop(); // img file name is the only last piece of url
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .send({ message: "Something wrong happens. Product Not Found" });

    cloudinary.v2.uploader.destroy(`amazin/${productId}/${imgName}`);

    product.image = image;
    try {
      product.save();
      res.send({ message: "updated to DB" });
    } catch (error) {
      res.status(500).send({ message: error });
    }
  })();
});

export default uploadRoute;
