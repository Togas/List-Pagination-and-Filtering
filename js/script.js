/******************************************
 Treehouse Techdegree:
 FSJS project 2 - List Filter and Pagination
 ******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/**
 * global variables
 */
const allStudents = document.querySelectorAll("li");
const numberOfPages = Math.ceil(allStudents.length / 10);
const mainDiv = document.querySelector(".page");
const pageSize = 10;
let selectedPage = 1;
const pagination = document.createElement("div");
const text = document.createElement("p");
const searchBar = document.createElement("div");

//function insures that only 10 students are displayed on the selected page
const showPage = (listOfStudents, pageSelected) => {
  for (let i = 0; i < listOfStudents.length; i++) {
    listOfStudents[i].style.display = "none";
  }
  for (let i = 0; i < pageSize; i++) {
    if (listOfStudents[i + pageSelected * 10 - 10])
      listOfStudents[i + pageSelected * 10 - 10].style.display = "";
  }
};

/**
 * creates pagination for the fitting number of elements. You have to give the argument numberOfPages that represent the pages you want.
 * The  const numberOfPages as global const knows how many students are in the list and so how many pages you need.
 * 
 */
const appendPageLinks = numberOfPages => {
  const paginationlist = document.createElement("ul");
  pagination.className = "pagination";

  for (var i = 1; i <= numberOfPages; i++) {
    const paginationButton = document.createElement("li");
    const paginationLink = document.createElement("a");

    paginationLink.innerHTML = i;
    paginationLink.href = "";

    paginationButton.appendChild(paginationLink);
    paginationlist.appendChild(paginationButton);
  }

  pagination.appendChild(paginationlist);
  mainDiv.appendChild(pagination);
  if (pagination.firstElementChild.childNodes[0])
    pagination.firstElementChild.childNodes[0].firstChild.className = "active";
};

/**
 * creates the search bar
 */
const createSearchBar = () => {
  const pageHeader = document.querySelector(".page-header");
  searchBar.className = "student-search";
  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search for students...";
  const searchButton = document.createElement("button");
  searchButton.innerHTML = "Search";

  searchBar.appendChild(searchInput);
  searchBar.appendChild(searchButton);
  pageHeader.appendChild(searchBar);
};

showPage(allStudents, selectedPage);
appendPageLinks(numberOfPages);
createSearchBar();

/* 
The search: takes fullName and nameList as arguments. fullName is 
the name that you put into the search and nameList is a collection of all the 
h3 elements that contain the names.
Returns text if searchbar is empty. returns text if no students are found. Hides all students and then displays the students that got matched. Search compares regex values.
The search is case insensitive and compares the the search input with the first letters of the students names
*/

const searchName = (fullName, nameList) => {
  for (let i = 0; i < allStudents.length; i++) {
    allStudents[i].style = "display:none";
  }
  if (fullName === "") {
    text.textContent = "You've left the searchbar empty!";
    createBackButton(document.querySelector('.page-header'));
    mainDiv.getElementsByTagName("ul")[0].appendChild(text);
    document.querySelector('.pagination').style.display='none';
    return;
  }

  let nameFound = 0;
  const nameRegex = new RegExp("^" + fullName, "i");
  for (let i = 0; i < nameList.length; i++) {
    if (nameRegex.test(nameList[i].textContent)) {
      createBackButton(document.querySelector('.page-header'));
      allStudents[i].style.display = "";
      nameFound++;
    }
    if (i == nameList.length - 1 && nameFound == 0) {
      createBackButton(document.querySelector('.page-header'));
      text.textContent = "Unfortunately we have no students with this name";
      mainDiv.getElementsByTagName("ul")[0].appendChild(text);
   
    }
  }

  const paginationLink = pagination.querySelector("ul");
  paginationLink.parentNode.removeChild(paginationLink);
  appendPageLinks(Math.ceil(nameFound / 10));
};

//function creates a back button and appends it as child of the element that you provide as argument
const createBackButton= parentElement =>{
   const backIcon=document.createElement('i');
   backIcon.className='fas fa-2x fa-arrow-circle-left';
   const backIconWrapper= document.createElement('a');
   backIconWrapper.href='index.html';
   backIconWrapper.appendChild(document.createElement('br'));
   backIconWrapper.appendChild(document.createElement('br'));
   backIconWrapper.appendChild(backIcon);
   parentElement.appendChild(backIconWrapper);

}

//click event listener for pagination
pagination.addEventListener("click", e => {
  if (e.target.tagName == "A") {
    e.preventDefault();
    selectedPage = e.target.textContent;
    if (e.target.className == "active") {
      return;
    }

    for (let i = 0; i < numberOfPages; i++)
      pagination.firstElementChild.childNodes[i].firstChild.className = "";

    e.target.className = "active";
    showPage(allStudents, selectedPage);
  }
});

//click event listener for search
searchBar.addEventListener("click", e => {
  if (event.target.tagName == "BUTTON") {
    if (text.textContent) {
      text.parentNode.removeChild(text);
    }

    const name = searchBar.getElementsByTagName("input")[0].value;
    const nameList = mainDiv.querySelectorAll("h3");

    searchName(name, nameList);
  }
});
