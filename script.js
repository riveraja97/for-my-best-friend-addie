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

/* CAT WISDOM */

const wisdomQuotes = [
  "You don't have to solve everything today.",
  "The cat believes in you.",
  "Rest is productive too.",
  "Drink water immediately.",
  "A nap is sometimes the answer.",
  "You are doing better than you think."
];

document
.getElementById("newWisdom")
?.addEventListener("click",()=>{

  document.getElementById("catWisdom")
  .textContent =
  wisdomQuotes[
    Math.floor(
      Math.random()*wisdomQuotes.length
    )
  ];

});


/* CAT REPORT */

const moods = [
  "Sleepy",
  "Zoomies",
  "Loaf Mode",
  "Hungry",
  "Judging Everyone"
];

const threats = [
  "Wants Treats",
  "Will Steal Blanket",
  "Extremely Cozy",
  "Demands Attention"
];

const advice = [
  "Drink water.",
  "Take a break.",
  "Go outside.",
  "Stretch for 30 seconds.",
  "Be kind to yourself."
];

document
.getElementById("newReport")
?.addEventListener("click",()=>{

  document.getElementById("catMood")
  .textContent =
  moods[Math.floor(Math.random()*moods.length)];

  document.getElementById("threatLevel")
  .textContent =
  threats[Math.floor(Math.random()*threats.length)];

  document.getElementById("catAdvice")
  .textContent =
  advice[Math.floor(Math.random()*advice.length)];

});


/* NAP GENERATOR */

const napAnswers = [
  "Absolutely.",
  "Yes. Immediately.",
  "The cat recommends it.",
  "Only after drinking water.",
  "A tiny nap won't hurt."
];

document
.getElementById("napButton")
?.addEventListener("click",()=>{

  document.getElementById("napResult")
  .textContent =
  napAnswers[
    Math.floor(
      Math.random()*napAnswers.length
    )
  ];

});


/* WATER TRACKER */

let waterCount = 0;

document
.getElementById("drinkWater")
?.addEventListener("click",()=>{

  waterCount++;

  document.getElementById("waterCount")
  .textContent = waterCount;

});


/* TOUCH GRASS */

const grassQuotes = [
  "Go stand outside for 5 minutes 🌿",
  "Touch one leaf today 🍃",
  "Sunlight would be good right now ☀️",
  "Take a short walk 🌱",
  "Fresh air unlocked ✨"
];

document
.getElementById("grassButton")
?.addEventListener("click",()=>{

  document.getElementById("grassText")
  .textContent =
  grassQuotes[
    Math.floor(
      Math.random()*grassQuotes.length
    )
  ];

});


/* PETTABLE CAT */

const petReplies = [
  "purr 🐾",
  "the cat loves you",
  "happy loaf noises",
  "you have been blessed",
  "the cat approves"
];

document
.getElementById("petCat")
?.addEventListener("click",()=>{

  document.getElementById("petResponse")
  .textContent =
  petReplies[
    Math.floor(
      Math.random()*petReplies.length
    )
  ];

});

async function getRandomCat() {

  const response =
    await fetch(
      "https://api.thecatapi.com/v1/images/search"
    );

  const data =
    await response.json();

  document
    .getElementById("randomCatImg")
    .src = data[0].url;
}

document
  .getElementById("newCat")
  .addEventListener("click", getRandomCat);

getRandomCat();