const { successResponse } = require("../utils/responseHelper");

class MainController {
  getApiInfo(req, res) {
    const apiData = {
      specialThanks: {
        name: "Bank Theerawat",
        message: "Thank you for your support and contribution!",
      },
      availableEndpoints: [
        {
          path: "/api/",
          method: "GET",
          description: "API information and available endpoints",
        },
        {
          path: "/api/health",
          method: "GET",
          description: "Health check endpoint",
        },
        {
          path: "/api/gold-price",
          method: "GET",
          description: "Get current gold price",
        },
        {
          path: "/api/love",
          method: "GET",
          description: "Get a random love message",
        },
      ],
    };

    return successResponse(
      res,
      apiData,
      "Special thanks to Bank Theerawat for this amazing DevOps session!"
    );
  }
}

module.exports = new MainController();
