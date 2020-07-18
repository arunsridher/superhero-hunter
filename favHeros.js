let favHeros = document.getElementById('favourite-heros');
displayFavHeros();

// display a list of favourite heros
async function displayFavHeros(){
  let favs = getFavs();
  for(let i = 0; i < favs.length; i++){
    let element = document.createElement('div');
    element.setAttribute('id', favs[i]);
    element.className = 'hero-details';
    let url = `https://superheroapi.com/api.php/2928355607286861/${favs[i]}`
    let data = await fetchAsync(url);
    if(data && data.response === 'success'){
      let imageContainer = document.createElement('div');
      imageContainer.className = 'hero-img-container';
      let heroImage = document.createElement('img');
      heroImage.setAttribute('src', data["image"]["url"]);
      imageContainer.appendChild(heroImage);
      element.appendChild(imageContainer);
      let info = document.createElement('div');
      info.className = 'info';
      let heroName = document.createElement('div');
      heroName.className = 'hero-name';
      heroName.innerHTML = data["name"];
      info.appendChild(heroName);
      let removeHero = document.createElement('div');
      removeHero.className = 'remove-fav';
      removeHero.innerHTML = 'Remove from Favourites';
      removeHero.addEventListener('click', removeFromFavourites);
      info.appendChild(removeHero);
      element.appendChild(info);
      favHeros.appendChild(element);
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

// get a list of favs
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

// remove from favourites and remove the node from dom
async function removeFromFavourites(e){
  console.log(e.target.parentElement.parentElement);
  let id = e.target.parentElement.parentElement.id;
  console.log(id);
  let favs = getFavs();

  let updatedFavs = favs.filter(function(val){
    return val != id;
  })
  localStorage.setItem('favHeros', JSON.stringify(updatedFavs));

  let heros = document.getElementsByClassName('hero-details');
  for(let i = 0; i < heros.length; i++){
    if(heros[i].id == id){
      favHeros.removeChild(heros[i]);
      break;
    }
  }
}
