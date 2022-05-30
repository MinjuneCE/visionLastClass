const toDoForm = document.querySelector(".js-form3"),
    toDoInput = toDoForm.querySelector(".js-toDoInfo"),
    toDoList = document.querySelector(".js-toDoList");

const USER_TODOLIST = "UserTL";
const listStyle = "listStyle";

let ARRAY_TODOS = [];

function deleteToDos(event) {
    const btn = event.target;
    const lis = btn.parentNode;
    toDoList.removeChild(lis);
    const cleanTDLS = ARRAY_TODOS.filter(function(toDo) {
        return toDo.id !== parseInt(lis.id);
    });
    ARRAY_TODOS = cleanTDLS;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(USER_TODOLIST, JSON.stringify(ARRAY_TODOS));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.className = "delbtn";
    const span = document.createElement("span");
    const newId = ARRAY_TODOS.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDos);
    span.innerHTML = text + "<input class='checkbox' type='checkbox'>";
    span.classList.add(listStyle);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    ARRAY_TODOS.push(toDoObj);
    saveToDos();
}

function handleTL(event) {
    event.preventDefault();
    const toDoValue = toDoInput.value;
    paintToDo(toDoValue);
    toDoInput.value = "";
}

function loadTL() {
    const loadedToDos = localStorage.getItem(USER_TODOLIST);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text)
        });
    }
}

function init() {
    loadTL();
    toDoForm.addEventListener("submit", handleTL);
}

init();