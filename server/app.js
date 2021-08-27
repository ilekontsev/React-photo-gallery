const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const imageRoute = require("../server/Route");
const port = 5000;

const app = express();
app.use(cors());

app.use('/static', express.static(__dirname + '/uploads'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", imageRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
