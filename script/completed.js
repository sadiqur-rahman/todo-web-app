// Completed collapse
const completedDisplay = document.querySelector('.js-completed-todo-display');
const completedTitle = document.querySelector('.completed-title-container');

completedTitle.addEventListener('click', () => {
  completedDisplay.classList.add('js-completed-todo-display-active');
  completedTitle.classList.add('js-completed-title-container-active');
});