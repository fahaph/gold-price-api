const axios = require('axios');
const cheerio = require('cheerio');

const GOLD_URL = 'https://www.goldtraders.or.th/';

async function getGoldPrice() {
    try {
        const { data } = await axios.get(GOLD_URL);
        const $ = cheerio.load(data);

        const prices = {
            bullion: {
                buy: $('#DetailPlace_uc_goldprices1_lblBLBuy').text().trim(),
                sell: $('#DetailPlace_uc_goldprices1_lblBLSell').text().trim()
            },
            ornament: {
                buy: $('#DetailPlace_uc_goldprices1_lblOMBuy').text().trim(),
                sell: $('#DetailPlace_uc_goldprices1_lblOMSell').text().trim()
            },
            date: $('#DetailPlace_uc_goldprices1_lblAsTime').text().trim(),
            source: 'Gold Traders Association'
        };

        return prices;
    } catch (error) {
        console.error('Error fetching gold price:', error);
        throw error;
    }
}

module.exports = { getGoldPrice };
