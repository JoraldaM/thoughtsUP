import { setInnerHtml } from "../helpers/core.js";
import { PostItemListComponent } from "./components/post-item-list.js";

const btnNext = document.querySelector("#btn_next");
const btnPrev = document.getElementById("btn_prev");
const container = document.getElementById("post-container");
let currentPage = 1;


//Listener for calling next and prev functions by clicking next and prev buttons
function initPaginationButtonClickListeners() {
  btnNext.addEventListener("click", (e) => {
    nextPage();
  });

  btnPrev.addEventListener("click", (e) => {
    prevPage();
  });
}
// function called by prev button to go back to preview page
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadPosts(currentPage);
  }
}

//function called by next button to move to the next page
function nextPage() {
  currentPage++;
  loadPosts(currentPage);
}

function loadPosts(page = 1, limit = 5) {
  fetch(`http://localhost:3000/posts?_page=${page}&_limit=${limit}`)
    .then((response) => response.json())
    .then((posts) => renderPosts(posts));
}

loadPosts();
initPaginationButtonClickListeners();
function renderPosts(posts) {
  setInnerHtml(container, PostItemListComponent(posts));
}
