import { setInnerHtml } from "../helpers/core.js";
import { SinglePostComponent } from "./components/single-post.js";

function getPostIdFromParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

function getPost() {
  const postId = getPostIdFromParams();
  const postsURL = `http://localhost:3000/posts`;

  fetch(`${postsURL}/${postId}`)
    .then((response) => response.json())
    .then((post) => {
      renderPost(post);
      setPageTitle(post.title);
    });
}

function renderPost(post) {
  const container = document.querySelector("header");

  setInnerHtml(container, SinglePostComponent(post));
}

function setPageTitle(title) {
     document.title = title + ' | ThoughtsUp'
}

getPost();
