var express = require("express");
var router = express.Router();

const sql = require("mysql2");

const connection = sql.createConnection({
  host: "localhost",
  user: "root",
  database: "news",
  multipleStatements: true,
});

/* GET home page. */
router.get("/", function (req, res, next) {
  let dB = "SELECT * FROM `cars`;SELECT * FROM `events`;SELECT * FROM `places`";

  connection.query(dB, (err, results, fields) => {
    if (err) {
    } else {
      res.render("index", {
        title: "Homepage",
        para: "This is a paragraph page",
        carDb: results[0],
        eventDb: results[1],
        placeDb: results[2],
      });
    }
  });
});

// cars
router.get("/cars", (req, res) => {
  connection.query("SELECT * FROM `cars`", (err, results, fields) => {
    if (err) {
    } else {
      // res.send(results);
      res.render("cars", { car_data: results });
    }
    // console.log(results[0].Model);
  });
});
router.get("/cars/edit/:id", (req, res) => {
  res.render("editCar", { title: "Edit Car details" });
});
router.post("/cars/edit/:id", (req, res, next) => {
  const id = req.params["id"];
  const { vin, make, model, year } = req.body;
  // console.log(id, vin, make, model, year);
  const sqlData = `UPDATE cars SET Vin = ?, Make = ?, Model = ?, Year = ? WHERE cars.id = ${id}`;
  connection.query(sqlData, [vin, make, model, year], (err, results) => {
    if (err) {
      throw err;
    } else {
      // res.json(results);
      console.log("Data edited");
      res.redirect("/cars");
    }
  });
});
router.get("/cars/create", (req, res) => {
  res.render("create-car", { title: "Add Car details" });
});
router.post("/cars/create", (req, res) => {
  const { vin, make, model, year } = req.body;
  const sqlData = `INSERT INTO cars (Vin, Make, Model, Year) VALUES (?, ? , ? , ?)`;

  connection.query(sqlData, [vin, make, model, year], (err, result) => {
    if (err) throw err;
    console.log("Data Inserted");
  });
  res.redirect("/cars");
});

// places
router.get("/places", (req, res) => {
  connection.query("SELECT * FROM `places`", (err, results, fields) => {
    if (err) {
    } else {
      // res.send(results);
      res.render("places", { place_data: results });
    }
    // console.log(results[0].Model);
  });
});
router
  .route("/places/edit/:id")
  .get((req, res) => {
    res.render("editPlace", { title: "Edit Place details" });
  })
  .post((req, res) => {
    const id = req.params["id"];

    const { countryCode, country, city, address } = req.body;
    const sqlData = `UPDATE places SET countryCode = ?, Country = ?, City = ?, Address = ? WHERE places.id = ${id}`;
    connection.query(
      sqlData,
      [countryCode, country, city, address],
      (err, results) => {
        if (err) {
          throw err;
        } else {
          // res.json(results);
          console.log("Data edited");
          res.redirect("/places");
        }
      }
    );
  });
router
  .route("/places/create")
  .get((req, res) => {
    res.render("createPlace", { title: "Add Place details" });
  })
  .post((req, res) => {
    const { countryCode, country, city, address } = req.body;
    const sqlData = `INSERT INTO places (countryCode, Country, City, Address) VALUES (?, ? , ? , ?)`;

    connection.query(
      sqlData,
      [countryCode, country, city, address],
      (err, result) => {
        if (err) throw err;
        console.log("Data Inserted");
      }
    );
    res.redirect("/places");
  });

// get events
router.get("/events", (req, res) => {
  connection.query("SELECT * FROM `events`", (err, results, fields) => {
    if (err) {
    } else {
      // res.send(results);
      res.render("events", { event_data: results });
    }
    // console.log(results[0].Model);
  });
});

router
  .route("/events/edit/:id")
  .get((req, res) => {
    res.render("editEvent", { title: "Edit Event details" });
  })
  .post((req, res) => {
    const id = req.params["id"];

    const { event, city, attending } = req.body;
    let attendingData;
    if (attending === "Yes") {
      attendingData = 1;
    } else {
      attendingData = 0;
    }

    const sqlData = `UPDATE events SET Event = ?, City = ?, Attending = ? WHERE events.id = ${id}`;
    connection.query(sqlData, [event, city, attendingData], (err, results) => {
      if (err) {
        throw err;
      } else {
        // res.json(results);
        console.log("Data edited");
        res.redirect("/events");
      }
    });
  });
router
  .route("/events/create")
  .get((req, res) => {
    res.render("createEvent", { title: "Add Event details" });
  })
  .post((req, res) => {
    const { event, city, attending } = req.body;
    let attendingData;
    if (attending === "Yes") {
      attendingData = 1;
    } else {
      attendingData = 0;
    }
    const sqlData = `INSERT INTO events (Event, City, Attending) VALUES (?, ? , ?)`;

    connection.query(sqlData, [event, city, attendingData], (err, result) => {
      if (err) throw err;
      console.log("Data Inserted");
    });
    res.redirect("/events");
  });

module.exports = router;
