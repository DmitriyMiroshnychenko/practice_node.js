const jwt = require("jsonwebtoken");
const HttpError = require("../utils/httpError");
const HTTP_CODES = require("../utils/httpCodes");

const { JWT_SECRET_KEY } = process.env;

const checkJwtToken = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization?.split(" ");

    if (bearer === "Bearer" || !token) {
      next(new HttpError(HTTP_CODES.UNAUTHORIZED, "Invalid token"));
    }
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);

    req.user = { sub: decodedToken.sub, email: decodedToken.email };
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = checkJwtToken;
