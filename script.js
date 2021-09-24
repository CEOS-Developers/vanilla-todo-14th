var submit = document.getElementById('submit');
var toDoList = document.getElementById('toDoList');
var unDoneList = document.getElementById('unDoneList');
var doneList = document.getElementById('doneList');
var countItem = document.getElementById('countItem');
var count = 0;

/* submit click button */
submit.addEventListener('click', clickButton);


/*add to unDoneList*/
function clickButton(){
  var temp = document.createElement('li');
  temp.setAttribute("id", "li"+count);
  temp.innerHTML = toDoList.value;
  temp.innerHTML += "<button style = 'float: right;' type='button' onclick='remove("+count+")'>삭제</button>";
  unDoneList.appendChild(temp);
  count++;
  /* count number of unDoneList */
  document.getElementById("countItem").innerHTML = count;
}

/* remove function */
function remove(count) {
    var li = document.getElementById('li'+count);
    unDoneList.removeChild(li);
    document.getElementById("countItem").innerHTML = count;
  }
