/* add todo*/
const todoInput=document.getElementById("todo-input");
const addTodoButton=document.getElementById("todo-button");
const doingTodoList=document.getElementById("doing");
const doneTodoList=document.getElementById("done");
let todoArray=[];
const doingCount=document.getElementById("doing-count");
const doneCount=document.getElementById("done-count");

/*create todo li*/
function createTodoList(todoObj){
    const todoListItem=document.createElement("li");
    const deleteImg=document.createElement("img");
    todoListItem.innerText="🐈 "+todoObj.text;
    todoListItem.id=todoObj.id;
    todoListItem.addEventListener("click", toggleTodo);
    deleteImg.src="./img/bin.png";
    deleteImg.addEventListener("click", deleteTodo);
    todoListItem.appendChild(deleteImg);
    todoObj.type? doingTodoList.appendChild(todoListItem):doneTodoList.appendChild(todoListItem);
}

/*click add todo button*/
function onClickAddTodo(e){
    e.preventDefault();
    if (todoInput.value){
        const todoObj={
        "text":todoInput.value,
        "id":Date.now(),
        "type": true,
        }
        createTodoList(todoObj);
        todoArray.push(todoObj);
        saveTodo();
    }
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
    doingCount.innerText=todoArray.filter(todo=>todo.type===true).length;
    doneCount.innerText=todoArray.filter(todo=>todo.type===false).length;
}

//새로고침 했을 때 count 초기화 되는거 방지
window.onload = () => {
    const savedTodos=localStorage.getItem("todo");
    if (savedTodos){
        const parsedTodos=JSON.parse(savedTodos); //string을 array로 parse시켜줌
        todoArray=parsedTodos; //empty array가 아닌 이전 값을 모두 가지고 있는 array
        parsedTodos.forEach(todo=>createTodoList(todo));
    }
    saveTodo();
};
