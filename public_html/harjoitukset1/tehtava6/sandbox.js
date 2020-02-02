let taulukko = [11, 22, 33, 44];

document.getElementById("alkiot").innerHTML = "Alkiot ovat: ";

let tulosrivit = "";
for (let i = 0; i < taulukko.length; i++) {
    tulosrivit = tulosrivit + "taulukko[" + i + "]: " + taulukko[i] + "<br>"; 
}
document.getElementById("lasketaanAlkiot").innerHTML = tulosrivit;

let x; 
let lkm = 0;
let summa = 0;

for (x of taulukko) {
    lkm ++;
    summa = summa + x;
}

document.getElementById("lkm").innerHTML = `Lukumäärä on: ${lkm}`;

document.getElementById("summa").innerHTML = `Summa on: ${summa}`;

let ka = summa / lkm;
document.getElementById("ka").innerHTML = `Keskiarvo on: ${ka}`;
