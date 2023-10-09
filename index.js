const add_btn = document.querySelector(".add-new");
const list = document.querySelector("#list-element");
const input = document.querySelector(".writing-tasks");

const todo_list = [];

function  listTasks(title){
    const tasks_list = document.createElement("li");
    tasks_list.classList.add("tasks-list");
    
    const task_container= document.createElement('div');
    task_container.classList.add("d-flex");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    const task = document.createElement("p");
    // task.classList.add("task");
    task.innerText= title;

    const remove = document.createElement("div");
    remove.classList.add("remove-icon");

    task_container.append(checkbox, task);
    tasks_list.append(task_container, remove);

    list.append(tasks_list);
}

function clearInput(){
    input.value = '';
} 

function syncStorage(title){
    todo_list.push(title);
    const string_list = JSON.stringify(todo_list);
    localStorage.setItem('my_list', string_list);
}

add_btn.addEventListener("click", ()=> {
    const input_value = input.value;

    if (input_value !== '') {
        syncStorage(input_value);
        listTasks(input_value);

        clearInput();
    }
 
})

const previous_list = JSON.parse(localStorage.getItem('my_list'));
// todo_list = previous_list;

for ( let i=0; i < previous_list.length; i++){
    const title = previous_list[i];
    listTasks(title);
}

// remove tasks //
// const removeBtn = document.querySelector(".remove-icon");

// function remove() {
//     todo_list.splice();
// }

// removeBtn.addEventListener("click", ()=>{
//     remove();
// })


///// ---------------- Date ---------------- //////

function currentDate() {
    const month =  ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
    const current = new Date();
    const date = `${current.getDate()} ${month[current.getMonth()]}`;  
    return date;
}

const screen_date = document.querySelector(".date");
screen_date.innerText = currentDate();


// -------------- if task cheched ------------- ////

const checkBox = document.querySelector("input[type='checkbox']")
let checked = false; 

checkBox.addEventListener("click", ()=>{
    task = document.querySelector("p")
    console.log(task)
    
    if (!checked) {
        task.classList.toggle("checked-terms")
    }

})

