import 'leaflet/dist/leaflet';
import 'leaflet/dist/leaflet.css';
// Import images directly that got missed via the CSS imports above.
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
// Import JS from Leaflet and plugins.
import 'leaflet/dist/leaflet';
import "./styles.css";
import { getBusLines, getBusLocations } from './busdata.js';

//Gloabaalien muuttujien esittely:
//Kaikki olemassa olevat linjat ja niiden kuvaukset
let allLines = []; 
//Leafletin karttaobjekti, johon bussilinjat piirretään
let map = L.map('mapid').setView([61.497743, 23.76129], 11);
//Taulukko kartalla näkyvistä ikoneista
let markers = [];
//Taulukko käyttäjän valintapainikkeilla valitsemia linjoja
let activeLines = [];

//Kartan piirtäminen
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieXVyaWFoYW5pIiwiYSI6ImNqanljZTFrMTBjMGEza25kMjBlZGZkdXYifQ.gxDr4e24ngDBS2ZmLueSuw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(map);

//Callback-funktio, vastaanottaa tiedot bussilinjoista 
function initialize(buslines) {
    allLines = buslines;
    setInterval(() => {
        getBusLocations(updateLocations);
    }, 1000); 
}    

//Funktio luo valintapainikkeen
function addLineSelector(lineObject) {
    let name = lineObject.name;
    let node = document.createElement("div");
    let textnode = document.createTextNode(name);
    node.appendChild(textnode);
    if (activeLines.includes(name)) {
        node.classList.add("active");
    } else {
        node.classList.add("lineSelector");
    }
    node.addEventListener("click", onLineSelectorClick);
    document.getElementById("container").appendChild(node);
}

//Funktio käsittelee valintapainikkeen painalluksen. Ylläpitää activeLines-taulukkoa,
//jonka perusteella päätetään mitä bussilijoja kartalla on näkyvissä.
function onLineSelectorClick(e) {
    if(activeLines.includes(e.target.innerHTML)) {
        const index = activeLines.indexOf(e.target.innerHTML);
        if (index > -1) {
            activeLines.splice(index, 1);
        }
        e.target.classList.add("lineSelector");
        e.target.classList.remove("active");
    }
    else {
        activeLines.push(e.target.innerHTML);
        e.target.classList.add("active");
    }
}

//Funktio päivittää valintapainikkeet sen perusteella mitä busseja on parhaillaan liikenteessä.
function updateLineSelectors(busLocations) {
    let visibleBuslines = allLines.filter(line => 
        busLocations.find(location =>
            location.monitoredVehicleJourney.journeyPatternRef === line.name));
    document.getElementById("container").innerHTML = "";
    visibleBuslines.forEach(addLineSelector);
}

//Testataan onko tuleeko annetun bussilinjan näkyä kartalla. Jos valittuna ei ole mitään valintapainiketta, näytetään
//kartalla kaikki liikenteessä olevat bussilinjat.
function isVisible(line) {
    return activeLines.length == 0 || activeLines.find(activeLine => activeLine === line);
}

//Fuktio poistaa kartalta bussilinjat, jotka eivät ole enää liikenteessä. 
//Muussa tapauksessa kartalle jää bussilinjan ikoni viimeiseen ilmoitettuun koordinaattiin. 
function deleteDissapearedBusses(busLocations){
    let deletedMarkers = markers.filter(marker => 
        !busLocations.find(location => 
            location.monitoredVehicleJourney.vehicleRef === marker.vehicleRef));
    deletedMarkers.forEach(marker => marker.remove(map));

    markers = markers.filter(marker => 
        !deletedMarkers.find(deletedMarker => 
            deletedMarker.vehicleRef === marker.vehicleRef));
}

//Funktio ylläpitää kartalla näkyviä ikoneita.
function updateLocations(busLocations) {
    deleteDissapearedBusses(busLocations);
    updateLineSelectors(busLocations);
    busLocations.forEach(function(busLocation) {
        let location = busLocation.monitoredVehicleJourney.vehicleLocation;
        let line = busLocation.monitoredVehicleJourney.journeyPatternRef;
        let icon = markers.find(element => element.vehicleRef === busLocation.monitoredVehicleJourney.vehicleRef);

        if (isVisible(line)) {       
            if (icon) {
                //päivittää koordinaatit
                icon.setLatLng([location.latitude, location.longitude]);
            } else {
                //luo uuden ikonin
                icon = L.marker([location.latitude, location.longitude], {
                    icon: L.divIcon({
                        className: 'my-custom-icon',
                        html: line,
                        popupAnchor: [0, -20]
                    })
                });
                //laitetaan bussin nimi ikoniin talteen, jotta ikonin sijainnin voi myöhemmin päivittää
                icon.vehicleRef = busLocation.monitoredVehicleJourney.vehicleRef;
                markers.push(icon);
                icon.addTo(map);

                let found = allLines.find((data) => data.name === line);
                let nimi = found ? found.name : line; 
                let text = `<h1>Linja ${nimi}</h1> <h3>${found.description}</h3>`;
                
                icon.bindPopup(text);
                icon.on('mouseover', function (e) {
                    this.openPopup();
                });
                icon.on('mouseout', function (e) {
                    this.closePopup();
                });        
            }
        } else if (icon) {
            icon.remove(map);
            markers = markers.filter(m => m.vehicleRef != icon.vehicleRef);
        }
    });
}

//Funktio käynnistää käytännössä koko ohjelman siinä vaiheessa kun initialize-callback-funktiota kutsutaan.
getBusLines(initialize);

