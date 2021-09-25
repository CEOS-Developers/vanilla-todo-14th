'use strict';
import { Item } from './item.mjs';

// Use only one, global array:itemList
// Each element is object of class:Item
let itemList = [];

// Bring node from index.html
const addButton = document.querySelector('.add__button');
const addInput = document.querySelector('.add__input');
let waitingCount = document.querySelector('.waiting__count');
let doneCount = document.querySelector('.done__count');
const lion = document.querySelector('.lion');

// initial run to load from local Storage
LoadFromLocalStorage();
render();

// eventlistner on addButton : when input is not null , append item to itemList
addButton.addEventListener('click', () => {
  if (addInput.value != '') {
    itemList.push(new Item(addInput.value));
    addInput.value = '';
  }

  render();
});

// render : make innerHTML of each list with reduce
function render() {
  let waitingListInnerHTML = '';
  let doneListInnerHTML = '';

  // waitingDoneInnerHTML is an array of InnerHTMLs
  const waitingDoneInnerHTML = itemList.reduce(
    (accum, value, index) => {
      const accumIndex = value.state === 'waiting' ? 0 : 1;
      const textDecoration =
        value.state === 'waiting'
          ? ''
          : `style="text-decoration: 3px solid line-through brown"`;

      accum[accumIndex] +=
        `<li class="${value.state}ListTag" style="margin:10px 0">` +
        `<span class= "${value.state}__list__item" id = "${index}" ${textDecoration}>` +
        value.content +
        `</span>` +
        `<button class="deleteButton" style="display:none">
    <i class="fas fa-trash"></i>
    </button>` +
        '</li>';
      return accum;
    },
    [waitingListInnerHTML, doneListInnerHTML]
  );

  document.querySelector('.waiting__list').innerHTML = waitingDoneInnerHTML[0];
  document.querySelector('.done__list').innerHTML = waitingDoneInnerHTML[1];

  // add eventlistners
  addEventListenerAll('.deleteButton', 'click', deleteItem);
  addEventListenerAll('.waiting__list__item', 'click', changeState);
  addEventListenerAll('.done__list__item', 'click', changeState);
  addEventListenerAll('.waitingListTag', 'mouseover', appearDeleteButton);
  addEventListenerAll('.waitingListTag', 'mouseout', disappearDeleteButton);
  addEventListenerAll('.doneListTag', 'mouseover', appearDeleteButton);
  addEventListenerAll('.doneListTag', 'mouseout', disappearDeleteButton);

  //update counts
  waitingCount.innerHTML = count(itemList, 'waiting');
  doneCount.innerHTML = count(itemList, 'done');

  //summon Lion!
  if (waitingCount.innerHTML == 0 && doneCount.innerHTML > 0) summonLion();
  else vanishLion();

  //update local storage
  localStorage.clear();
  saveToLocalStorage(itemList);
}

function saveToLocalStorage(itemList) {
  itemList.forEach((value, index) => {
    localStorage.setItem(String(index), JSON.stringify(value));
  });
}

function LoadFromLocalStorage() {
  const keys = Object.keys(localStorage);

  itemList = keys.reduce((accum, value) => {
    accum.push(JSON.parse(localStorage[value]));
    return accum;
  }, []);
}

function count(array, state) {
  return array.reduce((accum, value) => {
    accum = value.state === state ? accum + 1 : accum;
    return accum;
  }, 0);
}

function addEventListenerAll(selector, eventName, eventHandler) {
  let nodeList = document.querySelectorAll(selector);
  nodeList.forEach((element) => {
    element.addEventListener(eventName, eventHandler);
  });
}

// change the state of item
function changeState() {
  let id = this.getAttribute('id');

  const temp = itemList[id];

  itemList.splice(id, 1);
  const newState = temp.state == 'waiting' ? 'done' : 'waiting';
  temp.state = newState;
  itemList.push(temp);

  render();
}

//!CAUTION: firstChild and lastChild depend on structure of DOM ...

//delete the item
function deleteItem() {
  let id = this.parentNode.firstChild.getAttribute('id');
  itemList.splice(id, 1);
  localStorage.removeItem(String(id));
  render();
}

//make deleteButton visible
function appearDeleteButton() {
  const button = this.lastChild;
  button.style.display = 'inline';
  button.style.opacity = 0;
  button.style.transition = 'all 1s ease';
  setTimeout(() => {
    button.style.opacity = 1;
    this.style.color = 'brown';
    this.style.fontWeight = '900';
  });
}

//make deleteButton invisible
function disappearDeleteButton() {
  const button = this.lastChild;
  button.style.display = 'none';
  this.style.color = 'black';
  this.style.fontWeight = '400';
}

//when everything is done, LION comes out!
function summonLion() {
  lion.style.display = 'block';
  setTimeout(() => {
    lion.style.opacity = 1;
    lion.style.top = '70px';
  });
}

function vanishLion() {
  lion.style.opacity = 0;
  lion.style.display = 'none';
  lion.style.top = '100px';
}
