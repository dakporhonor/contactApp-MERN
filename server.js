// jshint esversion: 9
const express = require("express");
const users = require("./routes/users");
const contacts = require("./routes/contacts");
const auth = require("./routes/auth");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json({ extended: false }));
app.use("/api/users", users);
app.use("/api/contacts", contacts);
app.use("/api/auth", auth);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendfile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
app.listen(port, () => console.log(`Server is running on port ${port}`));
