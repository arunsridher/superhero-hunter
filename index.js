const url = 'https://superheroapi.com/api.php/2928355607286861';
const searchBox = document.getElementById('search');
const searchResultsContainer = document.getElementById('search-results-container');

// load event listeners
loadEventListeners();
function loadEventListeners(){
  searchBox.addEventListener('keyup', handleSearch);
}

// when a user clicks enter in the search bar
async function handleEnter(name){
  let data = await fetchAsync(`${url}/search/${name}`);
  // redirect to super hero page if success
  if(data.response === 'success'){
    console.log(data);
    let path = `${window.location.pathname} + /../superhero.html#id=${data.results[0].id}`;
    window.open(path);  
  }
}

// handle search 
async function handleSearch(e){
  // trim the query name
  let name = e.target.value.trim();
  // check if user has hit enter in the search bar
  if(e.keyCode === 13 && name.length > 0){
    handleEnter(name);
  }
  if(name.length == 0){
    await clearResults();
  }
  else{
    // fetch results
    let data = await fetchAsync(`${url}/search/${name}`);
    if(data && data.response === 'success'){
      searchResultsContainer.innerHTML = "";
      let favs = getFavs();
      // create a list of elements for search results and add event listeners
      for(let i = 0; i < data.results.length; i++){
        let item = document.createElement('div');
        item.className = "search-item";
        item.setAttribute('id', `${data.results[i].id}`);

        let label = document.createElement('div');
        label.innerHTML = data.results[i].name;
        label.addEventListener('click', viewHeroPage);
        item.appendChild(label);

        let option = document.createElement('div');
        if(favs.includes(data.results[i].id)){
          option.innerHTML = "Remove from favourites";
          option.addEventListener('click', removeFromFavourites);  
        }
        else{
          option.innerHTML = "Add to favourites";
          option.addEventListener('click', addToFavourites);  
        }
        item.appendChild(option);

        searchResultsContainer.appendChild(item);
      }
    }
    else{
      await clearResults();
    }
  }
}

// fetch results from API
async function fetchAsync (url) {
  try{
    let response = await fetch(url);
    let data = await response.json();
    return data;  
  }catch(err){
    await clearResults();
  }
}

// clear search results
async function clearResults(){
  let i = searchResultsContainer.childNodes.length;
  while(i--){
    searchResultsContainer.removeChild(searchResultsContainer.lastChild);
  }
}

// redirect to a super hero page with respective id
async function viewHeroPage(e){
  let path = `${window.location.pathname} + /../superhero.html#id=${e.target.parentElement.id}`;
  window.open(path);
}

// add a hero to favourites
async function addToFavourites(e){
  let id = e.target.parentElement.id;
  let favs = getFavs();
  if(!favs.includes(id)){
    favs.push(id);
  }
  localStorage.setItem('favHeros', JSON.stringify(favs));
  e.target.innerHTML = 'Remove from favourites';
  e.target.removeEventListener('click', addToFavourites);
  e.target.addEventListener('click', removeFromFavourites);
}

// remove a hero from favourites
async function removeFromFavourites(e){
  let id = e.target.parentElement.id;
  let favs = getFavs();

  let updatedFavs = favs.filter(function(val){
    return val != id;
  })
  localStorage.setItem('favHeros', JSON.stringify(updatedFavs));
  e.target.innerHTML = 'Add to favourites';
  e.target.removeEventListener('click', removeFromFavourites);
  e.target.addEventListener('click', addToFavourites);
}

// retrieve a list of favourite hero id's from local storage
function getFavs(){
  let favs;
  if(localStorage.getItem('favHeros') === null){
    favs = [];
  }
  else{
    favs = JSON.parse(localStorage.getItem('favHeros'));
  }
  return favs; 
}