const axios = require("axios");
const cheerio = require("cheerio");
const config = require("../config/config");

class GoldService {
  async fetchGoldPrices() {
    try {
      const { data } = await axios.get(config.goldUrl);
      const $ = cheerio.load(data);

      const prices = {
        bullion: {
          buy: $("#DetailPlace_uc_goldprices1_lblBLBuy").text().trim(),
          sell: $("#DetailPlace_uc_goldprices1_lblBLSell").text().trim(),
        },
        ornament: {
          buy: $("#DetailPlace_uc_goldprices1_lblOMBuy").text().trim(),
          sell: $("#DetailPlace_uc_goldprices1_lblOMSell").text().trim(),
        },
        date: $("#DetailPlace_uc_goldprices1_lblAsTime").text().trim(),
        source: "Gold Traders Association",
      };

      return prices;
    } catch (error) {
      console.error("Error in GoldService:", error);
      throw error;
    }
  }
}

module.exports = new GoldService();
