const loader = document.querySelector("#loader-wrapper");

function displayLoading() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 2000);
}

export { loader, displayLoading };
