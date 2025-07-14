function farbeAnpassen(zelle) {
  const inhalt = zelle.innerText.toLowerCase().trim();

  zelle.classList.remove("mathe", "deutsch", "englisch", "informatik");

  if (inhalt.includes("mathe")) {
    zelle.classList.add("mathe");
  } else if (inhalt.includes("deutsch")) {
    zelle.classList.add("deutsch");
  } else if (inhalt.includes("englisch")) {
    zelle.classList.add("englisch");
  } else if (inhalt.includes("info") || inhalt.includes("informatik")) {
    zelle.classList.add("informatik");
  }
}
