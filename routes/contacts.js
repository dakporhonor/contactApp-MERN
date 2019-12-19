// jshint esversion: 9
const router = require("express").Router();
const User = require("../models/User");
const Contact = require("../models/Contact");

const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
// Add Contact
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, phone, type } = req.body;
      const contact = new Contact({
        name,
        phone,
        email,
        type,
        user: req.user.id
      });

      const savedContact = await contact.save();
      res.json(savedContact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get User's Contacts
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    if (contacts.length === 0) {
      return res.status(404).json({ msg: "No contact for this user" });
    }
    res.json(contacts);
  } catch (error) {
    console.error(errors.message);
    res.status(500).send("Server Error");
  }
});

// Update User's Contact
router.put(
  "/:contact_id",
  [
    auth,
    [
      check("name", "Name is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, phone, email, type } = req.body;
      const contact = await Contact.findOneAndUpdate(
        { _id: req.params.contact_id },
        { name, phone, email, type },
        {
          new: true
        }
      );
      if (!contact) {
        return res.status(404).json({ msg: "No contact to update" });
      }

      res.json(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// Delete User's Contact
router.delete("/:contact_id", auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.contact_id);
    res.json({ msg: "Contact Deleted" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
