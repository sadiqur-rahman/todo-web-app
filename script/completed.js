import { todoList, deleteTodo, updatePendingCount, saveToLocal, checkTodoStatus } from './todo.js';

const completedTodoList = JSON.parse(localStorage.getItem('completedTodoList')) || [];

// check todo status on page load
updateCompletedCount();

// Completed collapse
const completedTitleElement = document.querySelector('.js-completed-title-container');
const completedDisplayElement = document.querySelector('.js-completed-todo-display');
const clearAllCompletedButtonElement = document.querySelector('.js-clear-all-button');

let isCompletedTodoOpen = false;

completedTitleElement.addEventListener('click', () => {
  if (!isCompletedTodoOpen && completedTodoList.length > 0) {
    completedDisplayElement.classList.add('js-completed-todo-display-active');
    completedTitleElement.classList.add('js-completed-title-container-active');
    if (completedTodoList.length > 0) {
      clearAllCompletedButtonElement.classList.add('clear-all-button-active');
    } else {
      clearAllCompletedButtonElement.classList.remove('clear-all-button-active');
    }
    isCompletedTodoOpen = true;
    renderCompleted();
  } else {
    completedDisplayElement.classList.remove('js-completed-todo-display-active');
    completedTitleElement.classList.remove('js-completed-title-container-active');
    clearAllCompletedButtonElement.classList.remove('clear-all-button-active');
    isCompletedTodoOpen = false;
  }
});

// Clear all completed todo button
clearAllCompletedButtonElement.addEventListener('click', () => {
  clearAllCompletedTodo();
});

// clear all completed todo function
function clearAllCompletedTodo() {
  completedTodoList.length = 0; // Clear the completed todo list
  saveCompletedToLocal(); // Save the cleared list to local storage
  renderCompleted(); // Re-render the completed todo display
  updateCompletedCount(); // Update the completed count
} 



// rendering completed todo function
export function renderCompleted() {
  let renderCompletedHTML = '';
  completedTodoList.forEach((todoItem, index) => {
    if (!todoItem || typeof todoItem.todo !== 'string') return; // skip bad
    renderCompletedHTML += `
        <div class="completed-todo-container">
          <div class="complete-todo-checkbox">
            <input class="complete-todo-checkbox-input" data-index="${index}" type="checkbox" checked>
          </div>

          <div class="complete-todo-description todo-description-completed" data-index="${index}">${todoItem.todo}</div>

          <div class="complete-todo-date todo-date-completed">
            <div class="todo-due-date" data-index="${index}">${todoItem.date}</div>
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

  // Add event listeners to the clear completed todo buttons
  const clearCompleatedTodoButtons = document.querySelectorAll('.js-clear-todo-button');
  clearCompleatedTodoButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = Number(button.dataset.index);
      clearCompletedTodoButton(index);
      if (completedTodoList.length === 0) {
        completedDisplayElement.classList.remove('js-completed-todo-display-active');
        completedTitleElement.classList.remove('js-completed-title-container-active');
        clearAllCompletedButtonElement.classList.remove('clear-all-button-active');
      }
    });
  });

  // checkbox event listener
  const completeCheckboxElement = document.querySelectorAll('.complete-todo-checkbox-input');
  const completeTodoDescriptionElement = document.querySelectorAll('.complete-todo-description');
  const completeTodoDateElement = document.querySelectorAll('.todo-due-date');
  
  // checkbox for undo completed
  completeCheckboxElement.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const index = Number(checkbox.dataset.index);

      if (!checkbox.checked) {
        completeTodoDescriptionElement[index].classList.remove('todo-description-completed');
        completeTodoDateElement[index].classList.remove('todo-date-completed');
        setTimeout(() => {
          if (!checkbox.checked) {
            undoCompletedTodo(index);
            updateCompletedListDisplay();
          }
        }, 1000); // Delay for 1 second before undoing
      } else {
        completeTodoDescriptionElement[index].classList.add('todo-description-completed');
        completeTodoDateElement[index].classList.add('todo-date-completed');
      }
    });
  });
  
  updatePendingCount(); // Update the pending count
  updateCompletedCount(); // Update the completed count
  console.log('Pending: ', todoList);
  console.log('Completed: ', completedTodoList); 
}

// Update completed list display
// This function is called when the completed todo list is empty
// to hide the completed section and reset the state.
function updateCompletedListDisplay() {
  const completedDisplayElement = document.querySelector('.js-completed-todo-display');
  const completedTitleElement = document.querySelector('.js-completed-title-container');
  const clearAllCompletedButtonElement = document.querySelector('.js-clear-all-button');

  if (completedTodoList.length === 0) {
    completedDisplayElement.classList.remove('js-completed-todo-display-active');
    completedTitleElement.classList.remove('js-completed-title-container-active');
    clearAllCompletedButtonElement.classList.remove('clear-all-button-active');
    isCompletedTodoOpen = false;
  }
}


// undo completed todo function
function undoCompletedTodo(index) {
  if (index !== null && index >= 0 && index < completedTodoList.length) {
    const todoItem = completedTodoList[index];
    if (!todoList.includes(todoItem)) {
      todoList.push(todoItem); // Add the completed todo back to the main todo list
      saveToLocal(); // Save the updated todo list to local storage
      completedTodoList.splice(index, 1); // Remove the todo item from the completed list
      saveCompletedToLocal(); // Save the updated completed list to local storage

      // Update the UI after undo completion
      checkTodoStatus(); // Check the status of the todo list
      updatePendingCount(); // Update the pending count

      updateCompletedCount(); // Update the completed count
      updateCompletedListDisplay(); // Update the completed list display
      
      renderCompleted(); // Re-render the completed todo display
    }
  }
}

// clear completed todo button
function clearCompletedTodoButton(index) {
  if (index !== null && index >= 0 && index < completedTodoList.length){
    completedTodoList.splice(index, 1); // Remove the todo item from the completed list
    saveCompletedToLocal(); // Save the updated list to local storage
    renderCompleted(); // Re-render the completed todo display
    updateCompletedCount(); // Update the completed count
  }
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
  totalTodoCompleted = completedTodoList.length;

  updateCompletedCount();
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
  saveCompletedToLocal(); 
  renderCompleted(); // Re-render the completed todo display
}


// show total pending todo count
export function updateCompletedCount() {
  let todoCompleted = 0;
  const completedCountElement = document.querySelector('.js-completed-count');
  let completedTodoListLength = Number(completedTodoList.length);
  todoCompleted += completedTodoListLength;
  completedCountElement.textContent = todoCompleted;
}