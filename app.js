const url = 'https://superheroapi.com/api.php/2928355607286861/search/'
const searchBox = document.getElementById('search');
const searchResultsContainer = document.getElementById('search-results-container');
let searchResults = [];

loadEventListeners();
function loadEventListeners(){
  searchBox.addEventListener('input', handleSearch);
  searchBox.addEventListener('click', handleClick);
}

async function handleClick(e){
  let name = e.target.value.trim();
  if(name.length == 0){
    clearSearchResults();
  }
}

async function handleSearch(e){
  let name = e.target.value;
  let data = await fetchAsync(`${url}/${name}`);
  if(data && data.response === 'success'){
    searchResults = data.results;
    updateSearchResults();
  }
  else{
    clearSearchResults();
  }
}

async function fetchAsync (url) {
  try{
    let response = await fetch(url);
    let data = await response.json();
    return data;  
  }catch(err){
    console.log(err);
  }
}

async function updateSearchResults(){
  searchResultsContainer.innerHTML = "";
  for(let i = 0; i < searchResults.length; i++){
    let item = document.createElement('div');
    item.className = "search-item";
    item.innerHTML = searchResults[i].name;
    searchResultsContainer.appendChild(item);
  }
}

function clearSearchResults(){
  searchResults = [];
  searchResultsContainer.innerHTML = "";
}