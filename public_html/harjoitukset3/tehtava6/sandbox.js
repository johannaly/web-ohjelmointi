
const colorChoice = document.getElementById("colorChoice");
colorChoice.addEventListener("change", addColorCode);
let color = "";

function addColorCode(e) {
    color = e.currentTarget.value;
    document.getElementById("colorCode").innerHTML = `Valittu: ${color}`;
}

const changeColor = document.getElementById("change");
changeColor.addEventListener("click", changeColorResult);


function changeColorResult() {
    event.preventDefault();
    document.getElementById("result").style.backgroundColor = color;
}

const celebration = document.getElementById("fest");
celebration.addEventListener("keyup", preventNumbers);
celebration.addEventListener("keydown", preventNumbers);
celebration.addEventListener("keyup", typeCelebration);


let result = "";
function typeCelebration(e) {
        if (isNaN(e.key)) {
        result = e.currentTarget.value;
        document.getElementById("celebrationName").innerHTML = result;
        }
    }


function preventNumbers(e) {
    if (e.keyCode > 47 && e.keyCode < 58) {
        e.preventDefault();
    }
}