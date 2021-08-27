const express = require("express");

const imageRoute = express.Router();

const imageController = require("../server/Controllers");

imageRoute.post("/save", imageController.saveImage);
imageRoute.post("/get-data", imageController.getData);
imageRoute.post("/set-title", imageController.setTitle);
imageRoute.delete("/delete-image", imageController.deleteImage);



module.exports = imageRoute;