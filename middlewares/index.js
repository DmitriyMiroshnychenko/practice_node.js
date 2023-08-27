const handleError = require("./handleError.middleware");
const checkJwtToken = require("./jwt-token.middlewares");

module.exports = { handleError, checkJwtToken };
