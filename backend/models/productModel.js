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
    image: { type: String, default: "", required: false },
    video: { type: String, default: "", required: false },
    brand: { type: String, default: "", required: false },
    category: { type: String, required: true },
    subcategory: { type: String, required: false },
    description: { type: String, required: true },
    price: { type: Float, required: true },
    deal: { type: Float, default: 0, required: false },
    ship: { type: Float, default: 0, required: false },
    countInStock: { type: Number, default: 0, required: true },
    rating: { type: Float, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
