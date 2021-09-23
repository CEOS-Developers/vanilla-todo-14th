'use strict';
import {Item} from './item.mjs'


let itemList = [];

let addButton = document.querySelector('.add__button');
let newItem = document.querySelector('.add__item');
let waitingCount = document.querySelector('.waiting__count');
let doneCount = document.querySelector('.done__count');

// addButton : when input is not null , append item to itemList
addButton.addEventListener("click", ()=>{

  if (newItem.value!=""){
    itemList.push(new Item(newItem.value));
    newItem.value="";
  }

  render();

})

// render : show items by the type of their state
function render(){
  let waitingNum=0;
  let doneNum=0;

  let waitingListInnerHTML ="<ul>";
  let doneListInnerHTML = "<ul>";


  for (let i = 0; i <itemList.length; i++){
    
    if (itemList[i].state=="waiting"){
      waitingListInnerHTML+= `<li class="waitingListTag" style="margin:10px 0">` 
      + `<span class= "waiting__list__item" id = `+i+`>`+itemList[i].content+`</span>`
      + `<button class="deleteButton" style="display:none">
      <i class="fas fa-trash"></i>
      </button>`
      +"</li>"
      ;
      waitingNum+=1;

    }

    else{
      doneListInnerHTML+= `<li class="doneListTag" style="margin:10px 0">` 
      +`<span class= "done__list__item" id = `+i+` style="text-decoration: 2px solid line-through red">`+itemList[i].content+`</span>`
      + `<button class="deleteButton" style="display:none">
      <i class="fas fa-trash"></i>
      </button>`
      +"</li>";
      doneNum+=1;
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

  let waitingListTag = document.querySelectorAll('.waitingListTag');
  let doneListTag=document.querySelectorAll('.doneListTag');
  for (let i =0; i<waitingListTag.length; i++){
    waitingListTag[i].addEventListener("mouseover",appearDeleteButton);
    waitingListTag[i].addEventListener("mouseout",disappearDeleteButton);
  }
  for (let i =0; i<doneListTag.length;i++){
    doneListTag[i].addEventListener("mouseover",appearDeleteButton);
    doneListTag[i].addEventListener("mouseout",disappearDeleteButton);
    
  }



  //update counts
  waitingCount.innerHTML=waitingNum;
  doneCount.innerHTML=doneNum;
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
  let id = this.parentNode.firstChild.getAttribute("id");
  itemList.splice(id,1 );
  render();
}

// appearDeleteButton
function appearDeleteButton(){
  const button = this.lastChild;
  button.style.display="inline";
  button.style.opacity=0;
  button.style.transition="all 1s ease";
  setTimeout(()=>{
    button.style.opacity=1;
    this.style.color="blue";
  });
}

// disappearDeleteButton
function disappearDeleteButton(){
  const button = this.lastChild;
  button.style.display="none";
  this.style.color="black";
}
