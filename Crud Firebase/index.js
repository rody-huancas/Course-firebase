import {
    saveTask,
    getTasks,
    onGetTasks
} from "./firebase.js";

const taskform = document.getElementById("task-form");
const taskcontainer = document.getElementById("tasks-container");

window.addEventListener("DOMContentLoaded", async () => {

    onGetTasks((querySnapshot) => {
        let html = '';

        querySnapshot.forEach(doc => {
            const task = doc.data();
            html += `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                </div>
            `;
        });

        taskcontainer.innerHTML = html;
    });
});

taskform.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = taskform["task-title"];
    const description = taskform["task-description"];

    saveTask(title.value, description.value);

    taskform.reset();
});