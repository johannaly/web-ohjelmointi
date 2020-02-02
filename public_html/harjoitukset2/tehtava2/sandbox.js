
let printArray = function(arr) {
    let resultLines = "";
    for (let i = 0; i < arr.length; i++) {
        resultLines = resultLines + `taulukko[${i}]: ${arr[i]} <br>`; 
    }
    return resultLines;
}

let arraySum = function(arr) {
    let s = 0;
	for (let i = 0; i < arr.length; i++) {
        s = s + arr[i];
    }
	return s;
}

let arrayCount = (arr) => arr.length;

let arrayAvg = function(arr) {
    let sum = arraySum(arr);
    let count = arrayCount(arr);
    return sum / count;
}

function writeResults() {
    let taulukko = [11, 22, 33, 44];
    document.getElementById("results").innerHTML = "Alkiot ovat: <br>" + printArray(taulukko) + "<br>" + "Lukum&auml;&auml;r&auml; on: " + arrayCount(taulukko) + "<br>" + 
    "Summa on: " + arraySum(taulukko) + "<br>" + "Keskiarvo on: " + arrayAvg(taulukko);
}

window.onload = writeResults;
