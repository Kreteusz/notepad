var express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

var app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors({ origin: `${process.env.CORS}` }));

// mongo connetct
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));
  
// import routes
const authRoutes = require("./routes/auth");

app.use("/api", authRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});


module.exports = app;
