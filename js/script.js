// toogle class active

const navbarNav = document.querySelector(".navbar-nav");

// ketika  menu di klik

document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// klik diluar sidebar untuk menghilangkan navbar

const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// toogle class search form active
const searchForm = document.querySelector(".search-form");
const searcBox = document.querySelector("#search-box");

// ketika icon search di klik

document.querySelector("#search").onclick = (e) => {
  searchForm.classList.toggle("active");
  searcBox.focus();
  e.preventDefault();
};

const search = document.querySelector("#search");

document.addEventListener("click", function (e) {
  if (!search.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};
const iconCart = document.querySelector("#shopping-cart");
document.addEventListener("click", function (e) {
  if (!shoppingCart.contains(e.target) && !iconCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

const modal = document.querySelector("#item-detail-modal");
const itemDetailButton = document.querySelectorAll("#detail-button");
itemDetailButton.forEach((btn) => {
  btn.onclick = (e) => {
    modal.style.display = "flex";
    e.preventDefault();
  };
});
document.querySelector(".modal .close-icon").onclick = (e) => {
  modal.style.display = "none";
  e.preventDefault();
};

window.onclick =(e) =>{
  if (e.target === modal) {
    modal.style.display = "none";
    e.preventDefault();
  }
}