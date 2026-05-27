// script.js

/* TAB SWITCHING */

const tabButtons =
  document.querySelectorAll(".tab-btn");

const tabContents =
  document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {

  button.addEventListener("click", () => {

    const target =
      button.dataset.tab;

    /* REMOVE ACTIVE */

    tabButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    tabContents.forEach(content => {
      content.classList.remove("active");
    });

    /* ADD ACTIVE */

    button.classList.add("active");

    document
      .getElementById(target)
      .classList.add("active");

  });

});


/* TIMER */

let timeLeft = 25 * 60;
let timer;

const timerDisplay =
  document.getElementById("timer");

function updateTimer() {

  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  timerDisplay.textContent =
    `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {

  timer = setInterval(() => {

    if (timeLeft > 0) {

      timeLeft--;

      updateTimer();

    }

  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function resetTimer() {

  clearInterval(timer);

  timeLeft = 25 * 60;

  updateTimer();
}

document
  .getElementById("startBtn")
  .addEventListener("click", startTimer);

document
  .getElementById("pauseBtn")
  .addEventListener("click", pauseTimer);

document
  .getElementById("resetBtn")
  .addEventListener("click", resetTimer);


/* TODO LIST */

const addTaskBtn =
  document.getElementById("addTask");

const taskInput =
  document.getElementById("taskInput");

const taskList =
  document.getElementById("taskList");

addTaskBtn.addEventListener("click", () => {

  if (taskInput.value === "") return;

  const li =
    document.createElement("li");

  li.textContent =
    "☐ " + taskInput.value;

  taskList.appendChild(li);

  taskInput.value = "";

});


/* QUOTES */

const quotes = [
  "Small progress is still progress.",
  "Focus now. Shine later.",
  "Discipline creates freedom.",
  "You got this bestie ✨",
  "Consistency beats motivation."
];

const quoteText =
  document.getElementById("quoteText");

document
  .getElementById("newQuote")
  .addEventListener("click", () => {

    const randomQuote =
      quotes[Math.floor(Math.random() * quotes.length)];

    quoteText.textContent =
      randomQuote;

  });