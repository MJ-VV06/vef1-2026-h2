let button = document.querySelector(".open-review");
let dropdown = document.querySelector(".dropdown-form");
dropdown.className = "hidden";
button.addEventListener("click",(e) => {
    dropdown.className = dropdown.className === "hidden" ? "open-review" : "hidden";
})