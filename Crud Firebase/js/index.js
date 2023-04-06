import {
    saveTask,
    getTasks,
    onGetTasks,
    deleteTasks,
    getTask,
    updateTask
} from "../js/firebase.js";


let editStatus = false;
let id = "";

const taskform = document.getElementById("task-form");
const taskcontainer = document.getElementById("tasks-container");

window.addEventListener("DOMContentLoaded", async () => {

    onGetTasks((querySnapshot) => {
        let html = '';

        querySnapshot.forEach(doc => {
            const task = doc.data();
            html += `
                <div class='form__card'>
                    <h3 class='form__title'>${task.title}</h3>
                    <p class='form__description'>${task.description}</p>
                    <div class='form__buttons-group'>
                        <button class='form__btn btn-delete' data-id='${doc.id}'>Eliminar</button>
                        <button class='form__btn btn-edit' data-id='${doc.id}'>Editar</button>
                    </div>
                </div>
            `;
        });

        taskcontainer.innerHTML = html;

        const btnDelete = taskcontainer.querySelectorAll(".btn-delete");
        btnDelete.forEach(btn => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                deleteTasks(dataset.id)
            })
        });

        const btnEdit = taskcontainer.querySelectorAll(".btn-edit");
        btnEdit.forEach((btn) => {
            btn.addEventListener("click", async ({ target: { dataset } }) => {
                const doc = await getTask(dataset.id);
                const task = doc.data();

                taskform["task-title"].value = task.title;
                taskform["task-description"].value = task.description;

                editStatus = true;
                id = doc.id;

                taskform["btn-task-save"].innerHTML = "Actualizar";
            });
        })
        taskform["btn-task-save"].innerHTML = "Guardar";
    });
});

taskform.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = taskform["task-title"];
    const description = taskform["task-description"];
    if (!editStatus) {
        saveTask(title.value, description.value);
    } else {
        updateTask(id, {
            title: title.value,
            description: description.value
        });
        editStatus = false;
    }

    taskform.reset();
});