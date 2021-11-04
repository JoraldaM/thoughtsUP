export function PostItemComponent(post) {
  return `

    <style>${postItemStyles}</style>

    <div id="post-${post.id}">
        <div class="post row justify-content-between" id="post-row-${post.id}">

          <div class="col-12 col-md-6 col-lg-8 p-4 d-flex flex-column justify-content-between"> 
              <div class="content">
                <h2>${post.title}</h2>
                  
                <p>${post.content}</p>
                <h4>Author: ${post.author}</h4> 
              </div>

              <div class="buttons">
                <button data-id="${post.id}" id="page-${post.id}" data-action="page" class="page">See more</button>
                <button data-id="${post.id}" id="edit-${post.id}" data-action="edit" class="edit">Edit</button>
                <button data-id="${post.id}" id="delete-${post.id}" data-action="delete" class="delete">Delete</button>
              </div>
              
          </div>

          <div class="col-12 col-md-6 col-lg-4">
            <img src="${post.imageUrl}" class="img-fluid" Alt="Posts image"> 
          </div>
     
        </div>
    </div>
  `;
}


const postItemStyles = `
.post {
  background-color: rgba(0, 0, 0, 0.14);
  border-radius: 5px;
 commi text-align: left;
}

.post > h2 {
  margin-bottom: 0px;
}

.post > p {
  margin-top: 10px;
  margin-top: -18px;
}

.post > img {
  max-height: 100px;
}

.post > h4 {
  font-size: medium;
} 

.buttons {
  flex-direction: row;
  display: flex;
  gap: 10px;
}
`;