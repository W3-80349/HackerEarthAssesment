const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');
const Validator = require('../middleware/Validator');
const listingController = require('../controller/listingController');
const Auth = require('../middleware/auth');


router.post('/login', Validator.loginValidation, userController.login);

router.post('/register', Validator.registrationValidation, userController.register);

router.post('/properties', Auth.authenticateUser, Validator.validateProperty, listingController.postProperty );

router.get('/properties', Auth.authenticateUser, listingController.getAllProperties);

router.get('/properties/:id', Auth.authenticateUser, listingController.getPropertyById);

router.put('/properties/:id', Auth.authenticateUser, Auth.authorizeUser, listingController.updateProperty);

router.delete('/properties/:id',  Auth.authenticateUser, Auth.authorizeUser, listingController.deleteProperty);
 
router.put('/properties/:propertyId/sold', Auth.authenticateUser, Auth.authorizeUser, listingController.markPropertyAsSold);

router.post('/properties/intrest', Auth.authenticateUser, listingController.showInterestInProperty);

module.exports = router;