import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: false,
      unique: true,
    },
    id_category: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
    indication: {
      type: String,
      required: false,
    },
    composition: {
      type: String,
      required: false,
    },
    dose: {
      type: String,
      required: false,
    },
    howtouse: {
      type: String,
      required: false,
    },
    effect: {
      type: String,
      required: false,
    },
    group: {
      type: String,
      required: false,
    },
    nie: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
