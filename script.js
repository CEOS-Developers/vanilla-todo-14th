var submit = document.getElementById('submit');
var toDoList = document.getElementById('toDoList');
var unDoneList = document.getElementById('unDoneList');

submit.addEventListener('click', clickButton);

function clickButton(){
  var temp = document.createElement('li');
  
  temp.innerHTML = toDoList.value;
  unDoneList.appendChild(temp);
}