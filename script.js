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


/* DAY AND NIGHT MODE */

const themeToggle = document.querySelector(".theme-toggle");
const themeRoot = document.documentElement;

function getTheme() {
  return themeRoot.dataset.theme === "night" ? "night" : "day";
}

function applyTheme(theme) {
  if (theme === "night") {
    themeRoot.dataset.theme = "night";
    themeToggle.textContent = "☀️ Day";
    themeToggle.setAttribute("aria-pressed", "true");
  } else {
    themeRoot.removeAttribute("data-theme");
    themeToggle.textContent = "🌙 Night";
    themeToggle.setAttribute("aria-pressed", "false");
  }

  try {
    localStorage.setItem("theme-mode", theme);
  } catch (error) {
    /* Ignore storage failures. */
  }
}

if (themeToggle) {
  applyTheme(getTheme());

  themeToggle.addEventListener("click", () => {
    applyTheme(getTheme() === "night" ? "day" : "night");
  });
}


/* EXPANDABLE NEWS ARTICLE */

const readMoreBtn = document.querySelector(".read-more-btn");
const articleFull = document.getElementById("articleFull");

if (readMoreBtn && articleFull) {
  readMoreBtn.addEventListener("click", () => {
    const isOpen = articleFull.classList.toggle("open");

    readMoreBtn.textContent = isOpen ? "Show Less ←" : "Read More →";
    readMoreBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

/* TIMER */

let timeLeft = 25 * 60;
let timer = null;

const timerDisplay =
  document.getElementById("timer");

function updateTimer() {

  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  timerDisplay.textContent =
    `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
}

function startTimer() {

  /* Prevent multiple timers */

  if (timer !== null) return;

  timer = setInterval(() => {

    if (timeLeft > 0) {

      timeLeft--;

      updateTimer();

    } else {

      clearInterval(timer);

      timer = null;

      alert(
        "🎉 Pomodoro complete! Time for a break!"
      );

    }

  }, 1000);

}

function pauseTimer() {

  clearInterval(timer);

  timer = null;

}

function resetTimer() {

  clearInterval(timer);

  timer = null;

  timeLeft = 25 * 60;

  updateTimer();

}

document
  .getElementById("startBtn")
  ?.addEventListener(
    "click",
    startTimer
  );

document
  .getElementById("pauseBtn")
  ?.addEventListener(
    "click",
    pauseTimer
  );

document
  .getElementById("resetBtn")
  ?.addEventListener(
    "click",
    resetTimer
  );

/* Show 25:00 on page load */

updateTimer();


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

if (taskList) {
  taskList.addEventListener("click", event => {
    const taskItem = event.target.closest("li");

    if (!taskItem || !taskList.contains(taskItem)) return;

    taskItem.classList.toggle("completed");
  });
}


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

/* ========================= */
/* CAT THERAPY CENTER */
/* ========================= */


/* CAT REPORT DATABASE */

const catProfiles = [

{
  title: "Maximum Cozy Cat ☁️",
  mood: "Maximum Cozy ☁️",
  loaf: "15/10",
  threat: "Stealing Blankets",
  support: "★★★★★",
  advice: "Make a warm drink and slow down today.",
  wisdom: "Rest is productive too."
},

{
  title: "Academic Weapon Cat 📚",
  mood: "Focused & Productive",
  loaf: "10/10",
  threat: "Finishing Assignments",
  support: "★★★★☆",
  advice: "Keep going. You're closer than you think.",
  wisdom: "Small progress is still progress."
},

{
  title: "Tiny Goblin Cat 😈",
  mood: "Chaotic",
  loaf: "4/10",
  threat: "Causing Problems",
  support: "★★★☆☆",
  advice: "Get a snack before making decisions.",
  wisdom: "A little chaos is okay."
},

{
  title: "Sleepy Baby Cat 😴",
  mood: "Very Sleepy",
  loaf: "14/10",
  threat: "Absolutely None",
  support: "★★★★★",
  advice: "Drink water and rest.",
  wisdom: "You don't have to solve everything today."
},

{
  title: "Zoomie Cat ⚡",
  mood: "Maximum Energy",
  loaf: "7/10",
  threat: "Running Through Hallways",
  support: "★★★★☆",
  advice: "Move your body for a few minutes.",
  wisdom: "Energy creates momentum."
},

{
  title: "Emotional Support Cat 💚",
  mood: "Comforting",
  loaf: "12/10",
  threat: "Too Much Love",
  support: "★★★★★",
  advice: "Be kinder to yourself.",
  wisdom: "You are doing better than you think."
},

{
  title: "Forest Guardian Cat 🌿",
  mood: "Peaceful",
  loaf: "13/10",
  threat: "Touching Grass",
  support: "★★★★★",
  advice: "Go outside and get fresh air.",
  wisdom: "Nature heals more than you realize."
}

];


/* DAILY CAT REPORT */

async function generateCatReport() {

  try {

    const response =
      await fetch(
        "https://api.thecatapi.com/v1/images/search"
      );

    const data =
      await response.json();

    const image =
      document.getElementById(
        "reportCatImg"
      );

    if (image) {
      image.src = data[0].url;
    }

  } catch(error) {

    console.error(
      "Cat API failed:",
      error
    );

  }

  const report =
    catProfiles[
      Math.floor(
        Math.random() *
        catProfiles.length
      )
    ];

  document
    .getElementById("catTitle")
    ?.replaceChildren(
      document.createTextNode(
        report.title
      )
    );

  document
    .getElementById("catMood")
    .textContent =
    report.mood;

  document
    .getElementById("loafRating")
    .textContent =
    report.loaf;

  document
    .getElementById("threatLevel")
    .textContent =
    report.threat;

  document
    .getElementById("supportLevel")
    .textContent =
    report.support;

  document
    .getElementById("catAdvice")
    .textContent =
    report.advice;

  document
    .getElementById("catWisdom")
    .textContent =
    report.wisdom;

}

document
  .getElementById("newReport")
  ?.addEventListener(
    "click",
    generateCatReport
  );

/* LOAD FIRST REPORT */

generateCatReport();


/* ========================= */
/* CAT FORTUNE BUTTON */
/* ========================= */

const fortunes = [

  "A sweet treat is in your future 🍓",

  "Today is a good day to start fresh ✨",

  "An unexpected cat will improve your mood 🐱",

  "The universe recommends hydration 💧",

  "Your hard work will pay off soon 🌿",

  "Something good is coming your way 💚",

  "A nap may reveal important wisdom 😴",

  "You will survive this week, probably ⭐",

  "A cozy evening awaits you ☁️",

  "Trust yourself more than you do now 🌸"

];

document
  .getElementById("newFortune")
  ?.addEventListener("click", () => {

    const fortune =
      fortunes[
        Math.floor(
          Math.random() *
          fortunes.length
        )
      ];

    document
      .getElementById("catFortune")
      .textContent =
      fortune;

  });


/* ========================= */
/* NAP GENERATOR */
/* ========================= */

const napAnswers = [

  "Absolutely.",

  "Yes. Immediately.",

  "The cat recommends it.",

  "Only after drinking water.",

  "A tiny nap won't hurt.",

  "10 minute power nap approved.",

  "Your cat lawyer says yes."

];

document
  .getElementById("napButton")
  ?.addEventListener("click", () => {

    document
      .getElementById("napResult")
      .textContent =
      napAnswers[
        Math.floor(
          Math.random() *
          napAnswers.length
        )
      ];

  });


/* ========================= */
/* WATER TRACKER */
/* ========================= */

let waterCount = 0;

document
  .getElementById("drinkWater")
  ?.addEventListener("click", () => {

    waterCount++;

    document
      .getElementById("waterCount")
      .textContent =
      waterCount;

  });


/* ========================= */
/* TOUCH GRASS */
/* ========================= */

const grassQuotes = [

  "Go stand outside for 5 minutes 🌿",

  "Touch one leaf today 🍃",

  "Sunlight would be good right now ☀️",

  "Take a short walk 🌱",

  "Fresh air unlocked ✨",

  "The Forest Guardian Cat approves 🌿"

];

document
  .getElementById("grassButton")
  ?.addEventListener("click", () => {

    document
      .getElementById("grassText")
      .textContent =
      grassQuotes[
        Math.floor(
          Math.random() *
          grassQuotes.length
        )
      ];

  });


/* ========================= */
/* PET THE CAT */
/* ========================= */

const petReplies = [

  "purr 🐾",

  "the cat loves you",

  "happy loaf noises",

  "you have been blessed",

  "the cat approves",

  "friendship increased 💚",

  "maximum happiness achieved ✨"

];

document
  .getElementById("petCat")
  ?.addEventListener("click", () => {

    document
      .getElementById("petResponse")
      .textContent =
      petReplies[
        Math.floor(
          Math.random() *
          petReplies.length
        )
      ];

  });

/* ADDIE FACT GENERATOR */

const addieFacts = [

  "Currently listening to the same song for the 47th time.",

  "Powered primarily by good vibes.",

  "Has main character energy 24/7.",

  "Can detect aesthetic Pinterest posts instantly.",

  "Professional playlist curator.",

  "Has a PhD in being iconic.",

  "Protected by the Cat Therapy Department.",

  "Known to improve the mood of nearby humans.",

  "Can survive finals using determination and snacks.",

  "Frequently caught being adorable."

];

document
  .getElementById("newFact")
  ?.addEventListener("click", () => {

    document
      .getElementById("addieFact")
      .textContent =
      addieFacts[
        Math.floor(
          Math.random() *
          addieFacts.length
        )
      ];

  });

/* LATE NIGHT THOUGHTS */

const thoughtInput =
document.getElementById("thoughtInput");

const thoughtFeed =
document.getElementById("thoughtFeed");

function loadThoughts(){

  const thoughts =
  JSON.parse(
    localStorage.getItem("thoughts")
  ) || [];

  thoughtFeed.innerHTML = "";

  thoughts.forEach(thought=>{

    thoughtFeed.innerHTML += `
      <div class="thought-card">
        <div class="thought-date">
          ${thought.date}
        </div>

        <p>${thought.text}</p>
      </div>
    `;

  });

}

document
.getElementById("saveThought")
?.addEventListener("click",()=>{

  if(
    thoughtInput.value.trim()===""
  ) return;

  const thoughts =
  JSON.parse(
    localStorage.getItem("thoughts")
  ) || [];

  thoughts.unshift({

    text:
    thoughtInput.value,

    date:
    new Date()
    .toLocaleString()

  });

  localStorage.setItem(
    "thoughts",
    JSON.stringify(thoughts)
  );

  thoughtInput.value="";

  loadThoughts();

});

loadThoughts();

/* ========================= */
/* BESTIE CALENDAR */
/* ========================= */

const calendarGrid =
document.getElementById("calendarGrid");

const monthYear =
document.getElementById("monthYear");

const eventList =
document.getElementById("eventList");

let currentDate =
new Date();

let events =
JSON.parse(
localStorage.getItem("bestieEvents")
) || {};

function renderCalendar(){

  const year =
  currentDate.getFullYear();

  const month =
  currentDate.getMonth();

  const firstDay =
  new Date(year,month,1).getDay();

  const daysInMonth =
  new Date(
    year,
    month+1,
    0
  ).getDate();

  monthYear.textContent =
  currentDate.toLocaleString(
    "default",
    {
      month:"long",
      year:"numeric"
    }
  );

  calendarGrid.innerHTML = "";

  for(let i=0;i<firstDay;i++){

    const blank =
    document.createElement("div");

    calendarGrid.appendChild(blank);

  }

  for(let day=1;
      day<=daysInMonth;
      day++){

    const dayBox =
    document.createElement("div");

    dayBox.classList.add(
      "calendar-day"
    );

    const key =
    `${year}-${month}-${day}`;

    let eventHTML = "";

    if(events[key]){

      dayBox.classList.add(
        "has-event"
      );

      eventHTML =
      `<div class="event-dot"></div>`;
    }

    dayBox.innerHTML =

    `
      <div
      class="calendar-day-number">

      ${day}

      </div>

      ${eventHTML}
    `;

    dayBox.addEventListener(
      "click",
      ()=>{

        const title =
        prompt(
          "Add an adventure:"
        );

        if(!title) return;

        events[key] = title;

        localStorage.setItem(
          "bestieEvents",
          JSON.stringify(events)
        );

        renderCalendar();
        renderEvents();

      }
    );

    calendarGrid.appendChild(
      dayBox
    );

  }

}

function renderEvents(){

  eventList.innerHTML = "";

  Object.keys(events)
  .forEach(date=>{

    eventList.innerHTML +=

    `
      <div class="event-item">

        <strong>
          ${date}
        </strong>

        <p>
          ${events[date]}
        </p>

      </div>
    `;

  });

}

document
.getElementById("prevMonth")
?.addEventListener(
"click",
()=>{

  currentDate.setMonth(
  currentDate.getMonth()-1
  );

  renderCalendar();

});

document
.getElementById("nextMonth")
?.addEventListener(
"click",
()=>{

  currentDate.setMonth(
  currentDate.getMonth()+1
  );

  renderCalendar();

});

renderCalendar();
renderEvents();