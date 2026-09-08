/* ========================= */
/* TAB SOUND EFFECTS */
/* ========================= */

/*
  Each key MUST match the data-tab value
  from your navbar buttons.

  Example:
  <button class="tab-btn" data-tab="home">Home</button>

  You can change any audio filename below
  to match the sounds you download.
*/

const tabSounds = {

  home: "Audio/sparkle.mp3",

  favorites: "Audio/whoosh.mp3",

  about: "Audio/softbell.mp3",

  memory: "Audio/camerashutter.mp3",

  study: "Audio/writing.mp3",

  thoughts: "Audio/thinking.mp3",

  future: "Audio/shimmer.mp3",

  cats: "Audio/meow.mp3",

  awards: "Audio/awardscelebrate.mp3",

  contact: "Audio/dreamchime.mp3"

};


/*
  Stores whichever tab sound
  is currently playing.
*/

let currentTabAudio = null;


/* ========================= */
/* PLAY TAB SOUND */
/* ========================= */

function playTabSound(tabName) {

  const soundFile =
    tabSounds[tabName];


  /*
    If this tab doesn't have
    a sound assigned, do nothing.
  */

  if (!soundFile) return;


  /*
    Stop the previous sound.

    This prevents sounds from
    overlapping when Addie clicks
    through tabs quickly.
  */

  if (currentTabAudio) {

    currentTabAudio.pause();

    currentTabAudio.currentTime = 0;

  }


  /*
    Create the new audio.
  */

  currentTabAudio =
    new Audio(soundFile);


  /*
    Awards stays louder because
    it's the celebration sound.

    Other tabs are softer.
  */

  if (tabName === "awards") {

    currentTabAudio.volume = 1;

  } else {

    currentTabAudio.volume = 0.45;

  }


  /*
    Play the sound.

    catch() prevents an audio error
    from breaking your website if a
    file is missing.
  */

  currentTabAudio
    .play()
    .catch(error => {

      console.log(
        `Could not play ${tabName} tab sound:`,
        error
      );

    });

}


/* ========================= */
/* TAB SWITCHING */
/* ========================= */

const tabButtons =
  document.querySelectorAll(".tab-btn");


const tabContents =
  document.querySelectorAll(".tab-content");


tabButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {


      /*
        Get the tab name from
        data-tab="..."
      */

      const target =
        button.dataset.tab;


      /*
        Remove active state
        from ALL navbar buttons.
      */

      tabButtons.forEach(btn => {

        btn.classList.remove(
          "active"
        );

      });


      /*
        Hide ALL tab sections.
      */

      tabContents.forEach(content => {

        content.classList.remove(
          "active"
        );

      });


      /*
        Make clicked navbar
        button active.
      */

      button.classList.add(
        "active"
      );


      /*
        Find the corresponding
        section and show it.
      */

      const targetSection =
        document.getElementById(
          target
        );


      if (targetSection) {

        targetSection.classList.add(
          "active"
        );

      }


      /*
        Play this tab's
        sound effect.
      */

      playTabSound(target);


      /*
        Scroll back to the top
        whenever a new tab opens.
      */

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }

  );

});


/* ========================= */
/* OPTIONAL:
   KEYBOARD ACCESSIBILITY */
/* ========================= */

/*
  If your .tab-btn elements are
  actual <button> elements, Enter
  and Space already work automatically.

  This section adds arrow-key navigation
  between the tabs.
*/

