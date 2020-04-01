import * as $ from 'jquery';

function linjat(onComplete) {
    $.ajax({
        url: 'http://data.itsfactory.fi/journeys/api/1/lines'
    }).fail(function() {
        console.log("fail!");
    }).done(function(data) {
        onComplete(data.body);
    }); 
}

function sijainti(onComplete) {
    $.ajax({
        url: 'http://data.itsfactory.fi/journeys/api/1/vehicle-activity'
    }).fail(function() {
        console.log("fail!");
    }).done(function(data) {
        onComplete(data.body);
    }); 
}


export {linjat, sijainti};

