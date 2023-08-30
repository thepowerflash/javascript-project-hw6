const gmailInput = document.querySelector("#gmail_input")
const gmailButton = document.querySelector("#gmail_button")
const gmailResult = document.querySelector("#gmail_result")

const regExp = /^[a-zA-Z0-9._-]+@gmail\.com$/;

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)){
        gmailResult.innerHTML = "Почта корректна!"
        gmailResult.style.color = "green"
    }else{
        gmailResult.innerHTML = "Почта некорректна!"
        gmailResult.style.color = "red"
    }
}
///////////////////////////////////////////////
const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

function moveBlocks() {
  moveRight(0);
}

function moveRight(positionX) {
  if (positionX <= parentBlock.clientWidth - childBlock.clientWidth) {
    childBlock.style.left = `${positionX}px`;
    setTimeout(() => {
      moveRight(positionX + 6);
    }, 10);
  } else {
    moveDown(0);
  }
}

function moveDown(positionY) {
  if (positionY <= parentBlock.clientHeight - childBlock.clientHeight) {
    childBlock.style.top = `${positionY}px`;
    setTimeout(() => {
      moveDown(positionY + 6);
    }, 10);
  } else {
    moveLeft(parentBlock.clientWidth - childBlock.clientWidth);
  }
}

function moveLeft(positionX) {
  if (positionX >= 0) {
    childBlock.style.left = `${positionX}px`;
    setTimeout(() => {
      moveLeft(positionX - 6);
    }, 10);
  } else {
    moveUp(parentBlock.clientHeight - childBlock.clientHeight);
  }
}

function moveUp(positionY) {
  if (positionY >= 0) {
    childBlock.style.top = `${positionY}px`;
    setTimeout(() => {
      moveUp(positionY - 6);
    }, 10);
  } else {
    moveRight(0);
  
  }
}

moveBlocks();

////////////////////////////////////////////////////////////////////
const secondsDisplay = document.getElementById('seconds');
let seconds = 0;
let intervalId = null;
let isRunning = false;

function startTimer() {
  if (!isRunning) {
    secondsDisplay.textContent = seconds; 
    intervalId = setInterval(() => {
      seconds++;
      secondsDisplay.textContent = seconds;
    }, 1000);
    isRunning = true;
  }
}

function stopTimer() {
  clearInterval(intervalId);
  isRunning = false;
}

function resetTimer() {
  clearInterval(intervalId);
  seconds = 0;
  secondsDisplay.textContent = seconds;
  isRunning = false;
}

function resumeTimer() {
  startTimer();
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('resume').addEventListener('click', resumeTimer);