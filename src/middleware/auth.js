const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const Listing = require('../model/listingModel');
require("dotenv").config();

// Middleware for authentication
exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(req.headers);
    if (!token) {
      return res.status(401).json({ message: 'Access denied, token missing' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    console.log("==============>",decodedToken.userId);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Access denied, invalid token' });
  }
};

// Middleware for authorization
exports.authorizeUser = async (req, res, next) => {
    try {
      const userId = req.userId;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.type !== 'seller') {
        return res.status(403).json({ message: 'Forbidden, user not authorized' });
      }
  
      const propertyId = req.params.id;
      const property = await Listing.findById(propertyId);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      if (property.seller.toString() !== userId) {
        return res.status(403).json({ message: 'Forbidden, user not authorized to delete this property' });
      }
  
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
