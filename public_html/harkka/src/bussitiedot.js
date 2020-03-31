
import * as $ from 'jquery';

function linjat(callback) {
    $.ajax({
        url: 'http://data.itsfactory.fi/journeys/api/1/lines'
    }).fail(function() {
        console.log("fail!");
    }).done(function(data) {
        console.log(data);
    }); 
    callback ([1, 4, 5]);
}


function sijainti(callback) {
    callback ([{"line-id": 2, "lat": "23.34", "lon": "34.56"}]);
}

export {linjat, sijainti};

