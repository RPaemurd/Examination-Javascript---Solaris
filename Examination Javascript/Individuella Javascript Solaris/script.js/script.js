// Definierar bas-URL:en för API-anropet
const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";

// Här hämtas referenser till HTML-elementen med hjälp av deras ID
const inputField = document.getElementById("input-field");
const searchButton = document.getElementById("search-button");

// En array som innehåller namnen på planeterna
let planets = ['Solen', 'Merkurius', 'Venus', 'Jorden', 'Mars', 'Jupiter', 'Saturnus', 'Uranus', 'Neptunus'];

// Lyssna på förändringar (input) i "inputField" och kör funktionen "inputSearch" när något ändras
inputField.addEventListener('input', inputSearch);

// Om sökknappen existerar, aktiveras en lyssnare för klick och kör "navigateToSecondHTML"-funktionen
if (searchButton){
    searchButton.addEventListener('click', navigateToSecondHTML);
}

// En funktion för att hantera användarens inmatning när det skrivs i sökfältet
function inputSearch(event){
    let userInput = event.target.value;
    console.log(userInput); // för att se vad användaren skriver
    // userInput.value = ""; //funkar inte
}

// En funktion som söker efter en planet baserat på användarens inmatning
let findPlanet = (userInput) => {
    return planets.find(planet => planet.toLowerCase() === userInput.toLowerCase());
}

// En funktion för att navigera till en andra HTML-sida med planetparametern i URL:en
function navigateToSecondHTML(){
    let planet = findPlanet(inputField.value);

    //om planeten hittas navigerar vi till second.html med planeten som parameter
    if (planet) {
        window.location.href = 'second.html?planet=' + planet;
    } else {
        alert('Planet finns tyvärr inte! 🌍🔭'); // Meddelande om planeten inte hittas
    }
}