tabButtons.forEach((button, index) => {

  button.addEventListener(
    "keydown",
    event => {


      let newIndex = index;


      /*
        RIGHT ARROW
      */

      if (event.key === "ArrowRight") {

        newIndex =
          (index + 1) %
          tabButtons.length;

      }


      /*
        LEFT ARROW
      */

      else if (
        event.key === "ArrowLeft"
      ) {

        newIndex =
          (
            index -
            1 +
            tabButtons.length
          ) %
          tabButtons.length;

      }


      /*
        HOME KEY
      */

      else if (
        event.key === "Home"
      ) {

        newIndex = 0;

      }


      /*
        END KEY
      */

      else if (
        event.key === "End"
      ) {

        newIndex =
          tabButtons.length - 1;

      }


      else {

        return;

      }


      event.preventDefault();


      /*
        Move keyboard focus
        to the new tab.
      */

      tabButtons[
        newIndex
      ].focus();

    }

  );

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


/* STUDY PLAYLIST WIDGET */

const studyPlaylistToggle = document.getElementById("studyPlaylistToggle");
const studyPlaylistWidget = document.getElementById("studyPlaylistWidget");

if (studyPlaylistToggle && studyPlaylistWidget) {
  studyPlaylistToggle.addEventListener("click", () => {
    const shouldOpen = studyPlaylistWidget.hasAttribute("hidden");

    if (shouldOpen) {
      studyPlaylistWidget.removeAttribute("hidden");
      studyPlaylistToggle.setAttribute("aria-expanded", "true");
      studyPlaylistToggle.textContent = "✕";
    } else {
      studyPlaylistWidget.setAttribute("hidden", "");
      studyPlaylistToggle.setAttribute("aria-expanded", "false");
      studyPlaylistToggle.textContent = "▶";
    }
  });
}


/* MOOD CHECK-IN */

const moodCard = document.querySelector(".mood-card");

const moodSoundMap = {
  "😊": [523.25, 659.25],
  "😴": [261.63, 196.0],
  "⭐": [783.99, 987.77],
  "☁": [392.0, 329.63],
  "😵": [622.25, 466.16],
  "💻": [440.0, 554.37]
};

let moodAudioContext = null;

function getMoodAudioContext() {
  if (!moodAudioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;

    if (!AudioCtx) return null;

    moodAudioContext = new AudioCtx();
  }

  return moodAudioContext;
}

window.playMoodSound = function playMoodSound(emoji) {
  const audioContext = getMoodAudioContext();

  if (!audioContext) return;

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const now = audioContext.currentTime;
  const notes = moodSoundMap[emoji] || [392.0, 523.25];

  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + index * 0.08;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.09, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(start);
    oscillator.stop(start + 0.2);
  });
};

function launchMoodBurst(emoji) {
  if (!moodCard) return;

  const burstLayer = moodCard.querySelector(".mood-burst-layer");

  if (!burstLayer) return;

  const cardRect = moodCard.getBoundingClientRect();
  const burstCount = 14;

  for (let index = 0; index < burstCount; index++) {
    const burst = document.createElement("span");

    const x = 30 + Math.random() * Math.max(cardRect.width - 60, 120);
    const y = 60 + Math.random() * Math.max(cardRect.height - 110, 120);
    const dx = `${(Math.random() - 0.5) * 220}px`;
    const dy = `${-60 - Math.random() * 160}px`;
    const size = `${1.1 + Math.random() * 1.1}rem`;
    const rotate = `${(Math.random() - 0.5) * 80}deg`;

    burst.className = "mood-burst";
    burst.textContent = emoji;
    burst.style.setProperty("--x", `${x}px`);
    burst.style.setProperty("--y", `${y}px`);
    burst.style.setProperty("--dx", dx);
    burst.style.setProperty("--dy", dy);
    burst.style.setProperty("--size", size);
    burst.style.setProperty("--rotate", rotate);

    burstLayer.appendChild(burst);

    window.setTimeout(() => {
      burst.remove();
    }, 950);
  }

  document.dispatchEvent(
    new CustomEvent("mood-emoji:selected", {
      detail: { emoji }
    })
  );

  if (typeof window.playMoodSound === "function") {
    window.playMoodSound(emoji);
  }
}

