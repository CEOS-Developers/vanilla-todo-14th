const inputToDo = document.querySelector('.inputToDo');
const buttonClick = document.querySelector('.inputButton');
const toDoList = document.querySelector('.toDoList');

const addToDo = (event) => {
  event.preventDefault(); //submit 시 새로고침 방지

  const newDiv = document.createElement('div');
  newDiv.classList.add('toDoDiv'); //1개의 todo를 감쌀 div태그

  const newSuccessButton = document.createElement('button');
  newSuccessButton.innerHTML = '✅';
  newSuccessButton.classList.add('successButton');
  newDiv.appendChild(newSuccessButton); //달성 버튼

  const newLi = document.createElement('li');
  newLi.innerText = inputToDo.value;
  newLi.classList.add('toDoLi');
  newDiv.appendChild(newLi);
  inputToDo.value = ''; //할 일이 들어갈 li태그

  const newDeleteButton = document.createElement('button');
  newDeleteButton.innerHTML = '❌';
  newDeleteButton.classList.add('deleteButton');
  newDiv.appendChild(newDeleteButton); //삭제 버튼

  toDoList.appendChild(newDiv);
};

const clickButtonInToDo = (event) => {
  const Item = event.target;
  if (Item.classList[0] === 'deleteButton') {
    Item.parentElement.remove(); //상위 element인 div 태그 삭제
  }
  if (Item.classList[0] === 'successButton') {
    Item.parentElement.classList.toggle('completed'); //달성 시 div 태그의 'completed' 토큰 추가
  }
};

//버튼 클릭 시 함수 실행 Event Listener
buttonClick.addEventListener('click', addToDo);
toDoList.addEventListener('click', clickButtonInToDo);
