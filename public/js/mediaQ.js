let cd = document.querySelectorAll(".medS");
let cd2 = document.querySelector(".abcd12");
const mediaQuery = window.matchMedia("(max-width: 700px)"); // Adjust the media query as needed

function handleMediaQueryChange(e) {
  if (e.matches) {
    cd.forEach((element) => {
      element.classList.add("col-10");
    });

    cd2.classList.add("abcd3");
  } else {
    cd.forEach((element) => {
      element.classList.add("col-5");
    });
    cd2.classList.add("abcd3");
  }
}

// Initial check
handleMediaQueryChange(mediaQuery);

// Listen for media query changes
mediaQuery.addEventListener("change", handleMediaQueryChange);