if (moodCard) {
  moodCard.addEventListener("click", event => {
    const moodButton = event.target.closest("button[data-emoji]");

    if (!moodButton || !moodCard.contains(moodButton)) return;

    launchMoodBurst(moodButton.dataset.emoji || moodButton.textContent.trim());
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

/* ========================= */
/* MAGIC BESTIE 8 BALL */
/* ========================= */

const magicBall =
  document.getElementById("magicBall");

const shakeBall =
  document.getElementById("shakeBall");

const magicQuestion =
  document.getElementById("magicQuestion");

const magicAnswer =
  document.getElementById("magicAnswer");

const ballFace =
  document.getElementById("magicFace");


/* ========================= */
/* MAGIC RESPONSES */
/* ========================= */

/*
  Every response has a type.

  yes    -> yes recordings
  no     -> no recordings
  maybe  -> maybe recordings
  random -> one of your 4 random phrase recordings
*/

const magicResponses = [

  /* YES */

  {
    text: "Yes. Absolutely. ✨",
    type: "yes"
  },

  {
    text: "The universe says yes.",
    type: "yes"
  },

  {
    text: "Without a doubt.",
    type: "yes"
  },

  {
    text: "Signs point to yes.",
    type: "yes"
  },

  {
    text: "Definitely bestie.",
    type: "yes"
  },

  {
    text: "The vibes are immaculate. Yes.",
    type: "yes"
  },


  /* MAYBE */

  {
    text: "Ask again after a snack.",
    type: "maybe"
  },

  {
    text: "Hmm... suspiciously possible.",
    type: "maybe"
  },

  {
    text: "Maybe. Don't rush it.",
    type: "maybe"
  },

  {
    text: "Proceed with caution.",
    type: "maybe"
  },

  {
    text: "Only if you drink water first 💧",
    type: "maybe"
  },

  {
    text: "Take a nap and ask again later.",
    type: "maybe"
  },

  {
    text: "The answer is hidden in your playlist 🎧",
    type: "maybe"
  },

  {
    text: "Trust your gut.",
    type: "maybe"
  },


  /* NO */

  {
    text: "Not today bestie.",
    type: "no"
  },

  {
    text: "Absolutely not 😭",
    type: "no"
  },

  {
    text: "The universe is giving side eye.",
    type: "no"
  },

  {
    text: "Girl... I would not do that.",
    type: "no"
  },

  {
    text: "The cat has officially voted no.",
    type: "no"
  },


  /* RANDOM / CHAOTIC RESPONSES */

  /*
    These do NOT play yes/no/maybe audio.

    Instead, they randomly choose:
    phrase1.mp3
    phrase2.mp3
    phrase3.mp3
    phrase4.mp3
  */

  {
    text: "You already know the answer 👀",
    type: "random"
  },

  {
    text: "The cat refuses to elaborate.",
    type: "random"
  },

  {
    text: "Why are you asking me? YOU KNOW.",
    type: "random"
  },

  {
    text: "The prophecy has been revealed ✨",
    type: "random"
  }

];


/* ========================= */
/* SPECIAL PERSONAL RESPONSES */
/* ========================= */

const specialResponses = {

  "should i nap": [

    {
      text: "YES. Go take that nap immediately. 😴",
      type: "nap"
    },

    {
      text: "The oracle has officially prescribed a nap.",
      type: "nap"
    },

    {
      text: "Only a tiny little 4 hour nap.",
      type: "nap"
    }

  ],


  "does cat love me": [

    {
      text: "Obviously. Next question. 💚",
      type: "love"
    },

    {
      text: "More than iced coffee.",
      type: "love"
    },

    {
      text: "The Magic Ball confirms: YES x1000.",
      type: "love"
    }

  ],


  "should i drink water": [

    {
      text: "YES. GET THE WATER. 💧",
      type: "water"
    },

    {
      text: "Hydration is mandatory bestie.",
      type: "water"
    },

    {
      text: "The oracle is disappointed you had to ask.",
      type: "water"
    }

  ],


  "should i study": [

    {
      text: "Unfortunately... yes. 📚",
      type: "yes"
    },

    {
      text: "Go study for 25 minutes then come back.",
      type: "yes"
    },

    {
      text: "The Pomodoro timer is waiting for you.",
      type: "yes"
    }

  ],


  "am i pretty": [

    {
      text: "Error: question has an obvious answer.",
      type: "yes"
    },

    {
      text: "YES??? Why are we even asking?",
      type: "yes"
    },

    {
      text: "The universe paused because obviously.",
      type: "yes"
    }

  ],


  "should i text them": [

    {
      text: "Hmm... put the phone down for 10 minutes first.",
      type: "maybe"
    },

    {
      text: "Ask yourself: will future you cringe?",
      type: "maybe"
    },

    {
      text: "The Magic Ball has entered airplane mode.",
      type: "no"
    }

  ],


  "should i get a sweet treat": [

    {
      text: "YES. This was never a question.",
      type: "treat"
    },

    {
      text: "The universe supports little treats.",
      type: "treat"
    },

    {
      text: "Absolutely. You deserve the sweet treat.",
      type: "treat"
    }

  ]

};


/* ========================= */
/* YOUR VOICE RECORDINGS */
/* ========================= */

/*
  These filenames match the setup
  already present in your JS.
*/

const audioResponses = {

  yes: [
    "audio/yes1.mp3",
    "audio/yes2.mp3",
    "audio/yes3.mp3"
  ],

  maybe: [
    "audio/maybe1.mp3",
    "audio/maybe2.mp3",
    "audio/maybe3.mp3"
  ],

  no: [
    "audio/no1.mp3",
    "audio/no2.mp3",
    "audio/no3.mp3"
  ],

  random: [
    "audio/phrase1.mp3",
    "audio/phrase2.mp3",
    "audio/phrase3.mp3",
    "audio/phrase4.mp3"
  ],

  nap: [
    "audio/nap.mp3"
  ],

  love: [
    "audio/love.mp3"
  ],

  water: [
    "audio/water.mp3"
  ],

  treat: [
    "audio/treat.mp3"
  ]

};


/* ========================= */
/* RANDOM HELPER */
/* ========================= */

function getRandomItem(array) {

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];

}


/* ========================= */
/* FIND SPECIAL ANSWER */
/* ========================= */

function getSpecialAnswer(question) {

  const lowerQuestion =
    question
      .toLowerCase()
      .trim();


  for (const key in specialResponses) {

    if (
      lowerQuestion.includes(key)
    ) {

      return getRandomItem(
        specialResponses[key]
      );

    }

  }


  return null;

}


/* ========================= */
/* RANDOM NORMAL ANSWER */
/* ========================= */

function getRandomResponse() {

  return getRandomItem(
    magicResponses
  );

}


/* ========================= */
/* MAGIC BALL AUDIO */
/* ========================= */

let currentMagicAudio = null;


/* ========================= */
/* PLAY PERSONAL AUDIO */
/* ========================= */

function playPersonalAudio(category) {

  /*
    If a response somehow does not have
    a valid assigned category,
    use one of the 4 random recordings.
  */

  let audioCategory =
    category;


  if (
    !audioCategory ||
    !audioResponses[audioCategory] ||
    audioResponses[audioCategory].length === 0
  ) {

    audioCategory =
      "random";

  }


  const sounds =
    audioResponses[audioCategory];


  if (
    !sounds ||
    sounds.length === 0
  ) {

    return;

  }


  /*
    Pick ONE recording.

    Nothing plays after it.
  */

  const randomSound =
    getRandomItem(
      sounds
    );


  /*
    Stop previous Magic Ball audio
    if she shakes it again quickly.
  */

  if (currentMagicAudio) {

    currentMagicAudio.pause();

    currentMagicAudio.currentTime =
      0;

  }


  currentMagicAudio =
    new Audio(
      randomSound
    );


  currentMagicAudio.volume =
    1;


  /*
    Make your face animate
    while your recording plays.
  */

  ballFace?.classList.add(
    "magic-face-talking"
  );


  currentMagicAudio
    .play()
    .catch(error => {

      console.log(
        "Magic Ball audio could not play:",
        error
      );


      ballFace?.classList.remove(
        "magic-face-talking"
      );

    });


  /*
    Stop talking animation
    once the recording ends.
  */

  currentMagicAudio
    .addEventListener(
      "ended",
      () => {

        ballFace?.classList.remove(
          "magic-face-talking"
        );

      },
      {
        once: true
      }
    );

}


/* ========================= */
/* SHAKE THE MAGIC BALL */
/* ========================= */

function shakeMagicBall() {

  if (
    !magicQuestion ||
    !magicAnswer
  ) {

    return;

  }


  const question =
    magicQuestion
      .value
      .trim();


  /* ========================= */
  /* REQUIRE A QUESTION */
  /* ========================= */

  if (!question) {

    magicAnswer.textContent =
      "Ask me a yes or no question first 👀";


    magicAnswer.classList.remove(
      "answer-show"
    );


    void magicAnswer.offsetWidth;


    magicAnswer.classList.add(
      "answer-show"
    );


    magicQuestion.focus();


    return;

  }


  /* ========================= */
  /* DISABLE SHAKE BUTTON */
  /* ========================= */

  if (shakeBall) {

    shakeBall.disabled =
      true;


    shakeBall.textContent =
      "🔮 consulting the universe...";

  }


  /* ========================= */
  /* THINKING MESSAGE */
  /* ========================= */

  magicAnswer.textContent =
    "consulting the universe... 🔮";


  /* ========================= */
  /* RESET SHAKE ANIMATION */
  /* ========================= */

  magicBall?.classList.remove(
    "ball-shake"
  );


  if (magicBall) {

    void magicBall.offsetWidth;


    magicBall.classList.add(
      "ball-shake"
    );

  }


  /* ========================= */
  /* SPIN YOUR FACE */
  /* ========================= */

  if (ballFace) {

    ballFace.classList.remove(
      "face-spin"
    );


    void ballFace.offsetWidth;


    ballFace.classList.add(
      "face-spin"
    );

  }


  /* ========================= */
  /* DRAMATIC PAUSE */
  /* ========================= */

  setTimeout(
    () => {


      /* ========================= */
      /* CHECK SPECIAL QUESTIONS */
      /* ========================= */

      const specialAnswer =
        getSpecialAnswer(
          question
        );


      /* ========================= */
      /* OTHERWISE RANDOM RESPONSE */
      /* ========================= */

      const answer =
        specialAnswer ||
        getRandomResponse();


      /* ========================= */
      /* DISPLAY ANSWER */
      /* ========================= */

      magicAnswer.textContent =
        answer.text;


      /* ========================= */
      /* ANSWER ANIMATION */
      /* ========================= */

      magicAnswer.classList.remove(
        "answer-show"
      );


      void magicAnswer.offsetWidth;


      magicAnswer.classList.add(
        "answer-show"
      );


      /* ========================= */
      /* PLAY MATCHING VOICE */
      /* ========================= */

      /*
        yes    -> yes1/2/3
        no     -> no1/2/3
        maybe  -> maybe1/2/3

        random -> phrase1/2/3/4

        nap    -> nap.mp3
        love   -> love.mp3
        water  -> water.mp3
        treat  -> treat.mp3
      */

      playPersonalAudio(
        answer.type
      );


      /* ========================= */
      /* STOP FACE SPIN */
      /* ========================= */

      if (ballFace) {

        ballFace.classList.remove(
          "face-spin"
        );

      }


      /* ========================= */
      /* RE-ENABLE BUTTON */
      /* ========================= */

      if (shakeBall) {

        shakeBall.disabled =
          false;


        shakeBall.textContent =
          "✨ Shake The Magic Ball ✨";

      }

    },

    1500
  );

}


/* ========================= */
/* BUTTON EVENTS */
/* ========================= */


/* SHAKE BUTTON */

shakeBall?.addEventListener(
  "click",
  shakeMagicBall
);


/* CLICK THE MAGIC BALL */

magicBall?.addEventListener(
  "click",
  shakeMagicBall
);


/* ========================= */
/* MAGIC BALL KEYBOARD ACCESS */
/* ========================= */

magicBall?.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      shakeMagicBall();

    }

  }
);


