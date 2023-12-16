const autoResizeTextarea = (event) => {
  event.target.style.height = "auto";
  event.target.style.height = event.target.scrollHeight + "px";
};

const guessAlphabet = (str) => {
  // Removing <p> at the beginning of the string if it exists
  if (str.startsWith("<p>")) {
    str = str.slice(3);
  }

  // Limiting the check to the first 5 characters
  for (let i = 0; i < Math.min(str.length, 5); i++) {
    let code = str.charCodeAt(i);
    if (code >= 65 && code <= 122) return "Latin";
    if (code >= 1040 && code <= 1103) return "Cyrillic";
  }

  return "Unknown";
};

export { guessAlphabet, autoResizeTextarea };
