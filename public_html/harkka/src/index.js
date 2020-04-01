import 'leaflet/dist/leaflet';
import 'leaflet/dist/leaflet.css';
// Import images directly that got missed via the CSS imports above.
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
// Import JS from Leaflet and plugins.
import 'leaflet/dist/leaflet';
import "./styles.css";
import { linjat, sijainti } from './bussitiedot.js';

let lines = [];
let mymap = L.map('mapid').setView([61.497743, 23.76129], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieXVyaWFoYW5pIiwiYSI6ImNqanljZTFrMTBjMGEza25kMjBlZGZkdXYifQ.gxDr4e24ngDBS2ZmLueSuw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(mymap);

    
function initialize(bussilinjat) {
    lines = bussilinjat;
    sijainti(haeSijainti);    
}    

function haeSijainti(bussisijainnit) {
    bussisijainnit.forEach(function(sijainti) {
        //console.log(sijainti);
        let location = sijainti.monitoredVehicleJourney.vehicleLocation;
        let line = sijainti.monitoredVehicleJourney.journeyPatternRef;
        let icon = L.marker([location.latitude, location.longitude], {
            icon: L.divIcon({
                className: 'my-custom-icon',
                html: line
            })
          });
          icon.addTo(mymap);

        let found = lines.find((data) => data.name === line);
        let nimi = found ? found.name : line; 
    
        //console.log(found);
        //let nimi = found.name;
        //console.log("nimi" + nimi);
        
        let text = `<h1>${nimi}</h1>`;
        console.log(text);
        //marker.bindPopup(text);
          /*
          let linjat = tallennaLinjat(bussilinjat);
          if (linjat.name === sijainti.monitoredVehicleJourney.lineRef) {
              let text = `<h1>${linjat.name}</h1> <p>${linjat.description}</p>`;
              marker.bindPopup(text);
              marker.addEventListener("hover", e => {
                  if (e.target.isPopupOpen()) e.target.openPopup();
              });
          } */
    });
}

linjat(initialize);
