const form = document.querySelector(".js-form"),
    form2 = document.querySelector(".js-form2"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    deleter = form.querySelector(".js-deleteName");

const USER_LS = "selectUser",
    SHOWING_CN = "showing";


function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    greetingUser(currentValue);
    saveName(currentValue);
    deleteForName();
}

function deleteLS() {
    localStorage.removeItem(USER_LS);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function deleteForName() {
    form2.classList.add(SHOWING_CN);
    form2.addEventListener("submit", deleteLS);
}

function greetingUser(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `HELLO! ${text}`;
}

function loadName() {
    const selectUser = localStorage.getItem(USER_LS);
    if (selectUser === null) {
        askForName();
    }
    else {
        greetingUser(selectUser);
        deleteForName();
    }
}

function init() {
    loadName();
}

init();