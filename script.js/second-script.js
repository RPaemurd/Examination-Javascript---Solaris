// Bas-URL för API-anrop
const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";

// Funktion för att hämta planetdata från API
async function fetchPlanets() {
  try {
    // Hämtar API-nyckel
    const apiKeyResponse = await fetch(`${BASE_URL}/keys`, { method: "POST" });
    if (!apiKeyResponse.ok) throw new Error("Failed to fetch API key");

    const apiKeyResponseData = await apiKeyResponse.json();
    const apiKey = apiKeyResponseData.key;

    // Hämtar planetdata med hjälp av API-nyckel
    const planetsResponse = await fetch(`${BASE_URL}/bodies`, {
      method: "GET",
      headers: { "x-zocom": apiKey },
    });
    if (!planetsResponse.ok) throw new Error("Failed to fetch planet data");

    const planetsResponseData = await planetsResponse.json();
    const planetBodies = planetsResponseData.bodies;

    // Hantera parametrar i URL:en för att få information om en specifik planet
    const params = new URLSearchParams(window.location.search);

    // Hämta värdet av parametern 'planet' från URL:en
    const planetName = params.get("planet");

    // Hitta planeten med matchande namn
    const findPlanet = planetBodies.find((planet) => {
      return planet.name.toLowerCase().includes(planetName.toLowerCase());
    });

    // Hämta temperaturdata för dag och natt
    const tempDay = findPlanet.temp ? findPlanet.temp.day : "";
    const tempNight = findPlanet.temp ? findPlanet.temp.night : "";
    // En array med objekt som definierar vilket element som ska uppdateras och vilken egenskap som ska användas från findPlanet
    const planetDetails = [
      { id: "planet-heading", prop: "name" },
      { id: "planet-latinName", prop: "latinName" },
      { id: "planet-description", prop: "desc" },
      { id: "planet-type", prop: "type" },
      {
        id: "planet-rotation",
        prop: "rotation",
        suffix: " DYGN I ANTAL JORDDYGN RUNT EGEN AXEL",
      },
      {
        id: "planet-circumference",
        prop: "circumference",
        suffix: " OMKRETS I KM ",
      },
      {
        id: "planet-temp",
        prop: "temp",
        suffix: ` DAGSTEMPERATUR: ${tempDay}°C, NATTEMPERATUR: ${tempNight}°C`,
      },
      { id: "planet-distance", prop: "distance", suffix: " KM FRÅN SOLEN " },
      {
        id: "planet-orbitalPeriod",
        prop: "orbitalPeriod",
        suffix: " ANTAL JORDDYGN RUNT SOLEN ",
      },
      { id: "planet-moons", prop: "moons" },
    ];
    // Kontrollera om ingen planet hittades
    if (!findPlanet) {
      console.error("Planet not found");
      return; // Avsluta funktionen om ingen planet hittas
    }

    // Iterera över planetDetails arrayen och uppdatera varje HTML-element
    planetDetails.forEach(({ id, prop, suffix = "" }) => {
      const planetElement = document.getElementById(id);
      // Kontrollera om prop är "temp", och sätt i så fall enbart suffixet som innehåll
      if (prop === "temp") {
        planetElement.innerHTML = suffix;
      } else {
        // Om findPlanet finns och prop inte är "temp", sätt innehållet till findPlanet[prop] + suffix
        planetElement.innerHTML = findPlanet
          ? `${findPlanet[prop]}${suffix}`
          : "";
      }
    });
  } catch (error) {
    console.error("Error fetching planet data:", error);
    // Hantera felet, till exempel visa ett felmeddelande för användaren
  }
}

fetchPlanets();
