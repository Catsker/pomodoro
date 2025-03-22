const settingsClose = document.querySelector('.settingsMenu__close')
const dialogSettings = document.getElementById('dialogSettings')
const settingsButton = document.querySelector('.settings')
const startAndPause = document.getElementById('startAndPause')
const stopAndDone = document.getElementById('stopAndDone')
const workTimeInput = document.getElementById('workTime')
const restTimeInput = document.getElementById('restTime')
const minutesDisplay = document.querySelector('.minute')
const secondsDisplay = document.querySelector('.second')
const fullscreen = document.querySelector('.fullscreen')
const timerSound = document.getElementById('timerSound')

let isRest = false
let isStarted = false
let workTime = workTimeInput.value * 60
let restTime = restTimeInput.value * 60

settingsClose.onclick = () => {
   workTime = workTimeInput.value * 60
   restTime = restTimeInput.value * 60
   if (isRest) {
      minutesDisplay.textContent = Math.floor(restTime / 60)
      secondsDisplay.textContent = '00'
   } else {
      minutesDisplay.textContent = Math.floor(workTime / 60)
      secondsDisplay.textContent = '00'
   }
   dialogSettings.close()
}

function UpdateTimer() {
   let minutes;
   let seconds;

   if (!isRest) {
      minutes = Math.floor(workTime / 60);
      seconds = workTime % 60;
   } else {
      minutes = Math.floor(restTime / 60);
      seconds = restTime % 60;
   }

   let formattedMinutes = minutes;
   let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

   minutesDisplay.textContent = formattedMinutes;
   secondsDisplay.textContent = formattedSeconds;

   console.log(`${formattedMinutes}:${formattedSeconds}`);

   if (formattedMinutes > 0 || formattedSeconds > 0) {
      if (!isRest) {
         workTime--;
      } else {
         restTime--;
      }
   } else {
      clearInterval(timerInterval);
      timerSound.play();

      ChangeTheTimer();

      if (isRest) {
         workTime = workTimeInput.value * 60;
      } else {
         restTime = restTimeInput.value * 60;
      }

      if (isRest) {
         minutesDisplay.textContent = Math.floor(restTime / 60);
         secondsDisplay.textContent = '00';
      } else {
         minutesDisplay.textContent = Math.floor(workTime / 60);
         secondsDisplay.textContent = '00';
      }

      timerInterval = setInterval(() => UpdateTimer(), 1000);

      startAndPause.textContent = 'Пауза';
      stopAndDone.disabled = false;
      stopAndDone.textContent = 'Стоп';
      isStarted = true;
   }
}

let timerInterval

startAndPause.onclick = () => {
   isStarted = !isStarted
   settingsButton.disabled = true

   if (isStarted) {
      startAndPause.textContent = 'Пауза'
      stopAndDone.disabled = false
      stopAndDone.textContent = 'Стоп'
      timerInterval = setInterval(() => UpdateTimer(isRest), 1000);
   } else {
      startAndPause.textContent = 'Продолжить'
      stopAndDone.disabled = false
      stopAndDone.textContent = 'Пропустить'
      clearInterval(timerInterval);
   }
}

function ChangeTheTimer() {
   isRest = !isRest
   fullscreen.classList.toggle('rest')
   startAndPause.textContent = 'Начать'
   stopAndDone.disabled = true
   stopAndDone.textContent = 'Стоп'
}

stopAndDone.onclick = () => {
   settingsButton.disabled = false

   if (isStarted) {
      clearInterval(timerInterval);
      workTime = workTimeInput.value * 60
      restTime = restTimeInput.value * 60
      if (isRest) {
         minutesDisplay.textContent = Math.floor(restTime / 60)
         secondsDisplay.textContent = '00'
      } else {
         minutesDisplay.textContent = Math.floor(workTime / 60)
         secondsDisplay.textContent = '00'
      }

      isStarted = false
      startAndPause.textContent = 'Начать'
      stopAndDone.disabled = true
      stopAndDone.textContent = 'Стоп'
   } else {
      ChangeTheTimer()
      workTime = workTimeInput.value * 60
      restTime = restTimeInput.value * 60
      if (isRest) {
         minutesDisplay.textContent = Math.floor(restTime / 60)
         secondsDisplay.textContent = '00'
      } else {
         minutesDisplay.textContent = Math.floor(workTime / 60)
         secondsDisplay.textContent = '00'
      }
   }
}