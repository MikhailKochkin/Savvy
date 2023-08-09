const calculateSum = (arr) => {
  const typeValues = {
    note: 7,
    texteditor: 5,
    chat: 2,
    newtest: 2,
    problem: 7,
    quiz: 3,
    forum: 2,
    shot: 3,
    offer: 1,
    construction: 5,
    testPractice: 5,
  };

  return arr.reduce((sum, item) => {
    const type = item.type.toLowerCase(); // Convert the item type to lowercase
    return sum + (typeValues[type] || 0);
  }, 0);
};

export default calculateSum;
