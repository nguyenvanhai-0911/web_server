// // const request = require ("request");

// // const tokens = "pk.eyJ1Ijoibmd1eWVudmFuaGFpIiwiYSI6ImNrNnlmazY5aTBxN3EzbW52b2dlem12ZGwifQ.ZxXgs8KhvDStwdCfsgqTzA";

// // function geocoding(keyword,callback)
// // {
// //     const geocodingUrl =
// // `https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?access_token=${tokens}&language=vi&limit=1`;
// // let data = null;    
// // request(geocodingUrl,{json: true},(err , res )=>{
// //         if(err){
// //             return callback("Can't connect to server, try later!",undefined);
// //         }
// //         else if (res.body.features.length === 0){
// //             return callback("No result for your keyword", undefined);
// //         }
// //         else{
// //             return callback(undefined,res.body);
// //         }
// //     });
// // }

// // module.exports = geocoding;
// // // Challenge 
// // // in ra lat & Ing cua ket qua dau tien voi keyword la " Ho chi minh"
// // // ham geocoding phai o trong file geocoding trong folder itils
// // // goi geocoding o app.js lay ket qua
// // // in ra ket qua


// const request = require("request");

// const tokens =
//   "pk.eyJ1IjoibWFnMDAyIiwiYSI6ImNrNjBkN2xlcDA2dXgzZXFudDNoeXNyZm8ifQ.hn6xFl6_BqEmfU8RYV3xug";

// function geocoding(keyword, callback) {
//   console.log("Searching....");
//   const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//     keyword
//   )}.json?access_token=${tokens}&language=vi&limit=5`;
//   let data = null;
//   request(geocodingUrl, { json: true }, (err, res) => {
//     if (err) {
//       return callback("Can't connect to server, try later", undefined);
//     } else if (res.body.features.length === 0) {
//       return callback("No result for your keyword", undefined);
//     } else {
//       return callback(undefined, res.body);
//     }
//   });
// }
// //CHALLENGE:
// // IN ra lat & lng cua ket qua dau tien voi keyword la "HO CHI MINH"
// // ham geocoding phai o trong file geocoding trong folder utils
// // goi geocoding o app.js lay ket qua
// // in ra ket qua

// module.exports = geocoding;

// //
// //CODING 2:
// // tao ham forecast(lat,lng) trong folder utils
// // goi ham forecast o app.js
// // in ra ket qua
// // Thoi tiet hom nay tai $ABC la $MATME va nhiet do la $t*


const request = require("request");

const tokens =
  "pk.eyJ1IjoibWFnMDAyIiwiYSI6ImNrNjBkN2xlcDA2dXgzZXFudDNoeXNyZm8ifQ.hn6xFl6_BqEmfU8RYV3xug";

function geocoding(keyword, callback) {
  console.log("Searching....");
  const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    keyword
  )}.json?access_token=${tokens}&language=vi&limit=5`;
  let data = null;
  request(geocodingUrl, { json: true }, (err, res) => {
    if (err) {
      return callback("Can't connect to server, try later", undefined);
    } else if (res.body.features.length === 0) {
      return callback({ err: "No result for your keyword" }, undefined);
    } else {
      return callback(undefined, res.body);
    }
  });
}

module.exports = geocoding;
