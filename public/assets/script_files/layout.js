const backToTopButton = document.querySelector("#back-to-top");
window.addEventListener("scroll", () => {
if (window.scrollY > 100) {
    backToTopButton.style.display = "block";
} else {
    backToTopButton.style.display = "none";
}
});
backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

const loader = document.querySelector(".preloader");

// Show loader
function showLoader() {
  loader.style.display = 'flex';
}

// Hide loader
function hideLoader() {
  loader.style.display = 'none';
}

// Check for loading state
function checkLoadingState() {
  const isLoaded = document.readyState === 'complete';
  if (isLoaded) {
    hideLoader();
  } else {
    showLoader();
    setTimeout(checkLoadingState, 1000);
  }
}

// Check loading state on page load
checkLoadingState();