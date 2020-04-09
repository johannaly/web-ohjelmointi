import * as $ from 'jquery';

//Funktio hakee tiedot kaikista bussilinjoista, myös niistä mitkä ovat olemassa, mutta eivät juuri nyt liikenteessä.
function getBusLines(onComplete) {
    $.ajax({
        url: 'https://data.itsfactory.fi/journeys/api/1/lines'
    }).fail(function() {
        console.log("fail!");
    }).done(function(data) {
        onComplete(data.body);
    }); 
}

//Funktio hakee koordinaattitiedot liikenteessä olevista busseista
function getBusLocations(onComplete) {
    $.ajax({
        url: 'https://data.itsfactory.fi/journeys/api/1/vehicle-activity'
    }).fail(function() {
        console.log("fail!");
    }).done(function(data) {
        onComplete(data.body);
    }); 
}


export {getBusLines, getBusLocations};

