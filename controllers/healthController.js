const { successResponse } = require("../utils/responseHelper");

class HealthController {
  check(req, res) {
    return successResponse(
      res,
      {
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
      "API is healthy"
    );
  }
}

module.exports = new HealthController();
