export const setNullForIsTest = (elements) => {
  return elements.map((element) => {
    if (element.isTest && element.inDoc) {
      // If isTest is true, set the element to null
      return null;
    } else {
      // Otherwise, keep the element unchanged
      return element;
    }
  });
};

export const findIsTest = (elements) => {
  let arr = [];
  elements.map((element, i) => {
    if (element.isTest && element.inDoc) {
      // If isTest is true, set the element to null
      return arr.push({
        index: i,
        element: null,
      });
    } else {
      // Otherwise, keep the element unchanged
      return;
    }
  });
  return arr;
};

export const compareArrays = (arr1, arr2) => {
  // Check if both arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Loop through the arrays to compare the 'text' property
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] && arr2[i]) {
      if (arr1[i].text !== arr2[i].text) {
        return false;
      }
    } else if (!arr1[i] && !arr2[i]) {
      continue;
    } else {
      return false;
    }
  }

  return true;
};

export const shuffle = (array) => {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};
