// Get search value
function submitSearch() {
    let request = document.getElementById('search');
    if(request != "" && request.value != "") {
        // Get the name with uppercase letters to match the API requests
        let words = request.value.split(" ");
        for (let i = 0; i < words.length; i++) {
           words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        // Re build the value with no space between name parts
        let formatedRequest = "";
        for (let j = 0; j < words.length; j++) {
            formatedRequest += words[j];
        }
        getDetailsChampion(formatedRequest);
    }
}

// Get all champions from League of Legend API
getAllChampions();
let championsList = "";
async function getAllChampions() {
    const reponse = await fetch('https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json');
    const champions = await reponse.json();
    if(champions.data) {
        championsList = champions.data;
    }  
}

// Get a specific champion by name from League of Legend API
let championDetails = "";
async function getDetailsChampion(championName) {
    let url = "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion/" + championName + ".json";
    const reponse = await fetch(url);
    const champion = await reponse.json();
    if(champion.data) {
        championDetails = champion.data;
        loadData(championName, championDetails);
    }  
}

// Load data got from the League of Legend API into the page
function loadData(championName, data) {
    let containerField = document.getElementById('container');
    let imageUrl = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + championName + "_0.jpg";
    imageUrl ? containerField.style.backgroundImage = "url(" + imageUrl + ")" : "";

    let nameField = document.getElementById('name');
    data[championName]["name"] ? nameField.innerHTML = data[championName]["name"] : nameField.innerHTML = "";

    let titleField = document.getElementById('title');
    data[championName]["title"] ? titleField.innerHTML = data[championName]["title"] : titleField.innerHTML = "";

    let blurbField = document.getElementById('blurb');
    data[championName]["blurb"] ? blurbField.innerHTML = data[championName]["blurb"] : blurbField.innerHTML = "";

    let tagsField = document.getElementById('tags');
    tagsField.innerHTML = "";
    let tags = data[championName]["tags"];
    tags.forEach(tag => {
        let tagDiv = '<div class="tag">' + tag + '</div>';
        tagsField.insertAdjacentHTML("beforeend", tagDiv);
    });
}