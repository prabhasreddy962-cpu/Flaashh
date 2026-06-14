export default function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRified-Authorization, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { productUrl } = req.body;
    if (!productUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Mock Database for 9 stores
    const productsDb = {
        'iphone': {
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
        'nikon': {
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
        'samsung': {
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

    const urlLower = productUrl.toLowerCase();
    let matchedProduct = null;

    if (urlLower.includes('iphone')) matchedProduct = productsDb.iphone;
    else if (urlLower.includes('nikon')) matchedProduct = productsDb.nikon;
    else if (urlLower.includes('samsung')) matchedProduct = productsDb.samsung;

    if (matchedProduct) {
        return res.status(200).json({ product: matchedProduct });
    } else {
        // Fallback random generation for any other link pasted
        return res.status(200).json({
            product: {
                name: 'Custom Analyzed Product Deal',
                image: '📦',
                rating: 88,
                features: ['Analyzed Smart Choice', 'Verified Vendor', 'Live Offer'],
                cheapest: 'Flipkart',
                savings: '1,200',
                stores: [
                    { name: 'Amazon', icon: '🛒', price: '₹2,500', actualPrice: 2500 },
                    { name: 'Flipkart', icon: '🛍️', price: '₹1,300', actualPrice: 1300 },
                    { name: 'Myntra', icon: '👗', price: '₹1,800', actualPrice: 1800 },
                    { name: 'Meesho', icon: '📱', price: '₹1,400', actualPrice: 1400 },
                    { name: 'Ajio', icon: '🎯', price: '₹1,900', actualPrice: 1900 },
                    { name: 'Nykaa', icon: '💄', price: '₹2,100', actualPrice: 2100 },
                    { name: 'Snapdeal', icon: '⚡', price: '₹1,600', actualPrice: 1600 },
                    { name: 'ShopClues', icon: '🏬', price: '₹1,700', actualPrice: 1700 },
                    { name: 'Desertcart', icon: '🏪', price: '₹2,600', actualPrice: 2600 }
                ]
            }
        });
    }
}
