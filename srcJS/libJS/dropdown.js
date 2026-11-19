import {createStars} from "./stars.js"
let button = document.querySelector(".open-review");
let dropdown = document.querySelector(".dropdown-form");
if (dropdown && button) {
    dropdown.className = "hidden";
    button.addEventListener("click",() => {
        dropdown.className = dropdown.className === "hidden" ? "open-review" : "hidden";
    })
}


createStars(document.querySelector(".hlidvidhlid div"), document.getElementById("review-stars"));


