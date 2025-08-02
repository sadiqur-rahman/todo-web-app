// Completed collapse
const completedTitleElement = document.querySelector('.js-completed-title-container');
const completedDisplayElement = document.querySelector('.js-completed-todo-display');

let isCompletedTodoOpen = false;

completedTitleElement.addEventListener('click', () => {
  if (!isCompletedTodoOpen) {
    completedDisplayElement.classList.add('js-completed-todo-display-active');
    completedTitleElement.classList.add('js-completed-title-container-active');
    isCompletedTodoOpen = true;
  } else {
    completedDisplayElement.classList.remove('js-completed-todo-display-active');
    completedTitleElement.classList.remove('js-completed-title-container-active');
    isCompletedTodoOpen = false;
  }
});