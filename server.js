const bodyParser = require("body-parser");
let express = require("express");
const createError = require("http-errors");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./db/database");

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database Connected!");
    },
    (error) => {
      console.log("Database Connection Failed!", error);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());
const userRoute = require("./routes/student.routes");

app.use("/endpoint", userRoute);
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log("Port connected to : ", port);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.get("/", (req, res) => {
  res.send("invalid endpoint!");
});

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
