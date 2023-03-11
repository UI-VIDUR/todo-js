let form = document.getElementById('form');
let title = document.getElementById('title');
let task = document.getElementById('task');
let errMsg = document.getElementById('error');
let addedTasks = document.getElementById('added-tasks');
let saveBtn = document.getElementById('save-btn');
var dataa = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('button is clicked');
    formValidation();
});


// validation handler
let formValidation = () => {
    if(title.value == ""){
        errMsg.innerHTML = "Title cannot be empty";
        errMsg.style.color = "red";
    }else if(task.value == ""){
        errMsg.innerHTML = "Task cannot be empty";
        errMsg.style.color = "red";
    }else{
        errMsg.innerHTML = "Congrats form submitted successfully!!";
        errMsg.style.color = "green";
        acceptData();
    }
}

// accept data
let data = {title: "", task: ""}

let acceptData = () => {
    dataa.push({title: title.value, task: task.value});
    // data.title = title.value;
    // data.task = task.value;
    createTask(dataa);
}

// create task
let createTask = (dataa) => {
    if(dataa.length > 0){
        addedTasks.innerHTML = "";
        dataa.map((data) => {
            addedTasks.innerHTML += `
                <div class="d-flex">
                    <h3 class="title">${data.title}</h3>
                    <p class="task">${data.task}</p>
                    <div class="button_wrapper">
                        <button class="primary" id="edit-btn" onClick="editPost(this)">EDIT</button>
                        <button class="secondary" id="delete-btn" onclick="delete">DELETE</button>
                    </div>
                </div>
            `;
        });
    }else{
        addedTasks.innerHTML += `<p>No Tasks Found</p>`;
    }
    console.log(dataa)
    title.value = "";
    task.value = "";
    setTimeout(() => {
        errMsg.innerHTML = "";
    }, 1000);
}

let editPost = (e) => {
    let selectedTask = e.parentElement.parentElement;
    let titleEl = document.getElementsByClassName('title');
    let button_wrapper = addedTasks.getElementsByClassName('button_wrapper')[0];

    title.value = selectedTask.children[0].innerHTML;
    task.value = selectedTask.children[1].innerHTML;
    titleEl[0].setAttribute("contentEditable", "true");
    if(!saveBtn){
        button_wrapper.innerHTML += `<button class="secondary" id="save-btn" onClick="edit()">SAVE</button>`;
    }

    // edit(dataa);
}

// createTask(dataa);

const edit = () => {
    dataa.push({title: title.value, task: task.value});
    console.log(dataa)
    // e.map((e) => {
        // console.log(dataa);
    // });
}