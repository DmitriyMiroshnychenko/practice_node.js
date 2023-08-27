const User = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/httpError");
const HTTP_CODES = require("../utils/httpCodes");

const { JWT_SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next(new HttpError(HTTP_CODES.UNAUTHORIZED, "User already exists"));
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    res.status(HTTP_CODES.CREATED).json({ email: user.email });
  } catch (e) {
    next(e);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      next(new HttpError(HTTP_CODES.UNAUTHORIZED, "Wrong email or password"));
      return;
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      next(new HttpError(HTTP_CODES.CONFLICT, "Wrong email or password"));
      return;
    }

    const payload = { sub: existingUser._id, email: existingUser.email };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(existingUser._id, { token });

    res.status(HTTP_CODES.OK).json({ token });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.sub, { token: null });
    res.status(HTTP_CODES.NO_CONTENT).json();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signup,
  signin,
  logout,
};
