const add_btn = document.querySelector(".add-new");
const list = document.querySelector("#list-element");
const input = document.querySelector(".writing-tasks");

let todo_list = [ ];
let nextTodoIdndex= 1;

function  listTasks(title){
    const tasks_list = document.createElement("li");
    tasks_list.classList.add("tasks-list");
    
    const task_container= document.createElement('div');
    task_container.classList.add("d-flex");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    const task = document.createElement("p");
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

let index = 0
function addIndex() {
    index = nextTodoIdndex++
}

add_btn.addEventListener("click", ()=> {
    const input_value = input.value;

    if (input_value !== '') {
        syncStorage(input_value);
        listTasks(input_value);
        addIndex();
        clearInput();
        console.log(index)
    }
 
})

// =======Store Tasks========== //

// const previous_list = JSON.parse(localStorage.getItem('my_list'));
// todo_list = previous_list;

// for ( let i=0; i < previous_list.length; i++){
//     const title = previous_list[i];
//     listTasks(title);
// }


// ========== remove tasks =============//

const removeBtn =document.querySelector(".remove-icon");

removeBtn.addEventListener("click", ()=>{
    console.log("remove")
    todo_list.splice(index, 1);
    nextTodoIdndex= nextTodoIdndex-1
})

// for (let i = 0; i < removeBtn.length ; i++) {
//     removeBtn[i].addEventListener("click", ()=>{
//         todo_list.splice(index, 1);
//         nextTodoIdndex= nextTodoIdndex-1
//     })
    
// }



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

const checkBox = document.querySelectorAll("input[type='checkbox']");
let checked = false; 

for (let i = 0; i < checkBox.length; i++) {
    checkBox[i].addEventListener ("click" , ()=>{
        console.log(i)
        if (!checked){
            const task = document.querySelectorAll('p');
            for (let j = 0; j < checkBox.length; j++) {
                task[j].classList.toggle("checked-terms");
                console.log(task[j])
            }
        }
    })
}







