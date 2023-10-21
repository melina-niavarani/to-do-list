const add_btn = document.querySelector(".add-new");
const list = document.querySelector("#list-element");
const input = document.querySelector(".writing-tasks");
const deleteAll = document.querySelector("#delete-all");

const STORAGE_KEY = "my_list"

let todo_list = [];

// ======= Work with DOM ======== //

function renderTasks(item) {
    const tasks_list = document.createElement("li");
    tasks_list.classList.add("tasks-list");
    
    const task_container= document.createElement('div');
    task_container.classList.add("d-flex");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    // if (item.status) {
    //     checkbox.setAttribute("checked", "true")
    // }
    checkbox.checked = item.status

    checkbox.addEventListener("click", ()=>{
        toggleStatus(item.title)
    })

    const task = document.createElement("p");
    task.innerText= item.title;

    const remove = document.createElement("span");
    remove.classList.add("remove-icon");

    remove.addEventListener("click", ()=>{
        removeTask(item.title)
    })

    task_container.append(checkbox, task);
    tasks_list.append(task_container, remove);

    list.append(tasks_list);
}

function renderList(){
    // Remove old items:
    list.innerHTML = "";

    // Render items :
    /* Model 1:
     for ( let i=0; i < todo_list.length; i++){
        const title = todo_list[i];
        renderTasks(title);
    } */

    //  Model 2:
    todo_list.forEach((item) => {
        renderTasks(item);
    })

}

function clearInput(){
    input.value = '';
} 


// =======Load tasks from storage========== //

function syncStorage(){
    const string_list = JSON.stringify(todo_list);
    localStorage.setItem(STORAGE_KEY, string_list);
}

function loadFromStorage(){
    let listFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    todo_list = listFromStorage;
}
 
//  ======= Functionality ======== //

function toggleStatus(title) {
    // Medel 1:  
    // for (let i = 0; i < todo_list.lenght; i++) {
    //     const list_item = todo_list[i];

    //     if (list_item.title === title){
    //        todo_list.status = !todo_list.status
    //     }
        
    // }

    todo_list.forEach((item)=>{
        if(item.title === title){
            item.status = !item.status
        }
    })

    syncStorage();
}
 
function addItem(item) {
    const next_item = {
        title: item.title,
        status: item.status,
    }
    todo_list.push(next_item);
}

// ========== remove tasks ============= //

function removeTask(title) {
    //MODEL 1: for (let i = 0; i < todo_list.length ; i++) {
    //     const list_item = todo_list[i];

    //     if (list_item.title === title){
    //         todo_list.splice(i, 1);
    //     }
    // }
    todo_list.forEach((item, i)=>{
        if (item.title === title) {
            todo_list.splice(i, 1);
        }
    })
    syncStorage();
    renderList();
}

function onDeleteAll(){ 
    todo_list = todo_list.filter((item) => {
        // return item.status === true ? false : true ;
        // or:
        return !item.status;
    })

    syncStorage();
    renderList();
}

// ========= Filtering Tasks ======== ////
const selectElement = document.querySelector(".select");
selectElement.addEventListener("change", filterTasksByStatus)

list.innerHTML = "";

function filterTasksByStatus() {
    const selectedStatus = selectElement.value
    list.innerHTML = ""; 
    if (selectedStatus === "All") {
        renderList();
    } else {
        const filterTasks = todo_list.filter((item) => {
            if (selectedStatus === "Done" && item.status === true) {
                return true;
            } else if (selectedStatus === "Todo" && item.status === false) {
                return true;
            }
            return false;
        });
        filterTasks.forEach((item) => {
            renderTasks(item);
        })
    }
}

//  ======= Run the App ======= //
function onAddItem() {
    const input_value = input.value;
    // if(input_value === ''){
    //     alert("You Should Write a title!")
    //     return;
    // }else {
    //     const item = {
    //         title: input_value,
    //         status: false,
    //     }
    //     addItem(item);
    //     syncStorage();
    //     renderTasks(item);
    //     clearInput();
    // }
    // Model2:
    if (input_value !== '') {
        const item = {
            title: input_value,
            status: false,
        }
        addItem(item);
        syncStorage();
        renderTasks(item);
        clearInput();
    }
}

function events() {
    add_btn.addEventListener("click", onAddItem)
    deleteAll.addEventListener("click", onDeleteAll)
}

function init() {
    loadFromStorage();
    renderList();
    events();
    selectElement.value = "All"; 
    filterTasksByStatus();
}



///// ---------------- App Date ---------------- //////

function currentDate() {
    const month =  ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
    const current = new Date();
    const date = `${current.getDate()} ${month[current.getMonth()]}`;  
    return date;
}

const screen_date = document.querySelector(".date");
screen_date.innerText = currentDate();


// -------------- if task cheched ------------- ////

// const checkBox = document.querySelectorAll("input[type='checkbox']");
// let checked = false; 

// for (let i = 0; i < checkBox.length; i++) {
//     checkBox[i].addEventListener ("click" , ()=>{
//         console.log(i)
//         if (!checked){
//             const task = document.querySelectorAll('p');
//             for (let j = 0; j < checkBox.length; j++) {
//                 task[j].classList.toggle("checked-terms");
//                 console.log(task[j])
//             }
//         }
//     })
// }


// =========== init ==============  //

init()






