const taulukko = [11, 22, 33, 44];

let printArray = (arr) => {
    let resultLines = "";
    for (let i = 0; i < arr.length; i++) {
        resultLines = resultLines + `taulukko[${i}]: ${arr[i]} <br>`; 
    }
    return resultLines;
}

const arraySum = (sum, currentValue) => sum + currentValue;

let arrayCount = (arr) => arr.length;

let arrayAvg = (arr) => taulukko.reduce(arraySum) / arrayCount(arr);

let sisalto = `
Alkiot ovat:<br><br>
${printArray(taulukko)} <br>
Lukum&auml;&auml;r&auml; on: ${arrayCount(taulukko)} <br>
Summa on: ${taulukko.reduce(arraySum)} <br>
Keskiarvo on: ${arrayAvg(taulukko)}`;

document.getElementById("results").innerHTML = sisalto;
