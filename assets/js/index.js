//generate footer copyright
const currentYear = new Date();
window.onload = function () {
  document.querySelector("#copyright").innerHTML = currentYear.getFullYear();
}
const mobileNav = document.querySelector("#toggleMobileNav");
const closeNav = document.querySelector("#closeNav");
const showNavIcon = document.querySelector("#showNav");
const indioDisplay = document.querySelector("#indioDisplay") || undefined;
const coachellaDisplay = document.querySelector("#coachellaDisplay") || undefined;
//generate decade
if (document.querySelector("#decade")) {
  document.querySelector("#decade").innerHTML = currentYear.getFullYear() - 1995;
}

//generate navbar scroll
/*
let prevScroll = window.pageYOffset;
window.onscroll = () => {
  if (window.innerWidth > 1000) {
    let currentScroll = window.pageYOffset;
    let navbar = document.querySelector("nav");
    if (prevScroll > currentScroll) {
      navbar.style.top = "0";

    }
    else {
      navbar.style.top = "-500px";

    }
    if (prevScroll === 0 || currentScroll === 0) {
      navbar.classList.remove("active");
    }
    prevScroll = currentScroll;
  }

};*/


function showNavigation(e) {
  mobileNav.style.display = "inline-block";

  showNavIcon.style.display = "none";
  closeNav.style.display = "flex";
}
function closeNavigation() {
  mobileNav.style.display = "none";
  showNavIcon.style.display = "flex";
  closeNav.style.display = "none";
}
if (indioDisplay || coachellaDisplay) {
  indioDisplay.addEventListener('click', () => {
    const coachellaLocation = document.querySelector("#coachellaLocation");
    coachellaLocation.style.display = "none";
    const indioLocation = document.querySelector("#indioLocation");
    indioLocation.style.display = "block";
    document.querySelector("#indioOffice").classList.add("active--location");
    document.querySelector("#coachellaOffice").classList.remove("active--location");

  });
  coachellaDisplay.addEventListener('click', () => {
    const indioLocation = document.querySelector("#indioLocation");
    indioLocation.style.display = "none";
    const coachellaLocation = document.querySelector("#coachellaLocation");
    coachellaLocation.style.display = "block";
    document.querySelector("#coachellaOffice").classList.add("active--location");
    document.querySelector("#indioOffice").classList.remove("active--location");
  });
}
