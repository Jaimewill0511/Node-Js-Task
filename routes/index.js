var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// cars
router.get("/cars", (req, res) => {
  res.render("cars", { title: "Cars" });
});

router.put("/cars/edit:id", (req, res) => {
  res.render("cars", { title: "Cars" });
});
router.post("/cars/create", (req, res) => {
  res.render("cars", { title: "Cars" });
});

// places
router.get("/places", (req, res) => {
  res.render("places", { title: "Places" });
});
router.put("/places/edit:id", (req, res) => {
  res.render("cars", { title: "Cars" });
});
router.post("/places/create", (req, res) => {
  res.render("cars", { title: "Cars" });
});

// get events
router.get("/events", (req, res) => {
  res.render("events", { title: "Events" });
});
router.put("/cars/edit:id", (req, res) => {
  res.render("cars", { title: "Cars" });
});
router.post("/cars/create", (req, res) => {
  res.render("cars", { title: "Cars" });
});

module.exports = router;
