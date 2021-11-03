 
const container = document.getElementById('post-container');
const searchBar = document.getElementById('searchBar');
let keyData=[];

searchBar.addEventListener('keyup', (e) => {
 const searchString = e.target.value.toLowerCase();

 

 const filteredCharacters = keyData.filter((character) => {
 
    return (
          character.title.toLowerCase().includes(searchString) 
       );  
    });
    displayCharacters(filteredCharacters);

   
});

const loadCharacters = async () => {
   try {
       const res = await fetch('http://localhost:3000/posts/');
       keyData = await res.json();
   } catch (err) {
       console.error();
   }
};

const displayCharacters = (characters) => {
   const htmlString = characters
       .map((post) => {
           return `
           <div id="${post.id}">
           <li class="post">
             <h2>${post.title}</h2>
             <img src="${post.imageUrl}" Alt="Posts image">
             <p>${post.content}</p>
             <h4>Author: ${post.author}</h4>
             <button data-id="${post.id}" id="edit-${post.id}" data-action="edit">Edit</button>
             <button data-id="${post.id}" id="delete-${post.id}" data-action="delete">Delete</button>
             </li>
             </div>`
             ;
       })
       .join('');
   container.innerHTML = htmlString;
};

loadCharacters();