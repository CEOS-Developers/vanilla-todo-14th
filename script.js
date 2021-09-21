const todoForm = document.querySelector('.inputForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.toDos');
const doneList = document.querySelector('.dones');
// To get the input from the form by adding an
// event listener for submit button
todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const input = this.inputText;
  const inputValue = input.value;
  // if empty, neglect it
  if (inputValue != '') {
    addTask(input);
  }
  //when submitted, reset the input form
  todoForm.reset();
});
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
  span.innerHTML = task.value;
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
}
