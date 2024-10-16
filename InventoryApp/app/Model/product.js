import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        sku: {
            type: String,
            required: true,
            unique: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
        },
        unitsSold: {
            type: Number,
            default: 0, // Default to 0 initially
            min: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema, "Product");
