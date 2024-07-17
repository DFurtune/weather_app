import { loader } from "./displayLoading.js";

function hideLoading() {
  loader.classList.remove("display");
}

export { hideLoading };
