import {createStars} from "./stars"
let button = document.querySelector(".open-review");
let dropdown = document.querySelector(".dropdown-form");
dropdown.className = "hidden";
button.addEventListener("click",(e) => {
    dropdown.className = dropdown.className === "hidden" ? "open-review" : "hidden";
})



createStars(document.querySelector(".hlidvidhlid div"), document.getElementById("review-stars"));