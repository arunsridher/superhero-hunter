const heroName = document.getElementById("hero-name");
const img = document.getElementById("img");
const powerstats = document.getElementById("powerstats");
const bio = document.getElementById("bio");

// call the update UI method when the window is loaded
window.onload = function(){
  let winurl = window.location.href;
  let id = winurl.substring(winurl.lastIndexOf('=')+1);
  updateUI(id)
}

// update UI from fetched data
async function updateUI(id){
  let url = `https://superheroapi.com/api.php/2928355607286861/${id}`
  let data = await fetchAsync(url);
  console.log(data.name);
  if(data && data.response == 'success'){
    heroName.innerHTML = data["name"];
    img.src = data["image"]["url"];
    document.getElementById("intelligence").appendChild(document.createTextNode(`Intelligence: ${data["powerstats"]["intelligence"]}`));
    document.getElementById("strength").appendChild(document.createTextNode(`Strength: ${data["powerstats"]["strength"]}`));
    document.getElementById("speed").appendChild(document.createTextNode(`Speed: ${data["powerstats"]["speed"]}`));
    document.getElementById("durability").appendChild(document.createTextNode(`Durability: ${data["powerstats"]["durability"]}`));
    document.getElementById("power").appendChild(document.createTextNode(`Power: ${data["powerstats"]["power"]}`));
    document.getElementById("combat").appendChild(document.createTextNode(`Combat: ${data["powerstats"]["combat"]}`));

    document.getElementById("full-name").appendChild(document.createTextNode(`Full Name: ${data["biography"]["full-name"]}`));
    document.getElementById("alter-egos").appendChild(document.createTextNode(`Alter egos: ${data["biography"]["alter-egos"]}`));
    document.getElementById("aliases").appendChild(document.createTextNode(`Aliases: ${data["biography"]["aliases"].toString()}`));
    document.getElementById("place-of-birth").appendChild(document.createTextNode(`Place of birth: ${data["biography"]["place-of-birth"]}`));
    document.getElementById("first-appearance").appendChild(document.createTextNode(`First appearance: ${data["biography"]["first-appearance"]}`));
    document.getElementById("publisher").appendChild(document.createTextNode(`Publisher: ${data["biography"]["publisher"]}`));
    document.getElementById("alignment").appendChild(document.createTextNode(`Alignment: ${data["biography"]["alignment"]}`));
  }
}

// fetch data from API
async function fetchAsync (url) {
  try{
    let response = await fetch(url);
    let data = await response.json();
    return data;  
  }catch(err){
    console.log(err);
  }
}