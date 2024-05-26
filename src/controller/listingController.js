const Listing = require("../model/listingModel");
const User = require("../model/userModel");
const nodemailer = require("nodemailer");

// Controller for posting a property
const postProperty = async (req, res) => {
  try {
    const listing = new Listing({
      houseNo: req.body.houseNo,
      street: req.body.street,
      area: req.body.area,
      landmark: req.body.landmark,
      pincode: req.body.pincode,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      price: req.body.price,
      numberOfBedrooms: req.body.numberOfBedrooms,
      numberOfBathrooms: req.body.numberOfBathrooms,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      seller: req.userId,
    });

    await listing.save();

    res.status(201).json({ message: "Property posted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Listing.find();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// getting a property by ID
const getPropertyById = async (req, res) => {
    try {
      const property = await Listing.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

const updateProperty = async (req, res) => {
  try {
    const property = await Listing.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.houseNo = req.body.houseNo || property.houseNo;
    property.street = req.body.street || property.street;
    property.area = req.body.area || property.area;
    property.landmark = req.body.landmark || property.landmark;
    property.pincode = req.body.pincode || property.pincode;
    property.city = req.body.city || property.city;
    property.state = req.body.state || property.state;
    property.country = req.body.country || property.country;
    property.price = req.body.price || property.price;
    property.numberOfBedrooms =
      req.body.numberOfBedrooms || property.numberOfBedrooms;
    property.numberOfBathrooms =
      req.body.numberOfBathrooms || property.numberOfBathrooms;
    property.latitude = req.body.latitude || property.latitude;
    property.longitude = req.body.longitude || property.longitude;

    await property.save();

    res.json({ message: "Property updated successfully", property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Listing.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.isDeleted = true;

    await property.save();

    res.json({ message: "Property deleted successfully", property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const markPropertyAsSold = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    const property = await Listing.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await Listing.findByIdAndUpdate(propertyId, { isSoldOut: true });

    res.status(200).json({ message: "Property marked as sold" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendEmail = async (to, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: to,
    subject: subject,
    text: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const showInterestInProperty = async (req, res) => {
  try {
    const propertyId = req.body.propertyId;
    const userId= req.userId;

    const property = await Listing.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    const buyer = await User.findById(userId);
    const seller = await User.findById(property.seller);

    // Send email to seller
    const sellerEmailBody = `Dear ${seller.firstName},\n\nThe buyer name ${buyer.firstName} has shown interest in your property. Here are the property details:\n\nHouse No: ${property.houseNo}\nStreet: ${property.street}\nArea: ${property.area}\nLandmark: ${property.landmark}\nPincode: ${property.pincode}\nCity: ${property.city}\nState: ${property.state}\nCountry: ${property.country}\nNumber of Bedrooms: ${property.numberOfBedrooms}\nNumber of Bathrooms: ${property.numberOfBathrooms}\n\nPlease contact the buyer for further details.\n buyers mobile no: ${buyer.mobileNumber}.\nbuyers Email: ${buyer.email}.\n\nRegards,\Real Estate Platform`;

    await sendEmail(seller.email, "Interest in your property", sellerEmailBody);

    // Send email to buyer
    const buyerEmailBody = `Dear Buyer,\n\nThank you for showing interest in the property. Here are the property details:\n\nHouse No: ${property.houseNo}\nStreet: ${property.street}\nArea: ${property.area}\nLandmark: ${property.landmark}\nPincode: ${property.pincode}\nCity: ${property.city}\nState: ${property.state}\nCountry: ${property.country}\nNumber of Bedrooms: ${property.numberOfBedrooms}\nNumber of Bathrooms: ${property.numberOfBathrooms}\n\nThe seller's contact email is: ${seller.email}.\n contact no : ${seller.mobileNumber}.\n\nRegards,\nYour Real Estate Platform`;

    await sendEmail(buyer.email, "Property Details", buyerEmailBody);

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  markPropertyAsSold,
  markPropertyAsSold,
  showInterestInProperty,
};
