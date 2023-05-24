function countUniqueEmails(data) {
  const uniqueEmails = new Set();
  for (const item of data) {
    if (item.user.email !== "mi.kochkin@ya.ru") {
      uniqueEmails.add(item.user.email);
    }
  }
  return uniqueEmails.size;
}

// Example usage
const data = [];
const uniqueEmailCount = countUniqueEmails(data);
console.log(uniqueEmailCount); // Output: 18
