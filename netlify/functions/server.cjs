require("express-async-errors");
require("dotenv").config();
const express = require("express");
const { logger } = require("./middleware/logger.cjs");
const { errorHandler } = require("./middleware/errorHandler.cjs");
const { connectDB } = require("./config/dbConnect.cjs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const PORT = 3500;
connectDB();

const app = express();
app.use(logger);

app.use(express.json());

app.use(cookieParser());

// app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root.cjs"));
app.use("/auth", require("./routes/authRoutes.cjs"));
app.use("/users", require("./routes/userRoutes.cjs"));
app.use("/todos", require("./routes/todoRoutes.cjs"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${(err, hostname)}`,
    "mongoErrLog.log"
  );
});
