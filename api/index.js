const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");
dotenv.config();

mongoose.connect(
  "mongodb+srv://hrishi2298:hrishikesh2202@cluster0.lxjkxep.mongodb.net/social-media?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
)


//middleware
//middleware
app.use(cors(
  {
    origin:['*'],
    methods:['POST','GET']
    credentials:true
  }
));
app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(9000, () => {
  console.log("Backend server is running!");
});
