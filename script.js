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
    createTask();
}

// create task
let createTask = () => {
    // if(dataa.length > 0){
        addedTasks.innerHTML = "";
        dataa.map((data, index) => {
            return(
                addedTasks.innerHTML += `
                <div id=${index} class="d-flex">
                    <h3 class="title">${data.title}</h3>
                    <p class="task">${data.task}</p>
                    <div class="button_wrapper">
                        <button class="primary" id="edit-btn" onClick="edit(this)">EDIT</button>
                        <button class="secondary" id="delete-btn" onclick="deleteTask(this)">DELETE</button>
                    </div>
                </div>
            `
            );
        });
    // }else{
    //     addedTasks.innerHTML += `<p>No Tasks Found</p>`;
    // }
    title.value = "";
    task.value = "";
    setTimeout(() => {
        errMsg.innerHTML = "";
    }, 1000);
}

// edit task
const edit = (e) => {
    let selectedTask = e.parentElement.parentElement;
    title.value = selectedTask.children[0].innerText;
    task.value = selectedTask.children[1].innerText;
    e.innerText = "Update";
    e.setAttribute("onClick", "update(this)");
}

// update tasks
const update = (e) => {
    dataa.forEach((data) => {
        data[{title: title.value, task: task.value}]
        console.log(data)
        let selectedTask = e.parentElement.parentElement;
        console.log(selectedTask)
        selectedTask.children[0].innerHTML = data.title;
        selectedTask.children[1].innerHTML = data.task;
        title.value = ""
        task.value = ""
        e.innerText = "Edit";
        e.setAttribute("onClick", "edit(this)");
    });
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
  
    dataa.splice(e.parentElement.parentElement.id, 1);
  
    // localStorage.setItem("data", JSON.stringify(data));
  
    console.log(dataa);
};