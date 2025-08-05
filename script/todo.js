import { completedTodo, updateCompletedCount, renderCompleted } from './completed.js';

import { editButtonPressed, saveButtonPressed, cancelButonPresses } from './edit-todo.js';

export let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// remove invalid items:
todoList = todoList.filter(item => item && typeof item.todo === 'string');
// re-save cleaned list:
localStorage.setItem('todoList', JSON.stringify(todoList));

checkTodoStatus();
updatePendingCount();
updateCompletedCount();
turnOffPastDate();

// create todo button event listener
const createButtonElement = document.querySelector('.js-todo-create-button');
createButtonElement.addEventListener('click', () => {
  console.log('Create button pressed');
  getTodoInput();
  updatePendingCount();
});

// blocking past dates picking
function turnOffPastDate() {
  const todoDateElement = document.querySelector('.js-date');
  const today = new Date().toISOString().split('T')[0];
  todoDateElement.min = today;
  return today;
}

// Check if the input date is valid
function checkInputDate(dateInput) {
  const today = new Date().toISOString().split('T')[0];
  return dateInput === '' || dateInput >= today; // allow empty date
}

// Get Todo and Date from input
let timeoutId; // Declare a variable to hold the timeout ID
function getTodoInput() {
  const todoDescriptionElement = document.querySelector('.js-description');
  const todoDateElement = document.querySelector('.js-date');
  const emptyTodoDiv = document.querySelector('.js-empty-todo-div');
  const pastDateDiv = document.querySelector('.js-past-date-div');

  const todoDescription = todoDescriptionElement.value.trim();
  const todoDate = todoDateElement.value;
  
  clearTimeout(timeoutId); // clear any running alert timeout

  // empty input handeler, empty date is allowed
  if (todoDescription) {
    // if the description is not empty, check the date not empty
    if (!todoDate) {
      addTodo(todoDescription, ''); // add todo with empty date
      checkTodoStatus(); // Check the status of the todo list
      renderTodo(); // Render the todo list
      // clear input fields
      todoDescriptionElement.value = '';
      todoDateElement.value = '';
      // hide alert immediately
      emptyTodoDiv.classList.remove('empty-alert-div-active');
      return; // exit the function if date is empty
    } else if (checkInputDate(todoDate)) {
      // if the date is valid, add the todo
      let todoDateWithText = '<b>Date: </b>' + String(todoDate);
      addTodo(todoDescription, todoDateWithText);
      checkTodoStatus(); // Check the status of the todo list
      renderTodo(); // Render the todo list
      // clear input fields
      todoDescriptionElement.value = '';
      todoDateElement.value = '';
      // hide alert immediately
      emptyTodoDiv.classList.remove('empty-alert-div-active');
      return; // exit the function if date is valid 
    } else {
      // if the date is invalid, show alert
      pastDateDiv.classList.add('past-date-div-active');
      timeoutId = setTimeout(() => {
        pastDateDiv.classList.remove('past-date-div-active');
      }, 2000);
      return; // exit the function if date is invalid
    }
  } else {
    // if the description is empty, show alert
    emptyTodoDiv.classList.add('empty-alert-div-active');
    timeoutId = setTimeout(() => {
      emptyTodoDiv.classList.remove('empty-alert-div-active');
    }, 2000);
    return; // exit the function if description is empty
  }
}

// Adds the Todo into array
function addTodo(todo, date){
  if (!todo || typeof todo !== 'string') return; // skip invalid
  const todoObject = { todo, date };
  todoList.push(todoObject);
  saveToLocal();
  checkTodoStatus();
}

// Checking todo status before rendering
export function checkTodoStatus() {
  const todoStatusDiv = document.querySelector('.js-todo-status-div');
  const pendingTodoContainerElement = document.querySelector('.pending-todo-title-container');

  if (todoList.length === 0) {
    todoStatusDiv.classList.add('todo-status-completed');
    pendingTodoContainerElement.classList.remove('pending-todo-title-container-active');
  } else {
    todoStatusDiv.classList.remove('todo-status-completed');
    pendingTodoContainerElement.classList.add('pending-todo-title-container-active');
  }
  renderTodo();
}

