'use strict';

import { PostItemComponent } from "./components/post-item.js";
import {
  appendComponent,
  setEmptyElement,
  setInnerHtml,
} from "../helpers/core.js";
import { PostItemListComponent } from "./components/post-item-list.js";
const postsURL = `http://localhost:3000/posts`;
const postContainer = document.querySelector("#post-container");
const formContainer = document.querySelector("#edit-post");



function initializeUpdateDelete() {
  document.addEventListener("DOMContentLoaded", function () {
    // const postsURL = `http://localhost:3000/posts`;
    const formContainer = document.querySelector("#edit-post");
  
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
        

    postContainer.pagination({
      dataSource: allPosts,
      callback: function(data, pagination) {
          // template method of yourself
          setInnerHtml(postContainer, PostItemListComponent(allPosts));
      }
  })


  
  
        // setInnerHtml(postContainer, PostItemListComponent(allPosts));
  
        initEditPostClickListener(postContainer, allPosts);
  
      });
  
  });
}


function initEditPostClickListener(postContainer, allPosts) {
  postContainer.addEventListener("click", (e) => {
    let { action, id: postId } = e.target.dataset;

    if (action === "edit") {
      const editButton = document.querySelector(`#edit-${e.target.dataset.id}`);
      editButton.disabled = true;

      const postData = allPosts.find((post) => {
        return post.id == e.target.dataset.id;
      });
      e.target.parentElement.innerHTML += `
        <div id='edit-post'>
        <form action="" id="post-form-${postData.id}">
          <div class="set">
            <div>
            <label for="title">Title</label>
            <input id="title" type="text" value="${postData.title}" ></input>
          </div>
          </div>
        <div class="set">
          <div>
            <label for="content">Description</label>
            <textarea id="content" name="content" rows="10" cols="15">${postData.content}</textarea>
          </div>
          </div>
          <div class="set">
          <div>
          <label for="mainIMg"> Main-image</label>
           <input name="imageUrl" type="text" id="mImg" value="${postData.imageUrl}"/></input>
         </div> 
          </div>
          
        <div class="set">
          <div>
            <label for="publisher">Publisher</label>
            <input name="author" type="text" id="publisher" value="${postData.author}"/></input>
          </div>
        </div>
        <div>
        <div class="KeyW">
          
          <label for="keywords">Keywords</label>
          <input required name="keywords" type="text" id="keywords" value="${postData.keywords}"/></input> 
          <button id="addFields"  >&plus;</button> 
        </div>
        </div>
        <input type="submit" value="Edit Post" class="btn">

      </div>`;

      const editForm = document.querySelector(`#post-form-${postData.id}`);

      editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const titleInput = editForm.querySelector("#title").value;
        const desInput = editForm.querySelector("#content").value;
        const mImg = editForm.querySelector("#mImg").value;
        const publ = editForm.querySelector("#publisher").value;
        const key = editForm.getElementsByClassName("keyW");
        const arr = [...key].map((input) => input.value);
        const editedPost = editForm.querySelector(
          `#edit-post-${postData.id}`
        );

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
      deletePost(postId)
    } else if (action === "page"){
      singlePost(postId)
    }
   
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
  .then(res=> document.querySelector(`#post-${postId}`).remove());
}



 function singlePost(postId){
   const queryString = window.location;
    console.log(queryString);
    var url = new URL('http://127.0.0.1:5500/post.html');
   

var search_params = url.searchParams;

search_params.append('id', postId);

url.search = search_params.toString();

var new_url = url.toString();
console.log(new_url);
  window.open(new_url)
  const container = document.querySelector('.right-container');
}



initializeUpdateDelete();


