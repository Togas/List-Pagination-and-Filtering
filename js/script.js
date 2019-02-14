/******************************************
 Treehouse Techdegree:
 FSJS project 2 - List Filter and Pagination
 ******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
 Add your global variables that store the DOM elements you will 
 need to reference and/or manipulate. 
 
 But be mindful of which variables should be global and which 
 should be locally scoped to one of the two main functions you're 
 going to create. A good general rule of thumb is if the variable 
 will only be used inside of a function, then it can be locally 
 scoped to that function.
 ***/
const allStudents = document.querySelectorAll('li');
const numberOfPages = Math.ceil(allStudents.length / 10);
const mainDiv = document.querySelector('.page');
const pagination = document.createElement('div');
const pageSize=10;
let selectedPage=1;
const text= document.createElement('p');


/*** 
 Create the `showPage` function to hide all of the items in the 
 list except for the ten you want to show.
 
 Pro Tips: 
 - Keep in mind that with a list of 54 students, the last page 
 will only display four.
 - Remember that the first student has an index of 0.
 - Remember that a function `parameter` goes in the parens when 
 you initially define the function, and it acts as a variable 
 or a placeholder to represent the actual function `argument` 
 that will be passed into the parens later when you call or 
 "invoke" the function 
 ***/

const showPage= (listOfStudents, page) =>{
   for(let i=0; i<listOfStudents.length;i++){
      listOfStudents[i].style.display='none';
      
   }
   for(let i=0; i<pageSize; i++){
      if(listOfStudents[i+page*10-10])
      listOfStudents[i+page*10-10].style.display='';
      
   }
   
   
}




/*** 
 Create the `appendPageLinks function` to generate, append, and add 
 functionality to the pagination buttons.
 ***/
const appendPageLinks = (numberOfPages) =>{
   const paginationlist = document.createElement('ul');
   pagination.className='pagination';
   
   for(var i=1; i<=numberOfPages; i++ ){ 
      const paginationButton = document.createElement('li');
      const paginationLink = document.createElement('a')
      
      paginationLink.innerHTML=i;
      paginationLink.href='';
      
      paginationButton.appendChild(paginationLink);
      paginationlist.appendChild(paginationButton);
   }
   
   pagination.appendChild(paginationlist);
   mainDiv.appendChild(pagination);
   
}

pagination.addEventListener('click', (e)=>{
   if(e.target.tagName == 'A'){
      e.preventDefault();
      selectedPage= e.target.textContent;
      for(let i=0; i<numberOfPages;i++)
      pagination.firstElementChild.childNodes[i].firstChild.className="";
      
      e.target.className='active';
      showPage(allStudents, selectedPage);
   }
})

const searchBar= document.createElement('div');
const createSearchBar= () => {
   const pageHeader= document.querySelector('.page-header');
   searchBar.className='student-search';
   const searchInput = document.createElement('input');
   searchInput.placeholder= 'Search for students...';
   const searchButton = document.createElement('button');
   searchButton.innerHTML='Search'; 
   
   searchBar.appendChild(searchInput);
   searchBar.appendChild(searchButton);
   pageHeader.appendChild(searchBar);
   
}


showPage(allStudents, selectedPage);   
appendPageLinks(numberOfPages);
createSearchBar();
pagination.firstElementChild.childNodes[0].firstChild.className='active';


const searchName= (fullName, nameList)=>{
   for(let i=0; i<allStudents.length; i++)
   allStudents[i].style='display:none';
    
   if(fullName ===''){
       
      text.textContent='You\'ve left the searchbar empty!';
      mainDiv.getElementsByTagName('ul')[0].appendChild(text);
      return;
    }

   
   const nameSplitted = fullName.split(' ');
   if(nameSplitted.length == 1){
   for(let i=0; i<nameList.length; i++){
      let name = nameList[i].textContent.split(' ');
      let firstName= name[0];
      if(firstName === nameSplitted[0]){
         allStudents[i].style='display:';
         return console.log('Name found');
      } if(i == nameList.length-1) {
         text.textContent='Unfortunately we have no students with this name';
         mainDiv.getElementsByTagName('ul')[0].appendChild(text);
      }
      }
   }else{
      for(let i=0; i<nameList.length; i++){
         if(fullName === nameList[i].textContent)
         allStudents[i].style='display:';
         if(i == nameList.length-1) 
         console.log('no name found');
         }
   }
}


searchBar.addEventListener('click', (e) =>{
   if(event.target.tagName == 'BUTTON'){
      if(text.textContent){
         text.parentNode.removeChild(text);
      }

      const name= searchBar.getElementsByTagName('input')[0].value;
      const nameList= mainDiv.querySelectorAll('h3');

      searchName(name, nameList);
   }
})


// Remember to delete the comments that came with this file, and replace them with your own code comments.