
// Tämän hetkisen syötteen perusteella näytettävät arvot
let hintList = [];

//muuttuja, mihin lasketaan nuolinäppämillä valittua indeksiä
let hintListIndex = -1;


const searchName = (currentValue) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200){
            hintList = request.responseText.split("\t");
            updateHints(hintList);
        } 
    });
    request.open("GET", "https://student.labranet.jamk.fi/~M6753/ajax-suggest.php?q=" + currentValue);
    request.send();
};

    
const nameSearch = document.getElementById("q");
nameSearch.addEventListener("keyup", handleAutocomplete);

function handleAutocomplete(e) {
    // 40=Down,38=Up,13=Enter,27=Esc
    const keyCode = e.keyCode;
    if (keyCode == 27) {
        hintListIndex = -1;
        clearHints();
    }
    else if (keyCode == 40) {
        hintListIndex++;
        updateHints(hintList);
    }
    else if (keyCode == 38) {
        hintListIndex--;
        updateHints(hintList);
    }
    else if (keyCode == 13) {
        document.getElementById("q").value = hintList[hintListIndex];
        document.getElementById("resultsDiv").innerHTML = "";
    }
    else {
        searchName(e.currentTarget.value);
    }
}

function updateHints(array) {
    document.getElementById("resultsDiv").innerHTML = "";
    for (i = 0; i < array.length; i++) {
        //console.log(array[i]);
        let div = document.createElement("div");
        let text = document.createTextNode(array[i]);
        div.appendChild(text);
        document.getElementById("resultsDiv").appendChild(div);
        div.addEventListener("mouseover", (e) => e.currentTarget.classList.add("active"));
        div.addEventListener("mouseout", (e) => e.currentTarget.classList.remove("active"));
        div.addEventListener("click", (e) => { 
            let q = document.getElementById("q");
            q.value = e.currentTarget.innerText;
            document.getElementById("form").submit(); 
        });
        if (i == hintListIndex) {
            div.classList.add("active");
        }        
    }
}


function clearHints(){
    document.getElementById("resultsDiv").innerHTML = "";
    const text = document.getElementById("q");
    text.value = "";
}

