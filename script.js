const todoForm = document.querySelector('.inputForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.toDos');
const doneList = document.querySelector('.dones');

const saveList = 'savedList';
let savedList = [];

const saveFinishedList = 'savedFinList';
let savedFinList = [];

loadList();

// To get the input from the form by adding an
// event listener for submit button
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const input = this.inputText;
  const inputValue = input.value;
  // if empty, neglect it
  if (inputValue != '') {
    addTask(inputValue);
    saveTasks(inputValue);
  }
  //when submitted, reset the input form
  todoForm.reset();
});

function saveFinTasks(todo) {
  savedFinList.push(todo);
  localStorage.setItem(saveFinishedList, JSON.stringify(savedFinList));
}

function saveTasks(todo) {
  savedList.push(todo);
  localStorage.setItem(saveList, JSON.stringify(savedList));
}

function loadList() {
  const loadedList = localStorage.getItem(saveList);
  if (loadedList !== null) {
    const tempList = JSON.parse(loadedList);

    for (let i of tempList) {
      addTask(i);
      saveTasks(i);
    }
  }
  const loadedFinList = localStorage.getItem(saveFinishedList);
  if (loadedFinList !== null) {
    const tempList = JSON.parse(loadedFinList);

    for (let i of tempList) {
      addFinTask(i);
      saveFinTasks(i);
    }
  }
}

function addFinTask(task) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteBut = document.createElement('img');
  //creates a delete button on the right of the task
  deleteBut.src = './img/bin.png';
  deleteBut.style.cssText = 'width:1rem; height: 1rem; margin-right: 1rem;';
  deleteBut.setAttribute('align', 'right');
  //activates the deleteTask function when the img is clicked
  deleteBut.addEventListener('click', deleteTask);
  //add a event listener for click on the task
  //used to move it to the finished list
  span.innerHTML = task;
  span.addEventListener('click', finishTask);
  //append the task and the button into the li tag
  li.append(span);
  li.append(deleteBut);

  doneList.appendChild(li);
}

//To add the task gotten from the inputFrom in the todoList
function addTask(task) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteBut = document.createElement('img');
  //creates a delete button on the right of the task
  deleteBut.src = './img/bin.png';
  deleteBut.style.cssText = 'width:1rem; height: 1rem; margin-right: 1rem;';
  deleteBut.setAttribute('align', 'right');
  //activates the deleteTask function when the img is clicked
  deleteBut.addEventListener('click', deleteTask);
  //add a event listener for click on the task
  //used to move it to the finished list
  span.innerHTML = task;
  span.addEventListener('click', finishTask);
  //append the task and the button into the li tag
  li.append(span);
  li.append(deleteBut);
  //append the li into the todoList
  todoList.appendChild(li);
}
//Ran when the task has been clicked
//Moves the task to the finished list
function finishTask(e) {
  //finds which task has been clicked
  const button = e.target;
  const li = button.parentNode;
  //remove it from the todoList
  //and append it into the doneList
  doneList.append(todoList.removeChild(li));
  var index = li.children[0].innerHTML;
  saveFinTasks(index);
  var index = savedList.indexOf(li.children[0].innerHTML);
  if (index != -1) {
    savedList.splice(index, 1);
  }

  localStorage.setItem(saveList, JSON.stringify(savedList));
}
//Ran when the delete button of the task has been clicked
function deleteTask(e) {
  //finds which task must be deleted
  //also finds which list it's from
  const button = e.target;
  const li = button.parentNode;
  const whichList = li.parentNode;
  //removes the task from the list
  whichList.removeChild(li);

  var index = savedList.indexOf(li.children[0].innerHTML);
  if (index != -1) {
    savedList.splice(index, 1);
  }

  localStorage.setItem(saveList, JSON.stringify(savedList));

  var index = savedFinList.indexOf(li.children[0].innerHTML);
  if (index != -1) {
    savedFinList.splice(index, 1);
  }

  localStorage.setItem(saveFinishedList, JSON.stringify(savedFinList));
}
