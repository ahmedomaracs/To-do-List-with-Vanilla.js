const taskList = document.getElementById("task-list");
const addedTask = document.getElementById("task-input");
const button = document.getElementById("add-btn");

button.addEventListener("click", () => {

    const taskText = addedTask.value.trim();
    if (!taskText) return alert("Please enter a task");

    const newtask = document.createElement("li");
    newtask.textContent = taskText;
    
    newtask.addEventListener("click",()=>{
        newtask.classList.toggle("completed");
    });


    const deletBtn=document.createElement("button");
    deletBtn.textContent="Delete";

    deletBtn.addEventListener("click",(e)=>{
        e.stopPropagation();
        newtask.remove();
    });

    newtask.appendChild(deletBtn);
    taskList.appendChild(newtask);


    addedTask.value="";


});