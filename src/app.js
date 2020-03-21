
/*
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname,"../public")));

app.set("view engine","hbs");

request=> middleware => response function => response

C:\user\hihi0\desktop\nodejs_t2\web_server\src
C:\user\hihi0\desktop\nodejs_t2\web_server

app.get("/", function(request, response) {
    console.log();
    response.sendFile(__dirname + "/index.html")
  });

app.get("/", function(request, response) {
    response.render("index");
  });

app.get("/help", (req, res) => {
    // const data = [
    //   { name: "Help A", describe: "How to do A" },
    //   { name: "Help B", describe: "How to do B" }
    // ];
    // const dataJSON = JSON.stringify(data);
    // res.end(dataJSON);
    response.sendFile(__dirname + "/index.html")
  });

  app.get("/about", (req, res) => {
    res.end("<h1>ABOUT PAGE<h1>");
  });
  
  app.get("/weather", (req, res) => {
      const data = [
          {place : 'ho chi minh', forecast: 'sunny day'}
      ]
      const datajson = JSON.stringify(data);
    res.end(datajson);
  });

console.log("LISTENING PORT 3300");
app.listen(3300);
*/

const express = require("express");
const path = require("path");
const app = express();
const hbs = require('hbs');

const geocoding = require("./utils/geocoding");
const forecast = require("./utils/forecast");

const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname,"../public/template");
const partialsDirectory = path.join(__dirname, "../public/template/partials");

hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectory));
//set up view engine for express
app.set("view engine", "hbs");

app.set("views", viewsDirectory);

app.get("/", function(request, response) {
  // console.log();
  // response.sendFile(path.join(__dirname, "../public/index.html"));
  response.render("index", {
    title: "Trang Chủ",
    username: "Nguyễn Văn Hải",
    name: "Ogre"
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

// app.get("/weather", (req, res) => {
//   res.end("<h1>Weather PAGE<h1>");
// });

app.get("/weather",(req,res)=>{
  res.render("Weather", {
    title: "Weather page",
    name: "Nguyễn Văn Hải"
  });
})

app.get("/api/weather", (req, res) => {
  if (!req.query.search) {
    return res.end("SEARCH QUERY IS UNDEFINED, please ....");
  }
const {search} = req.query;
let data = undefined;
geocoding (search, function(err, data){
  if(err){
    return res.send(err);
  }
  const place = data.features[0].place_name;
    const lat = data.features[0].geometry.coordinates[1];
    const lng = data.features[0].geometry.coordinates[0];
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

/*
app.get("/help/*", (req, res) => {
  res.send("<h1>404 not help page hihi!<h1>");
});

app.get("/about/*", (req, res) => {
  res.send("<h1>404 not about page hihi!<h1>");
});

app.get("/weather/*", (req, res) => {
  res.send("<h1>404 page not weather page hihi!<h1>");
});

app.get("*", (req, res) => {
  res.send("<h1>404 page not found hihi!<h1>");
});
*/
console.log("LISTENING PORT 3300");
app.listen(3300);
