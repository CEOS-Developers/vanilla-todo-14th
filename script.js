const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");
const finishedList = document.querySelector(".finishedList");
const lenTodo = document.getElementById("todo-count");
const lenFin = document.getElementById("fin-count");

let toDoArr = [];
let finArr = [];

function setLength(){
    lenTodo.innerText = toDoArr.length
    lenFin.innerText = finArr.length
}

function deleteData(arr,target){
    // filter target from arr
    // target.id가 string으로 가져와짐 - 그래서 처음에 값을 비교를 못했음
    const result = arr.filter(element => element.id!==parseInt(target.id))
    return result
}

function deleteHandler(event){
    // event.target의 class를 보고 todo 인지 finished인지 판별 가능
    const target = event.target.parentNode.parentNode
    if(target.className === "todo"){
        // delete from todoArr
        toDoArr = deleteData(toDoArr,target)
        // remove from parent
        toDoList.removeChild(target);
    }else{
        // delete from finArr
        finArr = deleteData(finArr,target)
        finishedList.removeChild(target);
    }
    setLength()
}

function moveData(event){
    const target = event.target.parentNode
    if(target.className === "todo"){
        //move to bottom
        target.classList.remove("todo");
        target.classList.add("fin");
        finArr = [...finArr,{id:parseInt(target.id),text:target.firstChild.innerHTML}]
        toDoArr = deleteData(toDoArr,target)

        finishedList.appendChild(target)
    }else{
        //move to top
        target.classList.remove("fin");
        target.classList.add("todo");
        toDoArr= [...toDoArr,{id:parseInt(target.id),text:target.firstChild.innerHTML}]
        finArr = deleteData(finArr,target)

        toDoList.appendChild(target)
    }
    setLength()
}

function printData(text) {
    // 새로운 toDo 리스트 생성 함수
    const toDo = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const toDoContent = document.createElement("span");
    const newId = toDoArr.length + 1;
  
    toDo.classList.add("todo");
    toDoContent.classList.add("text");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = "<img src=\"img/bin.png\" width=\"20px\" height=\"20px\">";

    deleteBtn.addEventListener("click", deleteHandler);

    toDoContent.innerText = text; // submit에서 온 값
    toDoContent.addEventListener("click", moveData)
  
    toDo.appendChild(toDoContent);
    toDo.appendChild(deleteBtn);
  
    toDo.id = newId;
    toDoList.appendChild(toDo);
  
    const toDoObj = {
      id: newId,
      text: text,
    };
    toDoArr.push(toDoObj);
    setLength()   
}

function addToDo(event) {
    // 입력받아 추가하는 함수
    event.preventDefault();
    printData(toDoInput.value);
    toDoInput.value = "";
}

function init() {
    toDoForm.addEventListener("submit", addToDo);
}

init();