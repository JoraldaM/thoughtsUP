export function EditPostFormComponent(postData) {
  return `
  <div id='edit-post' class="col-12 p-5">
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
}
