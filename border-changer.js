const button1 = document.querySelector('.button1');
const button2 = document.querySelector('.button2');
const button3 = document.querySelector('.button3');
const button4 = document.querySelector('.button4');
const button5 = document.querySelector('.button5');
const button6 = document.querySelector('.button6');
const borderBox = document.querySelector('#borderBox');

button1.addEventListener('click', button1Clicked);
button2.addEventListener('click', button2Clicked);
button3.addEventListener('click', button3Clicked);
button4.addEventListener('click', button4Clicked);
button5.addEventListener('click', button5Clicked);
button6.addEventListener('click', button6Clicked);

function button1Clicked(){
  if(document.querySelector('#borderBox').classList.length > 0) {
    borderBox.className = "";
    borderBox.classList.add("border1");  
  } else {
    borderBox.classList.add("border1");  
  }
}

function button2Clicked(){
  if(document.querySelector('#borderBox').classList.length > 0) {
    borderBox.className = "";
    borderBox.classList.add("border2");  
  } else {
    borderBox.classList.add("border2");  
  }
}

function button3Clicked(){
  if(document.querySelector('#borderBox').classList.length > 0) {
    borderBox.className = "";
    borderBox.classList.add("border3");  
  } else {
    borderBox.classList.add("border3");  
  }
}

function button4Clicked(){
  if(document.querySelector('#borderBox').classList.length > 0) {
    borderBox.className = "";
    borderBox.classList.add("border4");  
  } else {
    borderBox.classList.add("border4");  
  }
}

function button5Clicked(){
  if(document.querySelector('#borderBox').classList.length > 0) {
    borderBox.className = "";
    borderBox.classList.add("border5");  
  } else {
    borderBox.classList.add("border5");  
  }
}

function button6Clicked(){
  if(document.querySelector('#borderBox').classList.length > 0) {
    borderBox.className = "";
    borderBox.classList.add("border6");  
  } else {
    borderBox.classList.add("border6");  
  }
}
