require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", express.static(path.join(__dirname, "../coverage/lcov-report")));

app.listen(PORT, () => {
	console.log(`Running on port: ${PORT}`);
});