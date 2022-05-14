// DEPENDENCIES

require("dotenv").config();
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
connectDB();



// CONFIGURATION
// const { errorHandler } = require("");
const PORT = process.env.PORT || 8070;
const app = express();

// MIDDLEWARE
const corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ROUTES

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/inventory", require("./routes/carRoutes"));

app.get("/", (req, res) => {
  console.log("I'm awake");
  res.send("Hello World");
});

app.use(errorHandler);

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
