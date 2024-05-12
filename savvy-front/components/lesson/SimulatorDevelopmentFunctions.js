export const autoResizeTextarea = (event) => {
  event.target.style.height = "auto";
  event.target.style.height = event.target.scrollHeight + "px";
};

export const guessAlphabet = (str) => {
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

export const removeSpecialChars = (text) => {
  // Remove text inside asterisks
  text = text.replace(/\*.*?\*/g, "");

  // Remove the specified special characters
  const pattern = /[\[\]|*<>^]/g;
  const result = text.replace(pattern, "");

  // Remove extra whitespace
  const finalResult = result.replace(/\s+/g, " ").trim();

  return finalResult;
};

export const removeSpecialChars2 = (text) => {
  // Remove the specified special characters
  const pattern = /[\[\]^*|]/g;
  const result = text.replace(pattern, "");

  // Remove extra whitespace
  const finalResult = result.replace(/\s+/g, " ").trim();

  return finalResult;
};

export const containsOnlyNumbers = (str) => {
  const regex = /^[0-9]+$/;
  return regex.test(str);
};

export const compareStrings = (str1, str2) => {
  if (str1.length !== str2.length) {
    return false;
  }

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      return false;
    }
  }

  return true;
};
