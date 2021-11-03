const urlParams = new URLSearchParams(location.search);
const postsURL = `http://localhost:3000/posts`;
const container = document.querySelector('header');
console.log(location.search);

for (const value of urlParams.values()) {
     idPost= value
    console.log(idPost)
    fetch(`${postsURL}/${idPost}`)
.then((response) => response.json())
.then((post) =>{


  

   container.innerHTML += `<div id="post-${post.id}">
    <li class="post">
         <h2>${post.title}</h2>
        <img src="${post.imageUrl}" Alt="Posts image">
        <p>${post.content}</p>
         <h4>Author: ${post.author}</h4>
    </li>
 </div>`



})
}



