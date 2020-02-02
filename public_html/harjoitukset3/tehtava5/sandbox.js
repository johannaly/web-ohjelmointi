const list = document.getElementById("list");
const add = document.getElementById("add");
const remove = document.getElementById("remove");

add.addEventListener("click", addToDo);
remove.addEventListener("click", removeToDo);
add.addEventListener("click", resetForm);

function resetForm() {
    document.getElementById("addToDo").reset();
}

function addToDo() {
    let node = document.createElement('li');
    node.addEventListener("click", removeOne);
    let input = document.getElementById("input").value;
    let text = document.createTextNode(input);
    node.appendChild(text);
    list.appendChild(node);
}

function removeToDo() {
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

function removeOne(e) {
    list.removeChild(e.currentTarget);
}