'use strict';
import {Item} from './item.mjs'


let itemList = [];

let addButton = document.querySelector('.add__button');
let newItem = document.querySelector('.add__item');
let waitingCount = document.querySelector('.waiting__count');

// addButton : when input is not null , append item to itemList
addButton.addEventListener("click", ()=>{

  if (newItem.value!=""){
    itemList.push(new Item(newItem.value));
    newItem.value="";
    newItem.focus();
  }

  render();

})


// render : show items by the type of their state
function render(){

  let waitingListInnerHTML ="<ul>";
  let doneListInnerHTML = "<ul>";

  for (let i = 0; i <itemList.length; i++){
    
    if (itemList[i].state=="waiting"){
      waitingListInnerHTML+= `<li>` 
      + `<span class= "waiting__list__item" id = `+i+`>`+itemList[i].content+`</span>`
      + `<button class="deleteButton" id = ` + i + `><i class="fas fa-trash"></i></button>`
      +"</li>";
    }

    else{
      doneListInnerHTML+= `<li>` 
      +`<span class= "done__list__item" id = `+i+`>`+itemList[i].content+`</span>`
      + `<button class="deleteButton" id = ` + i + `><i class="fas fa-trash"></i></button>`
      +"</li>";
    }
  }

  waitingListInnerHTML+="</ul>";
  doneListInnerHTML+="</ul>";

  document.querySelector(".waiting__list").innerHTML = waitingListInnerHTML;
  document.querySelector(".done__list").innerHTML = doneListInnerHTML;


  // add eventlistners

  let deleteButtonList = document.querySelectorAll('.deleteButton');
  for (let i =0; i<deleteButtonList.length; i++){
    deleteButtonList[i].addEventListener("click", deleteItem);
  }

  let waitingElementList = document.querySelectorAll('.waiting__list__item');
  for (let i =0; i<waitingElementList.length;i++){
    waitingElementList[i].addEventListener("click",changeState);
  }

  let doneElementList = document.querySelectorAll('.done__list__item');
  for (let i =0; i<doneElementList.length;i++){
    doneElementList[i].addEventListener("click",changeState);
  }

  
}

// change the state of item
function changeState(){
  
  let id = this.getAttribute("id");
  
  const temp = itemList[id];
 
  itemList.splice(id,1);
  const newState = (temp.state=='waiting')? 'done':'waiting';
  temp.state=newState;
  itemList.push(temp);

  render();
}

// delete the item
function deleteItem(){
  let id = this.getAttribute("id");
  itemList.splice(id,1 );
  render();
}

