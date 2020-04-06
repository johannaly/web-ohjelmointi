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
let activeLines = [];


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieXVyaWFoYW5pIiwiYSI6ImNqanljZTFrMTBjMGEza25kMjBlZGZkdXYifQ.gxDr4e24ngDBS2ZmLueSuw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(mymap);


function initialize(bussilinjat) {
    lines = bussilinjat;
    //console.log(lines);
    setInterval(() => {
        sijainti(haeSijainti);
    }, 1000); 
}    

function addDropdown(lineObject) {
    let name = lineObject.name;
    let node = document.createElement("div");
    let textnode = document.createTextNode(name);
    node.appendChild(textnode);
    if (activeLines.includes(name)) {
        node.classList.add("active");
    } else {
        node.classList.add("lineSelector");
    }
    node.addEventListener("click", lineActive);
    document.getElementById("container").appendChild(node);
}

function lineActive(e) {
    //console.log(e.target.innerHTML);
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
    //console.log(activeLines);
}

function updateLineSelectors(busLocations) {
    let visibleBuslines = lines.filter(line => 
        busLocations.find(location =>
            location.monitoredVehicleJourney.journeyPatternRef === line.name));
    //console.log(visibleBuslines);
    document.getElementById("container").innerHTML = "";
    visibleBuslines.forEach(addDropdown);
}

function isVisible(line) {
    return activeLines.length == 0 || activeLines.find(activeLine => activeLine === line);
}

function deleteDissapearedBusses(busLocations){
    let deletedMarkers = markers.filter(marker => 
        !busLocations.find(location => 
            location.monitoredVehicleJourney.vehicleRef === marker.vehicleRef));
    deletedMarkers.forEach(marker => marker.remove(mymap));

    markers = markers.filter(marker => 
        !deletedMarkers.find(deletedMarker => 
            deletedMarker.vehicleRef === marker.vehicleRef));
}

function haeSijainti(bussisijainnit) {
    deleteDissapearedBusses(bussisijainnit);
    //console.log(activeLines);
    updateLineSelectors(bussisijainnit);
    bussisijainnit.forEach(function(sijainti) {
        //console.log(sijainti);
        let location = sijainti.monitoredVehicleJourney.vehicleLocation;
        let line = sijainti.monitoredVehicleJourney.journeyPatternRef;
        let icon = markers.find(element => element.vehicleRef === sijainti.monitoredVehicleJourney.vehicleRef);

        if (isVisible(line)) {       
            if (icon) {
                //päivitä koordinaatit
                icon.setLatLng([location.latitude, location.longitude]);
            } else {
                icon = L.marker([location.latitude, location.longitude], {
                    icon: L.divIcon({
                        className: 'my-custom-icon',
                        html: line,
                        popupAnchor: [0, -20]
                    })
                });
                icon.vehicleRef = sijainti.monitoredVehicleJourney.vehicleRef;
                markers.push(icon);
                icon.addTo(mymap);

                let found = lines.find((data) => data.name === line);
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
            icon.remove(mymap);
            markers = markers.filter(m => m.vehicleRef != icon.vehicleRef);
        }

    });
}

linjat(initialize);

