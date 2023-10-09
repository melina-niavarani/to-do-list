const add_btn = document.querySelector(".add-new");
const list = document.querySelector("#list-element");

const todo_list = []

function  listTasks(title){
    const tasks_list = document.createElement("li")
    tasks_list.classList.add("tasks-list")
    console.log(tasks_list)
    
    const task_container= document.createElement('div')
    task_container.classList.add("d-flex")

    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox");

    const task = document.createElement("p")
    task.innerText= title;

    const remove = document.createElement("div")
    remove.classList.add("remove-icon")

    task_container.append(checkbox, task);
    tasks_list.append(task_container, remove);

    list.append(tasks_list)
}

function clearInput(){
    input.value = ''
} 

function syncStorage(title){
    todo_list.push(title)
    const string_list = JSON.stringify(todo_list)
    localStorage.setItem('my_list', string_list)
}

const input = document.querySelector(".writing-tasks")

add_btn.addEventListener("click", ()=> {

    const input_value = input.value;

    if (input_value !== '') {
        syncStorage(input_value)
        listTasks(input_value)

        clearInput()
    }
 
})

const previous_list = JSON.parse(localStorage.getItem('my_list'))
todo_list = previous_list

for ( let i=0; i < previous_list.length; i++){
    const title = previous_list[i]
    listTasks(title)
}

// remove tasks //
const removeBtn = document.querySelector(".remove-icon")

removeBtn.addEventListener("click", ()=>{
    
})