"use strict";

import {
  setEmptyElement,
  setInnerHtml,
  appendComponent
} from "../helpers/core.js";
// import {
//   prevPage,
//   nextPage
// } from "../helpers/previewNext.js";
import { EditPostFormComponent } from "./components/edit-post-form.js";
import { PostItemListComponent } from "./components/post-item-list.js";
import { PostItemComponent } from "./components/post-item.js";


const postsURL = `http://localhost:3000/posts`;
const postContainer = document.querySelector("#post-container");

// const formContainer = document.querySelector("#edit-post");
const searchBar = document.getElementById("searchBar");

function initializeUpdateDelete() {
  document.addEventListener("DOMContentLoaded", function () {
    // const formContainer = document.querySelector("#edit-post");
    fetch(`${postsURL}`)
      .then((response) => response.json())
      .then((allPosts) => {
       
        // setInnerHtml appends all the components all at once and the for loop appends them one by one.
        // both can be used, but we need to do some benchmarks to know which one is faster.
        // ex. a big list of components when being appended will make the browser throttle because it will
        // need to handle all of them at once, otherwise the for loop that appends them one by one, will not throttle it,
        // but will take some more time to add them

        // for (const post of postData) {
        //   appendComponent(postContainer, PostItemComponent(post));
        // }



        initSearchBarEventListener(allPosts);
        initEditPostClickListener(postContainer, allPosts);
      });
  });

}



function initEditPostClickListener(postContainer, allPosts) {
  postContainer.addEventListener("click", (e) => {
    let { action, id: postId } = e.target.dataset;

    if (action === "edit") {
      const editButton = document.querySelector(`#edit-${postId}`);
      editButton.disabled = true;

      const postData = allPosts.find((post) => {
        return post.id == e.target.dataset.id;
      });

      const editPostFormContainer = document.querySelector(`#post-row-${postId}`);

      appendComponent(editPostFormContainer, EditPostFormComponent(postData))

      const editForm = document.querySelector(`#post-form-${postData.id}`);
   //gets the values from the edited form inputs and updates the post data
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const titleInput = editForm.querySelector("#title").value;
        const desInput = editForm.querySelector("#content").value;
        const mImg = editForm.querySelector("#mImg").value;
        const publ = editForm.querySelector("#publisher").value;
        const key = editForm.getElementsByClassName("keyW");
        const arr = [...key].map((input) => input.value);
        const editedPost = editForm.querySelector(`#edit-post-${postData.id}`);

        fetch(`${postsURL}/${postData.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title: titleInput,
            author: publ,
            imageUrl: mImg,
            createdAt: Date.now(),
            content: desInput,
            keywords: arr,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((post) => {
            setInnerHtml(editedPost, PostItemComponent(post));
            setEmptyElement(editForm);
          });
      });
      
    } else if (action === "delete") {
      deletePost(postId);
    } else if (action === "page") {
      goToSinglePost(postId);
    }
  });
}

function initSearchBarEventListener(allPosts) {
  //filtring posts by title
  searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredPosts = allPosts.filter((post) => {
      return post.title.toLowerCase().includes(searchString);
    });

    setInnerHtml(postContainer, PostItemListComponent(filteredPosts));
  });
}

function deletePost(postId) {
  fetch(`${postsURL}/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => document.querySelector(`#post-${postId}`).remove());
}

function goToSinglePost(postId) {
  let url = new URL("http://127.0.0.1:5500/post.html");

  let search_params = url.searchParams;

  search_params.append("id", postId);

  url.search = search_params.toString();

  window.open(url.toString());
}

initializeUpdateDelete();
