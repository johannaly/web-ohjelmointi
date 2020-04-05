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
let markers = [];


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieXVyaWFoYW5pIiwiYSI6ImNqanljZTFrMTBjMGEza25kMjBlZGZkdXYifQ.gxDr4e24ngDBS2ZmLueSuw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(mymap);


function initialize(bussilinjat) {
    lines = bussilinjat;
    //console.log(lines);
    //lines.forEach(addDropdown);
    setInterval(() => {
        sijainti(haeSijainti);
    }, 1000); 
}    

function addDropdown(lineObject) {
    let name = lineObject.name;
    let node = document.createElement("div");
    let textnode = document.createTextNode(name);
    node.appendChild(textnode);
    node.classList.add("lineSelector");
    document.getElementById("container").appendChild(node);

}

function updateLineSelectors(busLocations) {
    let visibleBuslines = lines.filter(line => 
        busLocations.find(location =>
            location.monitoredVehicleJourney.journeyPatternRef === line.name));
    //console.log(visibleBuslines);
    document.getElementById("container").innerHTML = "";
    visibleBuslines.forEach(addDropdown);
}

function haeSijainti(bussisijainnit) {
    updateLineSelectors(bussisijainnit);
    bussisijainnit.forEach(function(sijainti) {
        //console.log(sijainti);
        let location = sijainti.monitoredVehicleJourney.vehicleLocation;
        let line = sijainti.monitoredVehicleJourney.journeyPatternRef;
        let icon = markers.find(element => element.vehicleRef === sijainti.monitoredVehicleJourney.vehicleRef);
        if (icon) {
            //päivitä koordinaatit
            icon.setLatLng([location.latitude, location.longitude]);
        } else {
            icon = L.marker([location.latitude, location.longitude], {
                icon: L.divIcon({
                    className: 'my-custom-icon',
                    html: line
                })
            });
            icon.vehicleRef = sijainti.monitoredVehicleJourney.vehicleRef;
            markers.push(icon);
            icon.addTo(mymap);
        }

        let found = lines.find((data) => data.name === line);
        let nimi = found ? found.name : line; 

        //console.log(found);
        //let nimi = found.name;
        //console.log("nimi" + nimi);
        
        let text = `<h1>Linja ${nimi}</h1> <h3>${found.description}</h3>`;
        icon.bindPopup(text);
        icon.on('mouseover', function (e) {
            this.openPopup();
        });
        icon.on('mouseout', function (e) {
            this.closePopup();
        });
    });
}

linjat(initialize);

