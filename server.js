const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// serve frontend static files from the parent folder (project root)
app.use(express.static(path.join(__dirname, '..')));

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected"))
.catch(err => console.log(err));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req,res)=>{
  res.send("Backend is running");
});

app.listen(5500, () => console.log("Server running on port 5500"));

