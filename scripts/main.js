let form = document.querySelector('form');
let title = document.querySelector('#title');
let desc = document.querySelector('#task');
let add = document.querySelector('#submit-task');
let tasks = document.querySelector('#added-tasks');
let success = document.querySelector('#success');
let tasksNumber = document.querySelector('.tasks_number b');
let loader = document.querySelector('.loader');

let data = [];

title.focus();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

const onChangeValidation = () => {
    if(!title.value == ""){
        title.classList.remove('error');
    }
    if(!desc.value == ""){
        desc.classList.remove('error');
    }
}

const formValidation = () => {
    if(title.value == ""){
        title.classList.add('error');
        title.focus();
    }
    else if(desc.value == ""){
        desc.classList.add('error');
        desc.focus();
    }else{
        title.classList.remove('error');
        desc.classList.remove('error');
        success.innerText = "Task added successfully!!";
        success.style.color = "green";
        addTask();
    }
}

const taskNum = () => {
    let count = data.length;
    console.log(count);
    tasksNumber.innerText = count;
}

const addTask = () => {
    data.push({title: title.value, description: desc.value});

    loader.style.display = 'flex';
    setTimeout(() => {
        appendHtml();
        taskNum();
        loader.style.display = 'none';
    }, 300);
}

const appendHtml = () => {
    tasks.innerHTML = "";
    data.map((value, index) => {
        tasks.innerHTML += `
            <div id=${index} class="d-flex flex-column task_card">
                <h3 class="title">${value.title}</h3>
                <p class="task">${value.description}</p>
                <div class="button_wrapper">
                    <button class="primary" id="edit-btn" onclick="edit(this, ${index})">EDIT</button>
                    <button class="secondary" id="delete-btn" onclick="deleteTask(this, ${index})">DELETE</button>
                </div>
            </div>
        `;
    });
    if(!tasks.innerHTML == ""){
        tasks.parentElement.classList.add('tasks_added');
    }else{
        tasks.parentElement.classList.remove('tasks_added');
    }
    title.value = "";
    desc.value = "";
    title.focus();
    setTimeout(() => {
        success.innerHTML = "";
    }, 1000);
}

const edit = (e, index) => {
    selectedEl = e.parentElement.parentElement;
    title.value = selectedEl.children[0].innerText;
    desc.value = selectedEl.children[1].innerText
    e.innerText = "update";
    e.setAttribute("onClick", `update(this, ${index})`);
    add.setAttribute("disabled", true);
    console.log(data);
}

const update = (e, index) => {
    if(data.length > 0){
        data[index] = {title: title.value, description: desc.value};
    }
    console.log(data)
    loader.style.display = 'flex';
    setTimeout(() => {
        data.forEach((update) => {
            selectedEl = e.parentElement.parentElement;
            selectedEl.children[0].innerText = update.title;
            selectedEl.children[1].innerText = update.description;
            title.value = "";
            desc.value = "";
            title.focus();
            e.innerText = "edit";
            e.setAttribute("onClick", `edit(this, ${index})`);
        });
    
        appendHtml();
        add.removeAttribute("disabled");
        loader.style.display = 'none';
    }, 300);
}

const deleteTask = (e, index) => {
    console.log(tasks.children[index]); 
    loader.style.display = 'flex';
    setTimeout(() => {
        tasks.children[index].remove();
        if(data.length > 0){
            data.splice(index, 1);
            console.log(data)
            appendHtml();
            taskNum();
            loader.style.display = 'none';
        }
    }, 300);
}