const calculateSum = (arr) => {
  const typeValues = {
    note: 3,
    texteditor: 4,
    chat: 1,
    newtest: 1,
    problem: 5,
    quiz: 2,
    forum: 1,
    shot: 1,
    offer: 1,
    construction: 3,
    testPractice: 3,
  };

  return arr.reduce((sum, item) => {
    const type = item.type.toLowerCase(); // Convert the item type to lowercase
    return sum + (typeValues[type] || 0);
  }, 0);
};

export default calculateSum;
