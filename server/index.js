require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connection = require("./mongoDB");
const graphData = require("./routes/Data");
const filterData = require("./routes/Filter");
const topics = require("./routes/Topic");
const submittedPapers = require("./routes/SubmitPaper");
const userInfo = require("./routes/Users");
const admin = require("./routes/Admin");
const discussions = require("./routes/Discussion");

app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

//Databse Connection
connection();
// Routes
app.use("/api", graphData);
app.use("/api", filterData);
app.use("/api", topics);
app.use("/api", submittedPapers);
app.use("/api", userInfo);
app.use("/api", admin);
app.use("/api/", discussions);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
