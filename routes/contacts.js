// jshint esversion: 9
const router = require("express").Router();
// Add Contact
router.post("/", (req, res) => {
  res.send("Testing");
});

// Get User's Contacts
router.get("/", (req, res) => {
  res.send("Get users contact");
});

// Update User's Contact
router.get("/:contact_id", (req, res) => {
  res.send("Update users contact");
});

// Delete User's Contact
router.delete("/:contact_id", (req, res) => {
  res.send("Delete users contact");
});

module.exports = router;
