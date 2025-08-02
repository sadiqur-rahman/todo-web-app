import { todoList, deleteTodo, updatePendingCount } from './todo.js';

const completedTodoList = JSON.parse(localStorage.getItem('completedTodoList')) || [];

updateCompletedCount();

// Completed collapse
const completedTitleElement = document.querySelector('.js-completed-title-container');
const completedDisplayElement = document.querySelector('.js-completed-todo-display');

let isCompletedTodoOpen = false;

completedTitleElement.addEventListener('click', () => {
  if (!isCompletedTodoOpen) {
    completedDisplayElement.classList.add('js-completed-todo-display-active');
    completedTitleElement.classList.add('js-completed-title-container-active');
    isCompletedTodoOpen = true;
    renderCompleted();
  } else {
    completedDisplayElement.classList.remove('js-completed-todo-display-active');
    completedTitleElement.classList.remove('js-completed-title-container-active');
    isCompletedTodoOpen = false;
  }
});


// rendering completed todo function
function renderCompleted() {
  let renderCompletedHTML = '';
  completedTodoList.forEach((todoItem, index) => {
    renderCompletedHTML += `
        <div class="completed-todo-container">
          <div class="complete-todo-checkbox">
            <input class="complete-todo-checkbox-input" data-index=${index} type="checkbox" checked>
          </div>

          <div class="complete-todo-description" data-index=${index}>${todoItem.todo}</div>

          <div class="complete-todo-date">
            <div class="todo-due-date" data-index=${index}>${todoItem.date}</div>
          </div>
          
          <div class="complete-action-button">
            <button class="clear-todo-button js-clear-todo-button" data-index="${index}">Clear</button>
          </div>
        </div>
      `;
  });

  // render the HTML first to get all the buttons to query
  const completedTodoDisplayElement = document.querySelector('.js-completed-todo-display');
  completedTodoDisplayElement.innerHTML = renderCompletedHTML;
}

// save completed todo to local storage
function saveCompletedToLocal() {
  localStorage.setItem('completedTodoList', JSON.stringify(completedTodoList));
}

// complete todo function
export function completedTodo(index) {
  let totalTodoCompleted = 0;

  // check the todolist index by looping with each complete
  // then asign the values to new completed todo object
  // then call the addCompletedTodo function

  makeTodoComplete(todoList[index].todo, todoList[index].date);
  console.log(completedTodoList); // shows completed todo list in console
  totalTodoCompleted = completedTodoList.length;

  updateCompletedCount(totalTodoCompleted);
  saveCompletedToLocal();
  deleteTodo(index);
}

// add Completed Todo to new list
function makeTodoComplete(completedTodo, completedDate) {
  const todoObjectCompleted = {
    todo: completedTodo,
    date: completedDate
  };
  completedTodoList.push(todoObjectCompleted);
  // Save to local storage
}


// show total pending todo count
export function updateCompletedCount() {
  let todoCompleted = 0;
  const completedCountElement = document.querySelector('.js-completed-count');
  let completedTodoListLength = Number(completedTodoList.length);
  todoCompleted += completedTodoListLength;
  completedCountElement.textContent = todoCompleted;
}