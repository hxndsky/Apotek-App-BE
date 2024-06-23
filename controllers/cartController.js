// src/controllers/cartController.js
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (cart) {
            const productExists = cart.items.some(item => item.product.toString() === productId);

            if (productExists) {
                cart.items.forEach(async (item) => {
                    if (item.product.toString() === productId) {
                        item.quantity += quantity;
                    }
                });
            } else {
                cart.items.push({ product: productId, quantity });
            }

            cart = await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = new Cart({
                user: userId,
                items: [{ product: productId, quantity }]
            });

            const savedCart = await newCart.save();
            return res.status(201).json(savedCart);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

export const getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'items.product',
            select: '-createdAt -updatedAt' // exclude timestamps, select all other fields
        });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        // Transformasi data untuk menyertakan URL gambar
        const itemsWithImage = cart.items.map(item => ({
            product: {
                ...item.product._doc,
                image: item.product.image ? `${req.protocol}://${req.get('host')}${item.product.image}` : null
            },
            quantity: item.quantity
        }));

        const cartWithImage = {
            _id: cart._id,
            user: cart.user,
            items: itemsWithImage
        };

        res.status(200).json(cartWithImage);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

export const updateCart = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (productIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(productIndex, 1);
            } else {
                cart.items[productIndex].quantity = quantity;
            }

            const updatedCart = await cart.save();
            return res.status(200).json(updatedCart);
        } else {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

export const deleteCart = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (productIndex > -1) {
            cart.items.splice(productIndex, 1);
            const updatedCart = await cart.save();
            return res.status(200).json({ msg: 'Product Deleted' });
        } else {
            return res.status(404).json({ msg: 'Product not found in cart' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
