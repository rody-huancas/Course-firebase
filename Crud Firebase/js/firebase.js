// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEKwtPSaTnXjHeVh7fKUQsZiZ8_J5Af54",
    authDomain: "crud-firebase-92f1d.firebaseapp.com",
    projectId: "crud-firebase-92f1d",
    storageBucket: "crud-firebase-92f1d.appspot.com",
    messagingSenderId: "788575703113",
    appId: "1:788575703113:web:03d4c6b05535e7bda96f98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore();

export const saveTask = (title, description) => {
    const error = document.querySelector("#form-error");
    if ([title, description].includes("")) {
        error.classList.remove("active");
        setTimeout(() => {
            error.classList.add("active");
        }, 4000);
        return;
    }
    addDoc(collection(db, "tasks"), { title, description })
};

export const getTasks = () => getDocs(collection(db, "tasks"));

export const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

export const deleteTasks = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = id => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) => {
    const { title, description } = newFields;
    const error = document.querySelector("#form-error");
    if ([title, description].includes("")) {
        error.classList.remove("active");
        setTimeout(() => {
            error.classList.add("active");
        }, 4000);
        return;
    }
    updateDoc(doc(db, "tasks", id), newFields)
};

const validate = (title, description) => {
    const error = document.querySelector("#form-error");
    if ([title, description].includes("")) {
        error.classList.remove("active");
        setTimeout(() => {
            error.classList.add("active");
        }, 4000);
        return;
    }
}