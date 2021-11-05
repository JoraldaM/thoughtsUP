export function SinglePostComponent(post) {
  return `
     <div id="post-${post.id}">
         <li class="post">
              <h2>${post.title}</h2>
              <img src="${post.imageUrl}" Alt="Posts image">
              <p>${post.content}</p>
              <h4>Author: ${post.author}</h4>
         </li>
    </div>
`;
}
