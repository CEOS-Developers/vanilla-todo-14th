"use strict";
// form issue 해결
// submit이벤트가 발생하면 브라우저가refresh된다.
// e.preventDefault()를 통해서 브라우저의 refresh를 막고
// 새로운 변수 location에 input값 저장해서 textContent로 출력
const Form = document.querySelector("form");
const inputBox = document.querySelector("input");
const waitingList = document.querySelector("#waitingList");

Form.addEventListener("submit", (e) => {
  e.preventDefault();
  //const location = inputBox.value;
  //waitingList.textContent = location;
});

// 1) input창에 입력
let itemList = [];
let inputButton = document.querySelector("button");
inputButton.addEventListener("click", addItem);

function addItem() {
  let item = document.querySelector("#input").value;
  if (item != null) {
    itemList.push(item);
    document.querySelector("#input").value = "";
    document.querySelector("#input").focus();
  }
  showList();
}

// function save_item() {
//   localStorage.setItem("items", JSON.stringify(todoList));
// }

// 2) ul출력

function showList() {
  let list = "";
  for (let i = 0; i < itemList.length; i++) {
    list +=
      "<li>" +
      itemList[i] +
      "<button class='close' id=" +
      i +
      ">" +
      "<img src='img/bin.png'/>" +
      "</button></li>";
  }
  // list += "</ul>";
  document.getElementById("waitingList").innerHTML = list;
  console.log(list);
  console.log(itemList);

  let deleteButtons = document.querySelectorAll(".close");
  for (let i = 0; i, deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", deleteItem);
  }
}

function deleteItem() {
  let id = this.getAttribute("id");
  itemList.splice(id, 1);
  showList();
}

// 3) 대기중의 숫자 count
