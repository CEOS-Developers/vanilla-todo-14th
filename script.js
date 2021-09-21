/* add todo*/
const todoInput=document.getElementById("todo-input");
const addTodoButton=document.getElementById("todo-button");
const doingTodoList=document.getElementById("doing");
const doneTodoList=document.getElementById("done");
let todoArray=[];

function createTodoList(todoObj){
    const li=document.createElement("li");
    const img=document.createElement("img");
    li.innerText=todoObj.text;
    li.id=todoObj.id;
    li.addEventListener("click", toggleTodo);
    img.src="./img/bin.png";
    img.addEventListener("click", deleteTodo);
    li.appendChild(img);
    todoObj.type? doingTodoList.appendChild(li):doneTodoList.appendChild(li);
    
}
function onClickAddTodo(e){
    e.preventDefault();
    const todoObj={
        "text":todoInput.value,
        "id":Date.now(),
        "type": true,
    }
    createTodoList(todoObj);
    todoArray.push(todoObj);
    saveTodo();
    todoInput.value="";
}
addTodoButton.addEventListener("click", onClickAddTodo);
/*doing->done, done->doing*/
function toggleTodo(e){
    todoArray.forEach(todo=>{
        if (todo.id===parseInt(e.target.id)){
            const li=e.target; 
            li.remove();
            //type을 반전
            todo.type=!todo.type;
            createTodoList(todo);
            saveTodo();
        }
    })
}
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
    localStorage.setItem("todo", JSON.stringify(todoArray));
}
const savedTodos=localStorage.getItem("todo");
if (savedTodos){
    const parsedTodos=JSON.parse(savedTodos); //string을 array로 parse시켜줌
    todoArray=parsedTodos; //empty array가 아닌 이전 값을 모두 가지고 있는 array
    parsedTodos.forEach(todo=>createTodoList(todo));
}