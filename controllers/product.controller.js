const { Product } = require("../models");
const HTTP_CODES = require("../utils/httpCodes");

const getAll = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(HTTP_CODES.OK).json(products);
  } catch (e) {
    next(e);
  }
};

const createOne = async (req, res, next) => {
  try {
    const { body } = req;

    const product = await Product.create(body);
    res.status(HTTP_CODES.CREATED).json(product);
  } catch (e) {
    next(e);
  }
};

module.exports = { getAll, createOne };
