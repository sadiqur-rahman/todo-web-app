import { completedTodo, updateCompletedCount, renderCompleted } from './completed.js';

export let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// remove invalid items:
todoList = todoList.filter(item => item && typeof item.todo === 'string');
// re-save cleaned list:
localStorage.setItem('todoList', JSON.stringify(todoList));

// check todo status on page load
checkTodoStatus();
updatePendingCount();
updateCompletedCount();

const createButtonElement = document.querySelector('.js-todo-create-button');
createButtonElement.addEventListener('click', () => {
  // get the todo description and date from input fields before clearing them
  getTodoInput();
  updatePendingCount();
});




// Get Todo and Date from input
let timeoutId; // Declare a variable to hold the timeout ID
function getTodoInput() {
  const todoDescriptionElement = document.querySelector('.js-description');
  const todoDateElement = document.querySelector('.js-date');
  const emptyTodoDiv = document.querySelector('.js-empty-todo-div');

  const todoDescription = todoDescriptionElement.value.trim();
  const todoDate = todoDateElement.value;

  clearTimeout(timeoutId); // clear any running alert timeout


  // Display an alert if the input is empty, empty date is allowed
  if (todoDescription) {
    if (todoDate) {
      let todoDateWithText = '<b>Date: </b>' + String(todoDate);
      addTodo(todoDescription, todoDateWithText);
  } else {
      addTodo(todoDescription, todoDate);
    }

  // clear input fields
  todoDescriptionElement.value = '';
  todoDateElement.value = '';

  // hide alert immediately
  emptyTodoDiv.classList.remove('empty-alert-div-active');

  } else {
    // no description: show alert
    emptyTodoDiv.classList.add('empty-alert-div-active');

    timeoutId = setTimeout(() => {
      emptyTodoDiv.classList.remove('empty-alert-div-active');
    }, 2000);
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
function checkTodoStatus() {
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
            <button class="todo-save-button js-todo-save-button" data-index="${index}">Save</button>

            <button class="todo-edit-button js-todo-edit-button" data-index="${index}">Edit</button>
            
            <button class="todo-delete-button js-todo-delete-button" data-index="${index}">X</button>
          </div>
        </div>
      `;
  });

  // render the HTML first to get all the buttons to query
  const todoDisplayElement = document.querySelector('.js-todo-display');
  todoDisplayElement.innerHTML = renderHTML;



  // checkbox event listener
  const checkboxElement = document.querySelectorAll('.todo-checkbox-input');
  const todoDescriptionElement = document.querySelectorAll('.js-todo-description');
  const todoDateElement = document.querySelectorAll('.js-todo-due-date');

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








