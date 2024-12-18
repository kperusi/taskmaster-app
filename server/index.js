const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const staticPath=path.join(__dirname, 'public')
// const PORT = 5000;

const PORT = process.env.PORT || 5000;
// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(staticPath));
// Routes
app.use( authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


