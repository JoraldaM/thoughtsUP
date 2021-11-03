export function PostItemComponent(post) {
  return `
    <div id="post-${post.id}">
        <li class="post">
            <h2>${post.title}</h2>
            <img src="${post.imageUrl}" Alt="Posts image">
            <p>${post.content}</p>
            <h4>Author: ${post.author}</h4>
            <button data-id="${post.id}" id="page-${post.id}" data-action="page" class="page">See</button>
            <button data-id="${post.id}" id="edit-${post.id}" data-action="edit" class="edit">Edit</button>
            <button data-id="${post.id}" id="delete-${post.id}" data-action="delete" class="delete">Delete</button>
        </li>
    </div>
  `;
}
