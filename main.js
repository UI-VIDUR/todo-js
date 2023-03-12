let form = document.querySelector('form');
let title = document.querySelector('#title');
let desc = document.querySelector('#task');
let add = document.querySelector('#submit-task');
let tasks = document.querySelector('#added-tasks');
let error = document.querySelector('#error');

let data = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

const formValidation = () => {
    if(title.value == ""){
        error.innerText = "Title cannot be empty";
        error.style.color = "red";
    }
    else if(task.value == ""){
        error.innerText = "Description cannot be empty";
        error.style.color = "red";
    }else{
        error.innerText = "Successfully added the tasks";
        error.style.color = "green";
        addTask();
    }
}

const addTask = () => {
    data.push({title: title.value, description: desc.value});
    // console.log(data)
    appendHtml();
}

const appendHtml = () => {
    data.map((value, index) => {
        console.log(value, index);
    });
    title.value = "";
    desc.value = "";
}