function laskeSumma(a, b) {
    let num1 = Number(a);
    let num2 = Number(b);
    return num1 + num2;
    
}

function tulostaSumma(a, b) {
document.getElementById("results").innerHTML = "Summa = " + laskeSumma(a, b);
}