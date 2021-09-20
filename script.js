const todoForm = document.querySelector('.inputForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.toDos');

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const input = this.inputText;
  const inputValue = input.value;
  if (inputValue != '') {
    addTask(inputValue);
  }
  todoForm.reset();
});

// deleteCurrent.addEventListener('click', deleteTask);

function addTask(task) {
  let li = document.createElement('li');

  li.innerHTML = `${task} <span class = "delete"><img src="./img/bin.png" style="width:1rem; height: 1rem; margin-right: 1rem;" align = "right"></span>`;
  todoList.appendChild(li);
}

// function deleteTask(task) {}
