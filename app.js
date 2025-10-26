import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const tasksRef = collection(db, "tasks");


const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
async function addTask() {
  if (inputBox.value === "") {
    Swal.fire({
      title: "You must write something!",
      icon: "error",
      draggable: true
    });
    return;
  }

  let taskText = inputBox.value;

  await addDoc(tasksRef, {
    text: taskText,
    completed: false
  });

  inputBox.value = "";
  getTasksFromDB(); 
}

import { updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

listContainer.addEventListener("click", async function (e) {
  let li = e.target.closest("li");
  if (!li) return;

  let id = li.dataset.id;
  let taskDoc = doc(db, "tasks", id);

  if (e.target.tagName === "LI") {
    let completed = li.classList.toggle("checked");
    await updateDoc(taskDoc, { completed: completed });
  }

  if (e.target.tagName === "SPAN") {
    await deleteDoc(taskDoc);
    li.remove();
  }
});



 async function getTasksFromDB() {
  listContainer.innerHTML = "";

  const querySnapshot = await getDocs(tasksRef);
  querySnapshot.forEach((docSnap) => {
    let data = docSnap.data();

    let li = document.createElement("li");
    li.innerHTML = data.text;
    li.dataset.id = docSnap.id;

    if (data.completed) {
      li.classList.add("checked");
    }

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);
  });
}

getTasksFromDB();
window.addTask = addTask;