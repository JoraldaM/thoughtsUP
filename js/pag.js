import { PostItemComponent } from "./components/post-item.js";
import {

  setInnerHtml,
} from "../helpers/core.js";
import { PostItemListComponent } from "./components/post-item-list.js";

const postContainer = document.querySelector("#post-container");

fetch(`http://localhost:3000/posts`)
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
  

  $('#post-container').pagination({
dataSource: allPosts,
callback: function(allPosts, pagination) {
    // template method of yourself
    setInnerHtml(postContainer, PostItemListComponent(allPosts));
}
})
})


  //  setInnerHtml(postContainer, PostItemListComponent(allPosts));