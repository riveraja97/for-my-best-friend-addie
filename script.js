/* =========================
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

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

/* =========================
   TO-DO LIST
========================= */

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;

  const li = document.createElement("li");
  li.textContent = taskInput.value;

  taskList.appendChild(li);
  taskInput.value = "";
});

/* =========================
   QUOTES
========================= */

const quotes = [
  "Success is built from consistency.",
  "Small progress is still progress.",
  "You are capable of amazing things.",
  "Focus now. Shine later.",
  "Discipline creates freedom.",
];

const quoteText = document.getElementById("quoteText");

function generateQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = randomQuote;
}

document
  .getElementById("newQuote")
  .addEventListener("click", generateQuote);

/* =========================
   PENGUIN MESSAGES
========================= */

const leftBubble = document.querySelector(".left");
const rightBubble = document.querySelector(".right");

const reminders = [
  "drink some water bestie 💧",
  "stay focused ✨",
  "you got this!!",
  "take a deep breath ♡",
  "finish strong 💻",
  "no distractions!!",
];

setInterval(() => {
  const randomReminder =
    reminders[Math.floor(Math.random() * reminders.length)];

  leftBubble.innerHTML = randomReminder;
}, 5000);