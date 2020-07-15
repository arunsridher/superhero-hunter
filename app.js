const url = 'https://superheroapi.com/api.php/2928355607286861';
const searchBox = document.getElementById('search');
const searchResultsContainer = document.getElementById('search-results-container');

loadEventListeners();
function loadEventListeners(){
  searchBox.addEventListener('keyup', handleSearch);
}

async function handleSearch(e){
  let name = e.target.value.trim();
  if(name.length == 0){
    await clearResults();
  }
  else{
    let data = await fetchAsync(`${url}/search/${name}`);
    if(data && data.response === 'success'){
      searchResultsContainer.innerHTML = "";
      for(let i = 0; i < data.results.length; i++){
        let item = document.createElement('div');
        item.className = "search-item";
        item.setAttribute('id', `${data.results[i].id}`);
        item.innerHTML = data.results[i].name;
        item.addEventListener('click', viewHeroPage);
        searchResultsContainer.appendChild(item);
      }
    }
    else{
      await clearResults();
    }
  }
}

async function fetchAsync (url) {
  try{
    let response = await fetch(url);
    let data = await response.json();
    return data;  
  }catch(err){
    await clearResults();
  }
}

async function clearResults(){
  let i = searchResultsContainer.childNodes.length;
  while(i--){
    searchResultsContainer.removeChild(searchResultsContainer.lastChild);
  }
}

async function viewHeroPage(e){
  let path = `${window.location.pathname} + /../superhero.html#id=${e.target.id}`;
  window.open(path);
}