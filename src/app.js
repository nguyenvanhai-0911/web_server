const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bodyParser = require("body-parser");

const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../public/template");
const partialsDirectory = path.join(__dirname, "../public/template/partials");
const forecast = require("./utils/forecast");
const geocoding = require("./utils/geocoding");

hbs.registerPartials(partialsDirectory);
//set up partials folder
app.use(express.static(publicDirectory));
//set up view engine for express
app.set("view engine", "hbs");
//setup directory for views folder
app.set("views", viewsDirectory);
//set up middleware for body parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", function(request, response) {
  // console.log();
  // response.sendFile(path.join(__dirname, "../public/index.html"));
  response.render("index", {
    title: "Trang Chủ",
    username: "Nguyễn Văn Hải",
    name: "Nguyễn Văn Hải"
  });
});
app.get("/help", (req, res) => {
  const helpPageData = {
    title: "Help Page",
    helpText: "This is tutorial for making forecast app",
    name: "Nguyễn Văn Hải"
  };
  res.render("help", helpPageData);
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    aboutText: "THIS IS ABOUT ME",
    name: "Nguyễn Văn Hải"
  });
});
app.get("/weather", (req, res) => {
  res.render("weather", {
    title: "Weather page",
    name: "Nguyễn Văn Hải"
  });
});
app.get("/result", (req, res) => {
  const { lat, lng, place_name } = req.query;
  forecast(lat, lng, function(err, dataForecast) {
    if (err) {
      return res.send(err);
    }
    const data = {
      ...dataForecast
    };
    console.log(data);

    res.render("result", { data, place_name });
  });
});
app.get("/api/weather", (req, res) => {
  if (!req.query.search) {
    return res.end("SEARCH QUERY IS UNDEFINED, please ....");
  }
  const { search } = req.query;
  let data = undefined;
  geocoding(search, function(err, data) {
    if (err) {
      return res.send(err);
    }
    const place = data.features[0].place_name;
    const lat = data.features[0].geometry.coordinates[1];
    const lng = data.features[0].geometry.coordinates[1];
    forecast(lat, lng, function(err, dataForecast) {
      if (err) {
        return res.send(err);
      }
      const data = {
        ...dataForecast,
        place: place
      };

      res.send(data);
    });
  });
});
app.get("/product", (req, res) => {
  console.log(req.query);
  res.end("Product Detail");
});
app.post("/autocomplete", urlencodedParser, (req, res) => {
  const { search } = req.body;
  geocoding(search, function(err, data) {
    if (err) {
      return res.send(err);
    }
    console.log(data.features);
    const newData = data.features.map(feature => {
      return {
        place_name: feature.place_name,
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0]
      };
    });
    res.render("autocomplete", {
      dataAutocomplete: newData
    });
  });
});
app.get("*", (req, res) => {
  res.send("404 page not found hihi!");
});
console.log("LISTENING PORT 3300");
app.listen(process.env.PORT || 3300);
