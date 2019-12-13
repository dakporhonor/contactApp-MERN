// jshint esversion: 9
const express = require("express");
const users = require("./routes/users");
const contacts = require("./routes/contacts");
const auth = require("./routes/auth");

const app = express();
const port = process.env.PORT || 5000;

app.use("/api/users", users);
app.use("/api/contacts", contacts);
app.use("/api/auth", auth);

app.listen(port, () => console.log(`Server is running on port ${port}`));
