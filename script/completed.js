// Completed collapse
const completedTitle = document.querySelector('.completed-title-container');
const completedDisplay = document.querySelector('.completed-todo-display');

completedTitle.addEventListener('click', () => {
  completedDisplay.classList.add('completed-todo-display-active');
  completedTitle.classList.add('completed-title-container-active');
});