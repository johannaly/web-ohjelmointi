
const nimet = ["Aaro", "Aino", "Asko", "Atte", "Attila", "Awini"];

// Tämän hetkisen syötteen perusteella näytettävät arvot
let hintList = [];

//muuttuja, mihin lasketaan nuolinäppämillä valittua indeksiä
let hintListIndex = -1;


function searchName(value) {
    return nimet.filter(name => name.startsWith(value));
}

const nameSearch = document.getElementById("nameSearch");
nameSearch.addEventListener("keyup", handleAutocomplete);

function handleAutocomplete(e) {
    // 40=Down,38=Up,13=Enter,27=Esc
    const keyCode = e.keyCode;
    if (keyCode == 27) {
        hintListIndex = -1;
        clearHints();
        return;
    }
    else if (keyCode == 40) {
        hintListIndex++;
    }
    else if (keyCode == 38) {
        hintListIndex--;
    }
    else if (keyCode == 13) {
        document.getElementById("nameSearch").value = hintList[hintListIndex];
        document.getElementById("resultsDiv").innerHTML = "";
        return;
    }
    hintList = searchName(e.currentTarget.value);
    updateHints(hintList);

}

function updateHints(array) {
    document.getElementById("resultsDiv").innerHTML = "";
    for (i = 0; i < array.length; i++) {
        //console.log(array[i]);
        let div = document.createElement("div");
        let text = document.createTextNode(array[i]);
        div.appendChild(text);
        document.getElementById("resultsDiv").appendChild(div);
        if (i == hintListIndex) {
            div.classList.add("active");
        }        
    }
}

function clearHints(){
    document.getElementById("resultsDiv").innerHTML = "";
    const text = document.getElementById("nameSearch");
    text.value = "";
}