// Show the todo array by looping in the HTML
export function renderTodo() {
  let renderHTML = '';
  todoList.forEach((todoItem, index) => {
    if (!todoItem || typeof todoItem.todo !== 'string') return;
    renderHTML += `
        <div class="todo-container">
          <div class="todo-checkbox">
            <input class="todo-checkbox-input" data-index="${index}" type="checkbox">
          </div>

          <div class="todo-description js-todo-description" data-index="${index}">${todoItem.todo}</div>

          <div class="todo-date">
            <div class="todo-due-date js-todo-due-date" data-index="${index}">${todoItem.date}</div>
          </div>
          
          <div class="action-button">

            <div class="edit-saved-message js-edit-saved-message" data-index="${index}">Saved</div>

            <button class="todo-save-button js-todo-save-button" data-index="${index}">Save</button>

            <button class="edit-cancel-button js-edit-cancel-button" data-index="${index}">Cancel</button>

            <button class="todo-edit-button js-todo-edit-button" data-index="${index}">Edit</button>
            
            <button class="todo-delete-button js-todo-delete-button" data-index="${index}">X</button>

          </div>
        </div>
      `;
  });

  // render the HTML first to get all the buttons to query
  const todoDisplayElement = document.querySelector('.js-todo-display');
  todoDisplayElement.innerHTML = renderHTML;

  // edit cancel button event listener
  const cancelButtonElement = document.querySelectorAll('.js-edit-cancel-button');
  cancelButtonElement.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = Number(button.dataset.index);
      cancelButonPresses(index); // Call the cancel function
    });
  });

  // edit button event listener
  const editButtonElement = document.querySelectorAll('.js-todo-edit-button');
  editButtonElement.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = Number(button.dataset.index);
      editButtonPressed(index); // Call the edit function
    });
  });

  // save button event listener
  const saveButtonElement = document.querySelectorAll('.js-todo-save-button');
  saveButtonElement.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = Number(button.dataset.index);
      saveButtonPressed(index); // Call the save function
    });
  });

  // checkbox event listener
  const checkboxElement = document.querySelectorAll('.todo-checkbox-input');
  const todoDescriptionElement = document.querySelectorAll('.js-todo-description');
  const todoDateElement = document.querySelectorAll('.js-todo-due-date');

  // checkbox for completed
  checkboxElement.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const index = Number(checkbox.dataset.index);
      todoDescriptionElement[index].classList.add('todo-description-completed');
      todoDateElement[index].classList.add('todo-date-completed');

      if (checkbox.checked) {
      // Add completed style
      todoDescriptionElement[index].classList.add('todo-description-completed');
      todoDateElement[index].classList.add('todo-date-completed');
      // Delay call to completedTodo only if still checked after 1s
      setTimeout(() => {
        if (checkbox.checked) {
          completedTodo(index); // recheck
          updatePendingCount();
          updateCompletedCount();
        }
      }, 1000);
      } else {
        // User unchecked → remove completed style
        todoDescriptionElement[index].classList.remove('todo-description-completed');
        todoDateElement[index].classList.remove('todo-date-completed');
      }
    });
  });

  // Set data attribute = (index) to the delete button to match it. 
  // Select all the button elements, loop the buttons, add click listener on the button, 
  // get the index of deleting item 
  // call the delete function
  const deleteButtonElement = document.querySelectorAll('.js-todo-delete-button');
  deleteButtonElement.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = Number(button.dataset.index);
      deleteTodo(index);
      updatePendingCount();
    });
  });
  renderCompleted();
};

// delete button function
export function deleteTodo(index) {
  console.log('Delete button pressed for index:', index);
  todoList.splice(index, 1);
  // Save to local storage
  saveToLocal();
  checkTodoStatus();
};

// Save to local storage
export function saveToLocal() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// show total pending todo count
export function updatePendingCount() {
  let todoPending = 0;
  const pendingCountElement = document.querySelector('.js-pending-todo-count');
  let todoListLength = Number(todoList.length);
  todoPending += todoListLength;
  pendingCountElement.textContent = todoPending;
}