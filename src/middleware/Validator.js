const Joi = require("joi");

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    next();
  }
};

const registrationValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().min(10).required(),
    type: Joi.string().valid("seller", "buyer").required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  }).with("password", "confirmPassword");

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    next();
  }
};

const validateProperty = (req, res, next) => {
  const schema = Joi.object({
    houseNo: Joi.string().required(),
    street: Joi.string().required(),
    area: Joi.string(),
    landmark: Joi.string().allow(""),
    pincode: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    numberOfBedrooms: Joi.number().integer().min(1).required(),
    numberOfBathrooms: Joi.number().integer().min(1).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    price: Joi.number().required(), // Add validation for price field
    numberOfLikes: Joi.number().integer().min(0).default(0),
    isSoldOut: Joi.boolean().default(false),
    isDeleted: Joi.boolean().default(false),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

const validateSoldProperty = (req, res, next) => {
  const schema = Joi.object({
    propertyId: Joi.string().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

const validateInterestRequest = (req, res, next) => {
  const schema = Joi.object({
    propertyId: Joi.string().required(),
    buyerEmail: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
};

module.exports = validateInterestRequest;

module.exports = {
  loginValidation,
  registrationValidation,
  validateProperty,
  validateSoldProperty,
  validateInterestRequest,
};
