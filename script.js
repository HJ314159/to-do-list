let userInput = document.getElementById("user-input");
let submitBtn = document.getElementById("submit-btn");
let tasks = document.getElementById("tasks");
let toDoList = [];

document.addEventListener("DOMContentLoaded", function () {
    loadTasksFromLocalStorage();
    submitBtn.addEventListener("click", add);
});

userInput.addEventListener("input", function () {
    const maxLength = 110;
    const currentValue = userInput.value;

    if (currentValue.length > maxLength) {
        userInput.value = currentValue.slice(0, maxLength);
    }
});

function add() {
    let task = userInput.value;

    if (task.trim() !== "") {
        let listItem = document.createElement("div");
        listItem.classList.add("taskItem");
        listItem.textContent = task;

        let finishButton = document.createElement("button");
        finishButton.textContent = "Done";
        finishButton.classList.add("finish-button");
        listItem.appendChild(finishButton);

        tasks.appendChild(listItem);

        toDoList.push(task);

        saveTasksToLocalStorage();

        finishButton.addEventListener("click", function () {
            finishedTask(listItem);
        });

        userInput.value = "";
    }
}

function finishedTask(listItem) {
    const index = Array.from(tasks.children).indexOf(listItem);
    tasks.removeChild(listItem);

    if (index !== -1) {
        toDoList.splice(index, 1);
    }

    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage(){
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function loadTasksFromLocalStorage(){
    const storedTasks = localStorage.getItem("toDoList");
    if (storedTasks) {
        toDoList = JSON.parse(storedTasks);
        toDoList.forEach(function (task){
            let listItem = document.createElement("div");
            listItem.classList.add("taskItem");
            listItem.textContent = task;

            let finishButton = document.createElement("button");
            finishButton.textContent = "Done";
            finishButton.classList.add("finish-button");
            listItem.appendChild(finishButton);

            tasks.appendChild(listItem);

            finishButton.addEventListener("click", function(){
                finishedTask(listItem);
            });
        });
    }
}