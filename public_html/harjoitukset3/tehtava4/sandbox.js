const t1 = document.getElementById("t1");
t1.addEventListener("blur", countSum);

const t2 = document.getElementById("t2");
t2.addEventListener("blur", countSum);

const t3 = document.getElementById("t3");
t3.addEventListener("blur", countSum);

const t4 = document.getElementById("t4");
t4.addEventListener("blur", countSum);

let sum = 0;
let grade = 0;

function countSum(e) {
    if (Number(e.currentTarget.value) > 6 || Number(e.currentTarget.value < 0)) {
        document.getElementById("sum").innerHTML = "VIRHE!";
        document.getElementById("grade").innerHTML = "VIRHE!";
    }
    else {
    sum = Number(sum) + Number(e.currentTarget.value); 
    document.getElementById("sum").innerHTML = `Pistem&auml;&auml;r&auml; (summa): ${sum}`;
    document.getElementById("grade").innerHTML = `Arvosana: ${countGrade(sum)}`;
    }
}

function countGrade(sum) {
    if (sum < 13) {
        return 0;
    }
    else if (sum < 16) {
        return 1;
    }
    else if (sum < 18) {
        return 2;
    }
    else if (sum < 20) {
        return 3;
    }
    else if (sum < 22) {
        return 4;
    }
    else {
        return 5;
    }
}