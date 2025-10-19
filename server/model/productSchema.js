import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    // Keep id as a Number. We manage IDs in seed data (server/constants/product.js)
    id: Number,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});

// Note: removed mongoose-auto-increment plugin to avoid peer dependency conflicts.
// IDs for products are provided by seed data and are numeric.

const Product = mongoose.model('product', productSchema);

export default Product;