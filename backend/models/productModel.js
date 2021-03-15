import mongoose from "mongoose";
import mFloat from "mongoose-float";
const Float = mFloat.loadType(mongoose, 2);

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    image: { type: String, required: true },
    video: { type: String, required: false },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: false },
    description: { type: String, required: true },
    price: { type: Float, required: true },
    deal: { type: Float, required: false },
    ship: { type: Float, required: false },
    countInStock: { type: Number, required: true },
    rating: { type: Float, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
