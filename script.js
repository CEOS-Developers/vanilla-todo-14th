const todoForm = document.querySelector('.inputForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.toDos');
const doneList = document.querySelector('.dones');

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const input = this.inputText;
  const inputValue = input.value;
  if (inputValue != '') {
    addTask(input);
  }
  todoForm.reset();
});

function addTask(task) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteBut = document.createElement('img');

  deleteBut.src = './img/bin.png';
  deleteBut.style.cssText = 'width:1rem; height: 1rem; margin-right: 1rem;';
  deleteBut.setAttribute('align', 'right');
  deleteBut.addEventListener('click', deleteTask);

  span.innerHTML = task.value;
  span.addEventListener('click', finishTask);

  li.append(span);
  li.append(deleteBut);

  todoList.appendChild(li);
}

function finishTask(e) {
  const button = e.target;
  const li = button.parentNode;
  doneList.append(todoList.removeChild(li));
}

function deleteTask(e) {
  const button = e.target;
  const li = button.parentNode;
  todoList.removeChild(li);
  doneList.removeChild(li);
}
