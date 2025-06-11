let scroll = window.scrollY;

window.addEventListener("scroll", () => {
  scroll = window.scrollY;
  if (scroll > 2) {
    document.querySelector("#back-to-top").style.display = "block";
  } else {
    document.querySelector("#back-to-top").style.display = "none";
  }
});

document.querySelector("#back-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
