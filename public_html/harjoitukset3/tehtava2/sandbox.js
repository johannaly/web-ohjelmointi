const pic1 = document.getElementById("pic1");
pic1.addEventListener("click", imageChange);
pic1.imgSrc = "lehma.jpg";

const pic2 = document.getElementById("pic2");
pic2.addEventListener("click", imageChange);
pic2.imgSrc = "maisema.jpg";

const pic3 = document.getElementById("pic3");
pic3.addEventListener("click", imageChange);
pic3.imgSrc = "talot.jpg";

function imageChange(e) {
    document.getElementById("image").src =`../tehtava2/images/${e.currentTarget.imgSrc}`;
    let pictures = document.getElementsByClassName("pic");
    for (let i = 0; i < pictures.length; i++) {
        pictures[i].classList.remove("act");
    }
    e.target.classList.add("act");
}


