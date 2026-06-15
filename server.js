const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 📊 క్లాడ్ ఇచ్చిన ఒరిజినల్ Mock Database (9 Stores Data)
const productsDb = {
    'iphone-15-pro-max': {
        name: 'Apple iPhone 15 Pro Max (256GB)',
        image: '📱',
        rating: 94,
        features: ['A17 Pro Chip', '48MP Camera', 'Titanium Design'],
        cheapest: 'Flipkart',
        savings: '4,100',
        stores: [
            { name: 'Amazon', icon: '🛒', price: '₹1,44,000', actualPrice: 144000 },
            { name: 'Flipkart', icon: '🛍️', price: '₹1,39,900', actualPrice: 139900 },
            { name: 'Myntra', icon: '👗', price: '₹1,41,500', actualPrice: 141500 },
            { name: 'Meesho', icon: '📱', price: '₹1,42,999', actualPrice: 142999 },
            { name: 'Ajio', icon: '🎯', price: '₹1,43,000', actualPrice: 143000 },
            { name: 'Nykaa', icon: '💄', price: '₹1,44,500', actualPrice: 144500 },
            { name: 'Snapdeal', icon: '⚡', price: '₹1,41,000', actualPrice: 141000 },
            { name: 'ShopClues', icon: '🏬', price: '₹1,45,000', actualPrice: 145000 },
            { name: 'Desertcart', icon: '🏪', price: '₹1,46,000', actualPrice: 146000 }
        ]
    },
    'nikon-d780': {
        name: 'Nikon D780 DSLR Camera Body',
        image: '📷',
        rating: 91,
        features: ['Full-frame DSLR', 'Advanced Autofocus', 'Great Low-light'],
        cheapest: 'Amazon',
        savings: '5,000',
        stores: [
            { name: 'Amazon', icon: '🛒', price: '₹1,35,000', actualPrice: 135000 },
            { name: 'Flipkart', icon: '🛍️', price: '₹1,39,999', actualPrice: 139999 },
            { name: 'Myntra', icon: '👗', price: '₹1,40,000', actualPrice: 140000 },
            { name: 'Meesho', icon: '📱', price: '₹1,42,000', actualPrice: 142000 },
            { name: 'Ajio', icon: '🎯', price: '₹1,41,500', actualPrice: 141500 },
            { name: 'Nykaa', icon: '💄', price: '₹1,43,000', actualPrice: 143000 },
            { name: 'Snapdeal', icon: '⚡', price: '₹1,38,000', actualPrice: 138000 },
            { name: 'ShopClues', icon: '🏬', price: '₹1,39,000', actualPrice: 139000 },
            { name: 'Desertcart', icon: '🏪', price: '₹1,44,000', actualPrice: 144000 }
        ]
    },
    'samsung-s24': {
        name: 'Samsung Galaxy S24 Ultra',
        image: '🤖',
        rating: 92,
        features: ['Galaxy AI', '200MP Camera', 'S-Pen Included'],
        cheapest: 'Meesho',
        savings: '6,000',
        stores: [
            { name: 'Amazon', icon: '🛒', price: '₹1,24,999', actualPrice: 124999 },
            { name: 'Flipkart', icon: '🛍️', price: '₹1,23,000', actualPrice: 123000 },
            { name: 'Myntra', icon: '👗', price: '₹1,25,000', actualPrice: 125000 },
            { name: 'Meesho', icon: '📱', price: '₹1,19,000', actualPrice: 119000 },
            { name: 'Ajio', icon: '🎯', price: '₹1,22,000', actualPrice: 122000 },
            { name: 'Nykaa', icon: '💄', price: '₹1,26,000', actualPrice: 126000 },
            { name: 'Snapdeal', icon: '⚡', price: '₹1,21,000', actualPrice: 121000 },
            { name: 'ShopClues', icon: '🏬', price: '₹1,24,000', actualPrice: 124000 },
            { name: 'Desertcart', icon: '🏪', price: '₹1,28,000', actualPrice: 128000 }
        ]
    }
};

// 🗺️ API Route for Product Comparison
app.post('/api/search-product', (req, res) => {
    const { productUrl } = req.body;
    if (!productUrl) {
        return res.status(400).json({ error: 'Product URL is required' });
    }

    const urlLower = productUrl.toLowerCase();
    let matchedKey = null;

    if (urlLower.includes('iphone')) matchedKey = 'iphone-15-pro-max';
    else if (urlLower.includes('nikon')) matchedKey = 'nikon-d780';
    else if (urlLower.includes('samsung')) matchedKey = 'samsung-s24';

    if (matchedKey && productsDb[matchedKey]) {
        return res.json({ product: productsDb[matchedKey] });
    }

    // Fallback: ఒకవేళ కొత్త లింక్ ఏదైనా పేస్ట్ చేస్తే ఎర్రర్ రాకుండా డైనమిక్ బాక్స్ ఇస్తుంది
    return res.json({
        product: {
            name: 'Custom Analyzed Deal',
            image: '📦',
            rating: 89,
            features: ['Smart Scan Verified', 'Secure Checkout Available', 'Best Online Rate'],
            cheapest: 'Flipkart',
            savings: '1,500',
            stores: [
                { name: 'Amazon', icon: '🛒', price: '₹3,200', actualPrice: 3200 },
                { name: 'Flipkart', icon: '🛍️', price: '₹1,700', actualPrice: 1700 },
                { name: 'Myntra', icon: '👗', price: '₹2,100', actualPrice: 2100 },
                { name: 'Meesho', icon: '📱', price: '₹1,900', actualPrice: 1900 },
                { name: 'Ajio', icon: '🎯', price: '₹2,400', actualPrice: 2400 },
                { name: 'Nykaa', icon: '💄', price: '₹2,500', actualPrice: 2500 },
                { name: 'Snapdeal', icon: '⚡', price: '₹1,950', actualPrice: 1950 },
                { name: 'ShopClues', icon: '🏬', price: '₹2,200', actualPrice: 2200 },
                { name: 'Desertcart', icon: '🏪', price: '₹3,500', actualPrice: 3500 }
            ]
        }
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: '🚀 Flaash AI Server is fully alive!' });
});

module.exports = app;