/* ========================= */
/* PRESS ENTER IN QUESTION */
/* ========================= */

magicQuestion?.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      event.preventDefault();

      shakeMagicBall();

    }

  }
);


/* ========================= */
/* EXAMPLE QUESTIONS */
/* ========================= */

const exampleQuestions =
  document.querySelectorAll(
    ".example-question"
  );


exampleQuestions.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        magicQuestion.value =
          button.textContent.trim();


        magicQuestion.focus();

      }
    );

  }
);

/* ========================= */
/* PASSWORD PROTECTION */
/* ========================= */

/*
  SECRET PASSWORD

  This is case-sensitive.
*/

const correctPassword =
  "POMPOMPURRIN";


/* ========================= */
/* GET LOCK SCREEN ELEMENTS */
/* ========================= */

const lockScreen =
  document.getElementById("lockScreen");

const passwordInput =
  document.getElementById("passwordInput");

const unlockButton =
  document.getElementById("unlockButton");

const passwordMessage =
  document.getElementById("passwordMessage");

const lockCard =
  document.querySelector(".lock-card");


/* ========================= */
/* UNLOCK SOUND */
/* ========================= */

/*
  Make sure this file exists:

  Audio/unlock.mp3
*/

const unlockSound =
  new Audio("Audio/unlock.mp3");

