const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");
const finishedList = document.querySelector(".finishedList");
const lenTodo = document.getElementById("todo-count");
const lenFin = document.getElementById("fin-count");

const TODODATA = "todoData"
const FINDATA = "FinData"

let toDoArr = [];
let finArr = [];

function loadDATA(){
    const loadedTODO = localStorage.getItem(TODODATA);
    const loadedFIN = localStorage.getItem(FINDATA);
    
    if (loadedTODO !== null) {
        const parsedTODO = JSON.parse(loadedTODO); // parse, 가져온 것을 자바스크립트 object로 변환시켜줌
        parsedTODO.forEach(function(input) {
            printData(input.text,parseInt(input.id),true)
        });
    }
    if (loadedFIN !== null) {
        const parsedFIN = JSON.parse(loadedFIN); // parse, 가져온 것을 자바스크립트 object로 변환시켜줌
        parsedFIN.forEach(function(input) {
            printData(input.text,parseInt(input.id),false)
        });
    }
}

function saveDATA(){
    localStorage.setItem(TODODATA, JSON.stringify(toDoArr));
    localStorage.setItem(FINDATA, JSON.stringify(finArr));
}

function setLength(){
    lenTodo.innerText = toDoArr.length
    lenFin.innerText = finArr.length
}

function deleteData(arr,target){
    // filter target from arr
    // target.id가 string으로 가져와짐 - 그래서 처음에 값을 비교를 못했음
    const result = arr.filter(element => element.id!==target.id)
    return result
}

function deleteHandler(event){
    // event.target의 class를 보고 todo 인지 finished인지 판별 가능
    const target = event.target.parentNode.parentNode
    if(target.className === "todo"){
        // delete from todoArr
        toDoArr = toDoArr.filter(element => element.id !== target.id)
        // remove from parent
        toDoList.removeChild(target);
    }else{
        // delete from finArr
        finArr = finArr.filter(element => element.id !== target.id)
        finishedList.removeChild(target);
    }
    setLength();
    console.log(toDoArr);
    console.log(finArr);
    saveDATA();
}

function moveData(event){
    const target = event.target.parentNode
    if(target.className === "todo"){
        //move to bottom
        target.classList.remove("todo");
        target.classList.add("fin");
        finArr = [...finArr,{id:target.id,text:target.firstChild.innerHTML}]
        toDoArr = deleteData(toDoArr,target)

        finishedList.appendChild(target)
    }else{
        //move to top
        target.classList.remove("fin");
        target.classList.add("todo");
        toDoArr= [...toDoArr,{id:target.id,text:target.firstChild.innerHTML}]
        finArr = deleteData(finArr,target)

        toDoList.appendChild(target)
    }
    setLength();
    saveDATA();
}

function printData(text,id,field) {
    // 새로운 toDo 리스트 생성 함수
    const toDo = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const toDoContent = document.createElement("span");

    //field에 따라 분기
    if(field === true){
        toDo.classList.add("todo");
    }else{
        toDo.classList.add("fin");
    }
    toDoContent.classList.add("text");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = "<img src=\"img/bin.png\" width=\"20px\" height=\"20px\">";

    deleteBtn.addEventListener("click", deleteHandler);

    toDoContent.innerText = text; // submit에서 온 값
    toDoContent.addEventListener("click", moveData)
  
    toDo.appendChild(toDoContent);
    toDo.appendChild(deleteBtn);

    if(id===0){
        toDo.id = toDoArr.length + 1;
    }else{
        toDo.id = id
    }
    const toDoObj = {
        id: toDo.id,
        text: text,
    };

    if(field === true){
        toDoList.appendChild(toDo);
        toDoArr.push(toDoObj);
    }else{
        finishedList.appendChild(toDo);
        finArr.push(toDoObj);
    }

    setLength();
    saveDATA(); 
}

function addToDo(event) {
    // 입력받아 추가하는 함수
    event.preventDefault();
    printData(toDoInput.value,0,true);
    toDoInput.value = "";
}

function init() {
    loadDATA();
    toDoForm.addEventListener("submit", addToDo);
    setLength();
}

init();