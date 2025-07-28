function deleteTask(icon) {
    const inputBox = icon.closest('.input-box');
    const taskT = inputBox.querySelector('p').textContent;
    inputBox.remove();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskT);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("total").innerHTML = "Total Tasks: " + tasks.length
}

function markDone(icon) {
    const inputBox = icon.closest('.input-box');

    const task = inputBox.querySelector('p');
    task.classList.toggle('completed');


    if (icon.style.color === 'green') {
        icon.style.color = 'rgb(202, 200, 200)';
    } else {
        icon.style.color = 'green';
    }
    const fileIcon = inputBox.querySelector('.fa-file');
    if (fileIcon.style.color === 'green') {
        fileIcon.style.color = 'rgb(202, 200, 200)';
    } else {
        fileIcon.style.color = 'green';
    }
}
function deleteAll() {

    if (confirm("Are you sure you want to delete?")) {
        const boxes = document.querySelectorAll('.input-box');
        boxes.forEach(box => box.remove());

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        localStorage.clear()
        tasks = []
        document.getElementById("total").textContent = "Total tasks: " + tasks.length;
    } else {
        txt = "You pressed Cancel!";
    }
    const boxes = document.querySelectorAll('.input-box');
    boxes.forEach(box => box.remove());
}
function saveToLocal(taskValue) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskValue)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
function createDiv(value) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("input-box");
    const midCon = document.getElementsByClassName("mid")[0];
    midCon.append(newDiv);

    const imgFlex = document.createElement('div');
    imgFlex.classList.add('img-flex');
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-file', 'fa');
    imgFlex.appendChild(icon);

    const para = document.createElement('p');
    para.textContent = value;

    const twin = document.createElement('div');
    twin.classList.add('twin');

    const checkDiv = document.createElement('div');
    const checkIcon = document.createElement('i');
    checkIcon.classList.add('fa-solid', 'fa-circle-check', 'fa');
    checkIcon.addEventListener('click', () => markDone(checkIcon));
    checkDiv.appendChild(checkIcon);

    const trashDiv = document.createElement('div');
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-solid', 'fa-trash', 'fa');
    trashIcon.addEventListener('click', () => deleteTask(trashIcon));
    trashDiv.appendChild(trashIcon);

    twin.appendChild(checkDiv);
    twin.appendChild(trashDiv);

    newDiv.appendChild(imgFlex);
    newDiv.appendChild(para);
    newDiv.appendChild(twin);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("total").textContent = "Total tasks: " + tasks.length;
}
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createDiv(task);
    });
}
function add_task() {
    document.getElementById("addBtn").addEventListener("click", (e) => {
        e.preventDefault();

        const taskInput = document.getElementById("task");
        const taskValue = taskInput.value.trim();

        if (!taskValue) {
            taskInput.setCustomValidity("Please enter a task.");
            taskInput.reportValidity();
            return;
        } else {
            taskInput.setCustomValidity("");

        }

        saveToLocal(taskValue);
        createDiv(taskValue);



        taskInput.value = "";

    });



}



window.onload = function () {
    loadTasks();
    add_task();
};
