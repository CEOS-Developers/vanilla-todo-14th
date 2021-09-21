/* add todo*/
const todoInput=document.getElementById("todo-input");
const addTodoButton=document.getElementById("todo-button");
const doingTodoList=document.getElementById("doing");
let todoArray=[];

function createTodoList(todoObj){
    const li=document.createElement("li");
    const img=document.createElement("img");
    li.innerText=todoObj.text;
    li.id=todoObj.id;
    img.src="./img/bin.png";
    img.addEventListener("click", deleteTodo);
    li.appendChild(img);
    doingTodoList.appendChild(li);
}
function onClickAddTodo(e){
    e.preventDefault();
    const todoObj={
        "text":todoInput.value,
        "id":Date.now(),
        "type": 1,
    }
    createTodoList(todoObj);
    todoArray.push(todoObj);
    saveTodo();
    todoInput.value="";
}
addTodoButton.addEventListener("click", onClickAddTodo);
/*doing->done*/

/*delete todo*/
function deleteTodo(e){
    console.log(e);
    const li=e.target.parentElement; 
    li.remove();
    todoArray=todoArray.filter(todo=>todo.id!=parseInt(li.id));
    saveTodo();
}

/*save todo*/
function saveTodo(){
    localStorage.setItem("todo", JSON.stringify(todoArray))
}
const savedTodos=localStorage.getItem("todo");
if (savedTodos){
    const parsedTodos=JSON.parse(savedTodos); //string을 array로 parse시켜줌
    todoArray=parsedTodos; //empty array가 아닌 이전 값을 모두 가지고 있는 array
    parsedTodos.forEach(todo=>createTodoList(todo));
}