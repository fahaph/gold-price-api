const app = require("./app");
const config = require("./config/config");

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
  console.log(`Health Check: http://localhost:${config.port}/api/health`);
  console.log(`Gold Price: http://localhost:${config.port}/api/gold-price`);
  console.log(`Love Message: http://localhost:${config.port}/api/love`);
});
