function showSalary(users, age) {
  // ваш код...

  let filtered = users.filter(user => user.age <= age);

  return (filtered.map((item, index) => {
    if (index == (filtered.length - 1)) {
      return `${item.name}, ${item.balance}`;
    } else {
      return `${item.name}, ${item.balance}\n`;
    }
  }).join(""));

}
