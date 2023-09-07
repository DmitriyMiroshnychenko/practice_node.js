const jwt = require("jsonwebtoken");
const HttpError = require("../utils/httpError");
const HTTP_CODES = require("../utils/httpCodes");
const { User } = require("../models");

const { JWT_SECRET_KEY } = process.env;

const checkJwtToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new HttpError(HTTP_CODES.UNAUTHORIZED, "Invalid token"));
    }

    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);

    const existingUser = await User.findById(decodedToken.sub);
    if (!existingUser.token || existingUser.token !== token) {
      next(new HttpError(HTTP_CODES.UNAUTHORIZED, "Token was corrupted"));
    }
    req.user = { sub: decodedToken.sub, email: decodedToken.email };
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = checkJwtToken;