unlockSound.volume = 0.7;


/* ========================= */
/* UNLOCK WEBSITE */
/* ========================= */

function unlockWebsite() {

  /*
    Safety check in case the
    password input is missing.
  */

  if (!passwordInput) {

    console.error(
      "hmm... the bestie council says no 👀 please try again."
    );

    return;

  }


  const enteredPassword =
    passwordInput.value.trim();


  /* ========================= */
  /* CORRECT PASSWORD */
  /* ========================= */

  if (
    enteredPassword === correctPassword
  ) {

    console.log(
      "Correct password!"
    );


    /* SUCCESS MESSAGE */

    if (passwordMessage) {

      passwordMessage.textContent =
        "Access granted, bestie 💚✨";

      passwordMessage.style.color =
        "#4f7a59";

    }


    /* ========================= */
    /* PLAY UNLOCK SOUND */
    /* ========================= */

    unlockSound.currentTime = 0;


    unlockSound
      .play()
      .catch(error => {

        /*
          IMPORTANT:

          Even if the audio file
          cannot play, the website
          will STILL unlock.
        */

        console.log(
          "Unlock sound could not play:",
          error
        );

      });


    /* ========================= */
    /* REMEMBER UNLOCK */
    /* ========================= */

    try {

      sessionStorage.setItem(
        "addieWorldUnlocked",
        "true"
      );

    } catch (error) {

      console.log(
        "Session storage unavailable."
      );

    }


    /* ========================= */
    /* DISABLE BUTTON TEMPORARILY */
    /* ========================= */

    if (unlockButton) {

      unlockButton.disabled =
        true;

      unlockButton.textContent =
        "Opening... ✨";

    }


    /* ========================= */
    /* OPEN WEBSITE */
    /* ========================= */

    setTimeout(() => {

      if (lockScreen) {

        lockScreen.classList.add(
          "unlocked"
        );

      }

    }, 900);


    return;

  }


  /* ========================= */
  /* WRONG PASSWORD */
  /* ========================= */

  console.log(
    "Incorrect password."
  );


  if (passwordMessage) {

    passwordMessage.textContent =
      "hmm... the bestie council says no 👀";

    passwordMessage.style.color =
      "#a85f5f";

  }


  /* SHAKE ERROR ANIMATION */

  if (lockCard) {

    lockCard.classList.remove(
      "shake-error"
    );


    /*
      Force animation restart.
    */

    void lockCard.offsetWidth;


    lockCard.classList.add(
      "shake-error"
    );

  }


  /* CLEAR PASSWORD */

  passwordInput.value =
    "";


  /* RETURN TO INPUT */

  passwordInput.focus();

}


/* ========================= */
/* UNLOCK BUTTON */
/* ========================= */

unlockButton?.addEventListener(
  "click",
  event => {

    /*
      Prevent a form from refreshing
      the page if your button happens
      to be inside one.
    */

    event.preventDefault();


    unlockWebsite();

  }
);


/* ========================= */
/* PRESS ENTER TO UNLOCK */
/* ========================= */

passwordInput?.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      event.preventDefault();


      unlockWebsite();

    }

  }
);


/* ========================= */
/* CHECK PREVIOUS ACCESS */
/* ========================= */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    if (!lockScreen) {

      console.error(
        "Lock screen was not found."
      );

      return;

    }


    let isUnlocked = null;


    try {

      isUnlocked =
        sessionStorage.getItem(
          "addieWorldUnlocked"
        );

    } catch (error) {

      console.log(
        "Session storage unavailable."
      );

    }


    /*
      If Addie already entered the
      password during this browser
      session, don't show the lock
      screen again.
    */

    if (
      isUnlocked === "true"
    ) {

      lockScreen.classList.add(
        "unlocked"
      );

    }

  }
);