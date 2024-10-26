// Select the filters container
const filtersContainer = document.getElementById("filters");

// Scroll amount for each button click
const scrollAmount = 200;

// Scroll left
document.querySelector(".arrow-left").onclick = () => {
  filtersContainer.scrollLeft -= scrollAmount;
};

// Scroll right
document.querySelector(".arrow-right").onclick = () => {
  filtersContainer.scrollLeft += scrollAmount;
};
