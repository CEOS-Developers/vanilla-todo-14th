'use strict';

let itemList = [];
let addButton = document.querySelector('.add__button');
let item = document.querySelector('.add__item');
let waitingCount = document.querySelector('.waiting__count');

addButton.addEventListener("click", ()=>{
  if (item!=null){
    itemList.push(item.value);
    item.value="";
    item.focus();
  }
  waiting_show();
})

function waiting_show(){
  let list = "<ul>"
  for (let i = 0; i <itemList.length; i++){
    list += `<li class= "waiting__list__item">` 
    + itemList[i]
    + `<button class="deleteButton" id = ` + i + `><i class="fas fa-trash"></i></button>`
    +"</li>";
  }
  list+="</ul>";
  document.querySelector(".waiting__list").innerHTML = list;

  waitingCount.innerHTML=itemList.length;

}