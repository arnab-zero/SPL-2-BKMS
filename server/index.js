require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const graphData = require("./routes/Data");
const filterData = require("./routes/Filter")


app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());


// Routes
app.use("/api", graphData);
app.use("/api", filterData)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
