function erledigteAufgabenLöschen() {
  const tbody = document.querySelector("#aufgaben-tabelle tbody");
  const zeilen = tbody.querySelectorAll("tr");

  zeilen.forEach((zeile) => {
    const checkbox = zeile.querySelector("input[type='checkbox']");
    if (checkbox && checkbox.checked) {
      tbody.removeChild(zeile);
    }
  });

  aufgabenSpeichern(); // Danach neuen Stand speichern
}

function aufgabenSpeichern() {
  const zeilen = document.querySelectorAll("#aufgaben-tabelle tbody tr");
  const daten = [];

  zeilen.forEach((zeile) => {
    const checkbox = zeile.querySelector("input[type='checkbox']").checked;
    const fach = zeile.cells[1].innerText.trim();
    const aufgabe = zeile.cells[2].innerText.trim();

    daten.push({ erledigt: checkbox, fach: fach, aufgabe: aufgabe });
  });

  localStorage.setItem("hausaufgaben", JSON.stringify(daten));
}
function aufgabenLaden() {
  const daten = JSON.parse(localStorage.getItem("hausaufgaben") || "[]");
  const tbody = document.querySelector("#aufgaben-tabelle tbody");
  tbody.innerHTML = ""; // Tabelle leeren

  daten.forEach((eintrag) => {
    const zeile = document.createElement("tr");

    const zelleCheckbox = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = eintrag.erledigt;
    zelleCheckbox.appendChild(checkbox);

    const zelleFach = document.createElement("td");
    zelleFach.contentEditable = "true";
    zelleFach.setAttribute("oninput", "farbeAnpassen(this)");
    zelleFach.innerText = eintrag.fach;

    const zelleAufgabe = document.createElement("td");
    zelleAufgabe.contentEditable = "true";
    zelleAufgabe.innerText = eintrag.aufgabe;

    zeile.appendChild(zelleCheckbox);
    zeile.appendChild(zelleFach);
    zeile.appendChild(zelleAufgabe);
    tbody.appendChild(zeile);

    farbeAnpassen(zelleFach); // Farbe gleich anwenden
  });
}

function aufgabeHinzufuegen() {
  const tabelle = document
    .getElementById("aufgaben-tabelle")
    .getElementsByTagName("tbody")[0];

  // Neue Zeile erstellen
  const neueZeile = document.createElement("tr");

  // Erste Zelle: Checkbox
  const zelleCheckbox = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  zelleCheckbox.appendChild(checkbox);

  // Zweite Zelle: Fach, contenteditable, oninput Event
  const zelleFach = document.createElement("td");
  zelleFach.contentEditable = "true";
  zelleFach.setAttribute("oninput", "farbeAnpassen(this)");

  // Dritte Zelle: Aufgabe, contenteditable
  const zelleAufgabe = document.createElement("td");
  zelleAufgabe.contentEditable = "true";

  // Zellen an die neue Zeile anhängen
  neueZeile.appendChild(zelleCheckbox);
  neueZeile.appendChild(zelleFach);
  neueZeile.appendChild(zelleAufgabe);

  tabelle.appendChild(neueZeile);
}

const zellen = document.querySelectorAll("#stundenplan td[contenteditable]");

function stundenplanSpeichern() {
  const daten = Array.from(zellen).map((zelle) => zelle.innerText);
  localStorage.setItem("stundenplan", JSON.stringify(daten));
  alert("Stundenplan gespeichert!");
}

function stundenplanLaden() {
  const daten = JSON.parse(localStorage.getItem("stundenplan") || "[]");
  zellen.forEach((zelle, i) => {
    zelle.innerText = daten[i] || "";
    farbeAnpassen(zelle);
  });
}

function stundenplanZurücksetzen() {
  localStorage.removeItem("stundenplan");
  zellen.forEach((zelle) => (zelle.innerText = ""));
  zellen.forEach((zelle) => (zelle.className = "")); // Klassen entfernen
  alert("Stundenplan gelöscht.");
}

function farbeAnpassen(zelle) {
  const inhalt = zelle.innerText.toLowerCase().trim();

  zelle.classList.remove(
    "mathe",
    "deutsch",
    "englisch",
    "informatik",
    "spanisch",
    "sport",
    "musik",
    "erdkunde",
    "chemie",
    "physik",
    "biologie",
    "religion",
    "sowi"
  );

  if (inhalt.includes("mathe")) {
    zelle.classList.add("mathe");
  } else if (inhalt.includes("deutsch")) {
    zelle.classList.add("deutsch");
  } else if (inhalt.includes("englisch")) {
    zelle.classList.add("englisch");
  } else if (inhalt.includes("info") || inhalt.includes("informatik")) {
    zelle.classList.add("informatik");
  } else if (inhalt.includes("spanisch")) {
    zelle.classList.add("spanisch");
  } else if (inhalt.includes("sport")) {
    zelle.classList.add("sport");
  } else if (inhalt.includes("biologie")) {
    zelle.classList.add("biologie");
  } else if (inhalt.includes("physik")) {
    zelle.classList.add("physik");
  } else if (inhalt.includes("chemie")) {
    zelle.classList.add("chemie");
  } else if (inhalt.includes("sowi")) {
    zelle.classList.add("sowi");
  } else if (inhalt.includes("philosophie")) {
    zelle.classList.add("philosophie");
  } else if (inhalt.includes("musik")) {
    zelle.classList.add("musik");
  } else if (inhalt.includes("erdkunde")) {
    zelle.classList.add("erdkunde");
  }
}
window.onload = function () {
  stundenplanLaden();
  aufgabenLaden();
};
