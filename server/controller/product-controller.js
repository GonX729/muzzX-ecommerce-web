import Product from '../model/productSchema.js';
import { products } from '../constants/product.js';

export const getProducts = async (request, response) => {
    try {
        // Try to get products from database
        const dbProducts = await Product.find({});
        return response.json(dbProducts);
    } catch (error) {
        console.log('Database not connected, returning mock data');
        // Return mock data from constants if database is not connected
        return response.json(products);
    }
}

export const getProductById = async (request, response) => {
    try {
        // Try to get product from database
        const product = await Product.findOne({ 'id': request.params.id });
        if (!product) return response.status(404).json({ message: 'Product not found' });
        return response.json(product);
    } catch (error) {
        console.log('Database not connected, searching in mock data');
        // Search in mock data if database is not connected
        const product = products.find(p => p.id == request.params.id);
        if (!product) return response.status(404).json({ message: 'Product not found' });
        return response.json(product);
    }
}