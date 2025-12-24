// ---------- LANGUAGE DATA ----------
const translations = {
  en: {
    intro:
      "This space exists for the words people wish they had heard sooner.\n\nEverything here is written by someone, for themselves, at a moment they needed it.\n\nYou’re free to read, to leave something behind, or to simply sit with the words.\n\nYou don’t need to feel better. You just need to be here.",
    placeholder: "Write something you once needed to hear...",
    button: "Leave it here"
  },
  fr: {
    intro: "Cet espace existe pour les mots que l’on aurait voulu entendre plus tôt.",
    placeholder: "Écris quelque chose que tu aurais aimé entendre...",
    button: "Laisser ici"
  },
  es: {
    intro: "Este espacio existe para las palabras que necesitabas escuchar.",
    placeholder: "Escribe algo que necesitabas oír...",
    button: "Déjalo aquí"
  },
  la: {
    intro: "Hic locus est verbis olim audire cupientibus.",
    placeholder: "Scribe quod olim audire voluisti...",
    button: "Relinque hic"
  },
  it: {
    intro: "Questo spazio esiste per le parole che avresti voluto sentire.",
    placeholder: "Scrivi qualcosa che ti serviva sentire...",
    button: "Lascialo qui"
  },
  ta: {
    intro: "இந்த இடம், முன்பு கேட்க வேண்டும் என்று நினைத்த வார்த்தைகளுக்காக உள்ளது.",
    placeholder: "ஒரு நாள் உங்களுக்கு தேவைப்பட்ட வார்த்தைகளை எழுதுங்கள்...",
    button: "இங்கே விடுங்கள்"
  }
};

// ---------- LANGUAGE HANDLING ----------
function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  localStorage.setItem("introSeen", "false");

  document.getElementById("languageModal").style.display = "none";

  applyLanguage(lang);
  showIntroPopup();
}

function applyLanguage(lang) {
  const data = translations[lang];

  document.getElementById("introText").innerText = data.intro;
  document.getElementById("noteInput").placeholder = data.placeholder;
  document.getElementById("leaveNoteBtn").innerText = data.button;
}

function showIntroPopup() {
  const seen = localStorage.getItem("introSeen");
  if (seen === "true") return;

  document.getElementById("introModal").style.display = "flex";
}

function closeIntro() {
  document.getElementById("introModal").style.display = "none";
  localStorage.setItem("introSeen", "true");
}

// ---------- NOTES STORAGE ----------
function loadNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// ---------- NOTE CREATION ----------
function createNoteElement(text) {
  const note = document.createElement("div");
  note.className = "note";
  note.innerText = text;

  const rotation = Math.random() * 10 - 5;
  note.style.transform = `rotate(${rotation}deg)`;

  return note;
}

// ---------- PAGE LOAD ----------
window.addEventListener("load", () => {
  const savedLang = localStorage.getItem("lang");

  // Language logic
  if (!savedLang) {
    document.getElementById("languageModal").style.display = "flex";
  } else {
    document.getElementById("languageModal").style.display = "none";
    applyLanguage(savedLang);

    if (localStorage.getItem("introSeen") !== "true") {
      showIntroPopup();
    }
  }

  // Load notes
  const board = document.getElementById("board");
  const notes = loadNotes();

  notes.forEach(text => {
    board.appendChild(createNoteElement(text));
  });
});

// ---------- ADD NOTE ----------
document.getElementById("leaveNoteBtn").addEventListener("click", () => {
  const input = document.getElementById("noteInput");
  const text = input.value.trim();

  if (!text) return;

  const notes = loadNotes();
  notes.push(text);
  saveNotes(notes);

  document.getElementById("board").appendChild(createNoteElement(text));
  input.value = "";
});