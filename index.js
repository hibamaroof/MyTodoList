let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function deleteTask(icon) {
    const inputBox = icon.closest('.input-box');
    const taskT = inputBox.querySelector('p').textContent;
    inputBox.remove();
    // let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskT);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("total").innerHTML = "Total Tasks: " + tasks.length
}

function markDone(icon) {
    const inputBox = icon.closest('.input-box');
    const task = inputBox.querySelector('p');
    const fileIcon = inputBox.querySelector('.fa-file');

    task.classList.toggle('completed');

    if (task.classList.contains('completed')) {
        icon.classList.add('icon-completed');
        fileIcon.classList.add('icon-completed');
    } else {
        icon.classList.remove('icon-completed');
        fileIcon.classList.remove('icon-completed');
    }
}

function deleteAll() {
    if (confirm("Are you sure you want to delete?")) {
        const boxes = document.querySelectorAll('.input-box');

        if (boxes.length === 0) {
            alert("No tasks to delete");
            return;
        }
        else {
            boxes.forEach(box => box.remove());
            localStorage.setItem("tasks", JSON.stringify([]));
            tasks = []
            document.getElementById("total").textContent = "Total tasks: " + tasks.length;
        }
    } else {
        console.log("User canceled delete.");
    }

}

function editTask(icon) {
    const inputBox = icon.closest('.input-box');
    const para = inputBox.querySelector('p');

    const newText = prompt("Edit your task:", para.textContent);

    if (newText !== null && newText.trim() !== "") {
        const oldText = para.textContent;
        para.textContent = newText.trim();

        const index = tasks.indexOf(oldText);

        tasks[index] = newText.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));

    }
}


function saveToLocal(taskValue) {
    // const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
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

    const EditDiv = document.createElement('div');
    const EditIcon = document.createElement('i');
    EditIcon.classList.add('fa-solid', 'fa-pen-to-square', 'fa');
    EditIcon.addEventListener('click', () => editTask(EditIcon));
    EditDiv.appendChild(EditIcon);


    twin.appendChild(checkDiv);
    twin.appendChild(trashDiv);
    twin.appendChild(EditDiv)

    newDiv.appendChild(imgFlex);
    newDiv.appendChild(para);
    newDiv.appendChild(twin);

    // let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("total").textContent = "Total tasks: " + tasks.length;
}
function loadTasks() {
    // const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createDiv(task);
    });
}

document.getElementById("addBtn").addEventListener("click", (e) => {
    e.preventDefault();
    add_task();
});

document.getElementById("task").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        add_task();
    }
});

function add_task() {

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

}

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
    document.body.classList.toggle('darkBody')
})

window.onload = function () {
    loadTasks();
    add_task();
};
