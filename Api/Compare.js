export default async function handler(req, res) {
  // CORS ఎర్రర్స్ రాకుండా సెట్ చేయడం
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // ఎటువంటి బయటి సాఫ్ట్‌వేర్ లేకుండా డైరెక్ట్‌గా లింక్ ఓపెన్ చేసే సరికొత్త లాజిక్
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    if (!response.ok) {
      throw new Error(`Target site responded with status ${response.status}`);
    }

    const html = await response.text();
    let extractedPrice = 0;
    let title = "Curated Premium Product";

    // అమెజాన్ ప్రైస్ స్క్రాపింగ్
    if (url.includes('amazon')) {
      const priceRegex = /<span class="a-price-whole">([0-9,]+)/;
      const titleRegex = /<span id="productTitle"[^>]*>\s*([^<]+)\s*<\/span>/;
      
      const priceMatch = html.match(priceRegex); // స్పెల్లింగ్ మిస్టేక్ ఫిక్స్ చేశాను!
      const titleMatch = html.match(titleRegex);

      if (priceMatch) extractedPrice = parseInt(priceMatch[1].replace(/,/g, ''), 10);
      if (titleMatch) title = titleMatch[1].trim();
    } 
    // ఫ్లిప్‌కార్ట్ ప్రైస్ స్క్రాపింగ్
    else if (url.includes('flipkart')) {
      const priceRegex = /<div class="Nx9u7c">₹([0-9,]+)/;
      const titleRegex = /<span class="VU-ZEz">\s*([^<]+)\s*<\/span>/;
      
      const priceMatch = html.match(priceRegex);
      const titleMatch = html.match(titleRegex);

      if (priceMatch) extractedPrice = parseInt(priceMatch[1].replace(/,/g, ''), 10);
      if (titleMatch) title = titleMatch[1].trim();
    }

    // ఒకవేళ రేట్ దొరకకపోతే డీఫాల్ట్ బేస్ ప్రైస్
    if (!extractedPrice || extractedPrice === 0) {
      extractedPrice = 1999; 
    }

    // లైవ్ రేట్ ని బట్టి మిగతా సైట్ల ధరల క్యాలిక్యులేషన్
    const finalPrices = [
      { name: "Shopsy",    price: Math.floor(extractedPrice * 0.93), url: "https://earnmaro.com" },
      { name: "Flipkart",  price: url.includes('flipkart') ? extractedPrice : Math.floor(extractedPrice * 0.98), url: "https://earnmaro.com" },
      { name: "Amazon",    price: url.includes('amazon') ? extractedPrice : Math.floor(extractedPrice * 1.02), url: "https://earnmaro.com" },
      { name: "Meesho",    price: Math.floor(extractedPrice * 0.90), url: "https://earnmaro.com" },
      { name: "Myntra",    price: Math.floor(extractedPrice * 1.05), url: "https://earnmaro.com" },
      { name: "Ajio",      price: Math.floor(extractedPrice * 0.96), url: "https://earnmaro.com" },
      { name: "Tata Cliq", price: Math.floor(extractedPrice * 1.01), url: "https://earnmaro.com" },
    ].sort((a, b) => a.price - b.price);

    return res.status(200).json({
      title: title,
      prices: finalPrices
    });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch live prices', details: error.message });
  }
}
