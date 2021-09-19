/* add todo*/
const todoInput=document.getElementById("todo-input");
const addTodoButton=document.getElementById("todo-button");
const doingTodoList=document.getElementById("doing");

function createListItem(todo){
    const li=document.createElement("li");
    const img=document.createElement("img");
    li.innerText=todo;
    img.src="./img/bin.png";
    li.appendChild(img);
    doingTodoList.appendChild(li);
}
function addTodo(e){
    e.preventDefault();
    createListItem(todoInput.value);
    todoInput.value="";
}
addTodoButton.addEventListener("click", addTodo);
/*doing->done*/

/*delete todo*/