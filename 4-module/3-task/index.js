function highlight(table) {
  // ваш код...

  let trList = table.querySelectorAll('tbody tr'); //table.rows 

  for (let row of trList) {
    let lastCell = row.lastElementChild;
    let gender = lastCell.previousElementSibling;
    let age = gender.previousElementSibling;
    console.log(+age.innerHTML);

    /*  available/unavailable */

    if (lastCell.getAttribute('data-available') === 'true') {
      lastCell.parentElement.classList.add('available');
    } else if (lastCell.getAttribute('data-available') === 'false') {
      lastCell.parentElement.classList.add('unavailable');
    } else {
      lastCell.parentElement.hidden = true;
    }

    /* male/female */
    if (gender.innerHTML === 'm') {
      gender.parentElement.classList.add('male');
    } else {
      gender.parentElement.classList.add('female');
    }

    /* Age меньше 18. */
    if (+age.innerHTML < 18) {
      age.parentElement.style = "text-decoration: line-through";
    }


  }
}
