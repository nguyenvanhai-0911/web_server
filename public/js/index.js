// fetch("/weather?search=hanoi")
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   });

// const form = document.querySelector("form");
// const input = document.querySelector("#search");
// const para_1 = document.querySelector("#paragraph_1");
// const para_2 = document.querySelector("#paragraph_2");
// const place_result = document.querySelector("#place_result");
// para_1.textContent = "New text";

// const loading = document.querySelector("#loading");
// loading.style.display = "none";
// //Challenge
// // Before fetch data
// // change text of para_2 to LOADING!
// // After fetch
// // IF err => para_2 text print Error!
// // else data => para_2 prin 'Thời tiết của $place hôm nya là $summary với nhiệt độ là $temperature
// handleClickLi = event => {
//   console.log(event.target);
// };
// form.addEventListener("submit", function(event) {
//   event.preventDefault();
//   const searchKeyword = input.value;
//   loading.style.display = "block";

//   var array = ["hochimnh", "hanoi", "hue", "nhatrang"];
//   for (i = 0; i < array.length; i++) {
//     place_result.innerHTML =
//       place_result.innerHTML +
//       `<li place_id="${array[i]}" onclick="handleClickLi(event)">${array[i]}</li>`;
//   }
//   fetch("/api/weather?search=" + searchKeyword)
//     .then(response => {
//       if (!response.ok) {
//         throw response;
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data.err) {
//         return (para_2.textContent = data.err);
//       }
//       const { place, summary, temperature } = data;
//       loading.style.display = "none";

//       para_2.textContent = `Thời tiết của ${place} hôm nya là ${summary} với nhiệt độ là ${temperature}`;
//     })
//     .catch(err => {
//       para_2.textContent = "ERROR!";
//     });
// });
