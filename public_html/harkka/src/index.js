import 'leaflet/dist/leaflet';
import 'leaflet/dist/leaflet.css';
// Import images directly that got missed via the CSS imports above.
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
// Import JS from Leaflet and plugins.
import 'leaflet/dist/leaflet';
import "./styles.css";
import { linjat, sijainti } from './bussitiedot.js';


let mymap = L.map('mapid').setView([61.497743, 23.76129], 11);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieXVyaWFoYW5pIiwiYSI6ImNqanljZTFrMTBjMGEza25kMjBlZGZkdXYifQ.gxDr4e24ngDBS2ZmLueSuw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets'
    }).addTo(mymap);

    
    linjat((l) => console.log(l));
    sijainti((l) => console.log(l));
