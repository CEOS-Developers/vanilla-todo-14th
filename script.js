var submit = document.getElementById('submit');
var toDoList = document.getElementById('toDoList');
var unDoneList = document.getElementById('unDoneList');
var count = 0;

submit.addEventListener('click', clickButton);

/*add to unDoneList*/
function clickButton(){
  var temp = document.createElement('li');
  temp.setAttribute("class", "unDoneListItem");
  temp.setAttribute("id", "li"+count);
  temp.innerHTML = toDoList.value;
  temp.innerHTML += "<button style = 'float: right;' type='button' onclick='remove("+count+")'>삭제</button>";
  unDoneList.appendChild(temp);
  count++;
}


/* remove function */
function remove(count) {
    var li = document.getElementById('li'+count);
    unDoneList.removeChild(li);
  }