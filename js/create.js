

const postsURL = `http://localhost:3000/posts`;

const errorsURL = `http://localhost:3000/errors?status=422`;
const postForm = document.querySelector('#form');
const validateErrorsBtn = document.querySelector('#errorBtn');
const titleError = document.querySelector('#errTitle'); 
const imageError = document.querySelector('#errImage'); 
const dataError = document.querySelector('#errData'); 


let allPosts = []

fetch(`${postsURL}`)
 .then( response => response.json() )
 .then( postData => postData.forEach(function(post) {
   allPosts = postData
  
 }))
 postForm.addEventListener('submit', (e) => {
 if(validateErrorsBtn.clicked == true){
  e.preventDefault();
  window.history.back();
  //  return 
 }
 else {


 const titleInput = document.querySelector('#title').value
 const desInput = document.querySelector('#content').value
 const mImg = document.querySelector('#mImg').value
 const publ = document.querySelector('#publisher').value

 const key = document.getElementsByClassName('keyW')
 const arr = [...key].map(input => input.value)


 fetch(`${postsURL}`, {
   method: 'POST',
   body: JSON.stringify({
   title: titleInput,
   author: publ,
   imageUrl: mImg,
   createdAt: Date.now(),
   content: desInput,
   keywords: arr,
   }),
   headers: {
   'Content-Type': 'application/json'
   }
 }).then( response => response.json()) 
 postForm.reset();

}
 
//  postForm.reset();
});


//clicking the button will show the errors 


validateErrorsBtn.addEventListener('click', (e) => {

  fetch(`${errorsURL}`)
  .then( response => response.json() )
  .then( errors => {
    titleError.innerHTML=errors[0].fields.title
    imageError.innerHTML=errors[0].fields.imageUrl
    dataError.innerHTML=errors[0].message
  })
})