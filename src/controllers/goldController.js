const goldService = require("../services/goldService");
const { successResponse, errorResponse } = require("../utils/responseHelper");

class GoldController {
  async getGoldPrice(req, res) {
    try {
      const priceData = await goldService.fetchGoldPrices();
      return successResponse(res, priceData);
    } catch (error) {
      return errorResponse(res, "Failed to fetch gold prices");
    }
  }
}

module.exports = new GoldController();
