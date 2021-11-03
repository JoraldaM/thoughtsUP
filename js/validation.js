const createForm = document.querySelector('#form');
const errorEl = document.querySelector('#form .errors');

createForm.addEventListener('submit', validateForm);

function validateForm(e){
  e.preventDefault();

  const title = document.querySelector('#form #title');
  const des = document.querySelector('#form #content');
  const mainImg = document.querySelector('#form #mainImg');
  const bodyImg = document.querySelector('#form #bodyImg');
  const publisher = document.querySelector('#form #publisher');
  const keyW = document.querySelector('#form #keywords'); 

  let errors = [];

   if(title.value == ""){
     errors.push({text: "Title", el: title});
   }
   if(des.value == ""){
     errors.push({text: "Description", el: des});
   }
   if(mainImg.value == ""){
     errors.push({text: "Main Image", el: mainImg});
   }
   if(bodyImg.value == ""){
     errors.push({text: "Body Image", el: bodyImg});
   }
   if(publisher.value == ""){
     errors.push({text: "Publisher", el: publisher});
   }

   if (errors.length > 0){
     handle_errors(errors);
     return false;
   }
   alert('Post CREATED');
   return true;
}

function handle_errors(errs){
  let str = "You have errors with the following fields: ";

  errs.map((er) => {
    er.el.classList.add('error');
    str += er.text + ",";
  });

  errs[0].el.focus();

  let error_el = document.createElement('');
  error_el.classList.add('error');
  error_el.innerText = str;

  error_el.addEventListener('click', function(){
    errorEl.removeChild(error_el);
  });
errorEl.appendChild(error_el);
}