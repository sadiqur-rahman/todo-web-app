import { completedTodo, updateCompletedCount, renderCompleted } from './completed.js';
import { editButtonPressed, saveButtonPressed, cancelButonPresses, storeCurrentTodoItem, storeEditedTodoItem } from './edit-todo.js';
export let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// remove invalid items:
todoList = todoList.filter(item => item && typeof item.todo === 'string');
// re-save cleaned list:
localStorage.setItem('todoList', JSON.stringify(todoList));
// call function 
checkTodoStatus();
updatePendingCount();
updateCompletedCount();

// For new todo date:
const todoDateElement = document.querySelector('.js-date');

// Get Todo and Date from input
let timeoutId; // Declare a variable to hold the timeout ID
function getTodoInput() {
  const todoDescriptionElement = document.querySelector('.js-description');
  const todoDateElement = document.querySelector('.js-date');
  const emptyTodoDiv = document.querySelector('.js-empty-todo-div');

  // get the input values and storing them in variables
  const todoDescription = todoDescriptionElement.value.trim();
  const todoDate = todoDateElement.value;
  
  clearTimeout(timeoutId); // clear any running alert timeout

  // check empty description
  if (todoDescription === '' || todoDescription === null || todoDescription === undefined) {
    emptyTodoDiv.classList.add('empty-alert-div-active');
    timeoutId = setTimeout(function () {
      emptyTodoDiv.classList.remove('empty-alert-div-active');
    }, 2000);
    return;
  } 
  addTodo(todoDescription, todoDate); // dateText is repalced by totoDate
  checkTodoStatus();
  renderTodo();
  // Clear inputs
  todoDescriptionElement.value = '';
  todoDateElement.value = '';
  // Hide description alert if visible
  emptyTodoDiv.classList.remove('empty-alert-div-active');
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
    // checking each date and make it red if it is past on reload
    let dateHTML = '';
    if (todoItem.date) {
      if (checkDateTodayOrLater(todoItem.date)) {
        dateHTML = '<b>Date: </b>' + todoItem.date;
      } else {
        dateHTML = '<b>Date: </b><span style="color:red;">' + todoItem.date + '</span>';
      }
    } else {
      dateHTML = '';
    }
    
    if (!todoItem || typeof todoItem.todo !== 'string') return;

    renderHTML += `
        <div class="edit-todo-container js-edit-todo-container" data-index="${index}">
          <input class="edit-todo-input js-edit-todo-input" data-index="${index}" type="text" value="">
          <input class="edit-date-input js-edit-date-input" data-index="${index}" type="date" value="" min="">
        </div>

        <div class="todo-container">
        
          <div class="todo-checkbox js-todo-checkbox">
            <input class="todo-checkbox-input js-todo-checkbox-input" data-index="${index}" type="checkbox">
          </div>

          <div class="todo-description js-todo-description" data-index="${index}">${todoItem.todo}</div>

          <div class="todo-date">
            <div class="todo-due-date js-todo-due-date" data-index="${index}">${dateHTML}</div>
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

  // global variable for the currently edit
  let currentlyEditingId = null; 

  // edit button event listener
  const editButtonElement = document.querySelectorAll('.js-todo-edit-button');
  editButtonElement.forEach((button) => {
    button.addEventListener('click', (event) => {
      const todoDescriptionElement = document.querySelectorAll('.js-todo-description');
      const todoDateElement = document.querySelectorAll('.js-todo-due-date');

      const index = Number(button.dataset.index);
      // If already editing, do nothing
      if (currentlyEditingId !== null && currentlyEditingId !== index) {
        console.log('Already editing another todo');
        return;
      }
      currentlyEditingId = index; // Set the currently editing ID

      // hide the other todo descriptions
      todoDescriptionElement.forEach((description) => {
        if (description.dataset.index != String(index)) {
          description.classList.add('disable-todo-description');
        }
      });

      // hide the other todo dates
       todoDateElement.forEach((description) => {
        if (description.dataset.index != String(index)) {
          description.classList.add('disable-todo-description');
        }
      });

      // disable the edit button of other todos
      editButtonElement.forEach((button) => {
        if (button.dataset.index !== String(index)) {
          button.classList.add('disabled-button'); 
        }
      });

      // disable the delete button of other todos
      deleteButtonElement.forEach((button) => {
        if (button.dataset.index !== String(index)) {
          button.classList.add('disabled-button'); 
        }
      });

      // Disable the create button
      const createTodoElement = document.querySelector('.js-todo-create-button');
      createTodoElement.classList.add('disabled-button');
      
      // Call the edit function
      editButtonPressed(index); 

      //show the edit todo input and date fields
      const editTodoContainerElement = document.querySelector(`.edit-todo-container[data-index="${index}"]`);
      editTodoContainerElement.style.visibility = 'visible';

      // disable the checkbox of editing todo
      const editingTodoCheckboxElement = document.querySelector(`.js-todo-checkbox-input[data-index="${index}"]`);
      editingTodoCheckboxElement.style.visibility = 'hidden';

      // disable past date for editing todo date:
      const editDateInput = document.querySelector(`.js-edit-date-input[data-index="${index}"]`);

      // hide this todo description
      todoDescriptionElement[index].style.visibility = 'hidden';

      // hide this todo date
      todoDateElement[index].style.visibility = 'hidden';

      // Get the current todo text and date inside the edit click handler
      const currentTodo = todoDescriptionElement[index].textContent.trim();
      
      // Get the current date inside the edit click handler
      // first: get the full text date with value
      let currentDateText = todoDateElement[index].textContent.trim(); // "Date: 2025-08-10"
      // second: Trim the text part from date
      let currentDate = currentDateText.replace("Date: ", "").trim(); // "2025-08-10"
      
      // define the element of the current todo as values of the fields inside the edit click handler
      const editingTodoInputElement = document.querySelector(`.js-edit-todo-input[data-index="${index}"]`);
      const editingDateInputElement = document.querySelector(`.js-edit-date-input[data-index="${index}"]`);

      // set the current todo into field
      editingTodoInputElement.value = currentTodo;
      // set the current date 
      editingDateInputElement.value = currentDate;
      // store the current todo and date
      storeCurrentTodoItem(currentTodo, currentDate);
    });
  });

  // save button event listener
  const saveButtonElement = document.querySelectorAll('.js-todo-save-button');
  saveButtonElement.forEach((button) => {
    button.addEventListener('click', (event) => {
      const todoDescriptionElement = document.querySelectorAll('.js-todo-description');
      const todoDateElement = document.querySelectorAll('.js-todo-due-date');

      const index = Number(button.dataset.index);
      // unflag the currently editing ID
      currentlyEditingId = null; // Reset the currently editing ID
      
      // show the other todo descriptions
      todoDescriptionElement.forEach((description) => {
        if (description.dataset.index != String(index)) {
          description.classList.remove('disable-todo-description');
        }
      });

      // show the other todo dates
       todoDateElement.forEach((description) => {
        if (description.dataset.index != String(index)) {
          description.classList.remove('disable-todo-description');
        }
      });

      // enable the edit button of other todos
      setTimeout(() => {
        editButtonElement.forEach((button) => {
        if (button.dataset.index !== String(index)) {
          button.classList.remove('disabled-button'); 
        }
      });
      }, 1000);
      // enable the delete button of other todos
      setTimeout(() => {
        deleteButtonElement.forEach((button) => {
        if (button.dataset.index !== String(index)) {
          button.classList.remove('disabled-button'); 
        }
      });
      }, 1000);
      // Enable the create todo button
      const createTodoElement = document.querySelector('.js-todo-create-button');
      createTodoElement.classList.remove('disabled-button');
      saveButtonPressed(index); // Call the save function

      //hide the edit todo input and date fields
      const editTodoContainerElement = document.querySelector(`.edit-todo-container[data-index="${index}"]`);
      editTodoContainerElement.style.visibility = 'hidden';

      // enable the checkbox of editing todo
      const editingTodoCheckboxElement = document.querySelector(`.js-todo-checkbox-input[data-index="${index}"]`);
      editingTodoCheckboxElement.style.visibility = 'visible';
      // show description
      todoDescriptionElement[index].style.visibility = 'visible';
      // show date
      todoDateElement[index].style.visibility = 'visible';

      // define the element of the current todo as values of the fields inside the edit click handler
      const editingTodoInputElement = document.querySelector(`.js-edit-todo-input[data-index="${index}"]`);
      const editingDateInputElement = document.querySelector(`.js-edit-date-input[data-index="${index}"]`);

      // get the edited todo 
      const editedTodo = editingTodoInputElement.value;
      // get the edited date 
      const editedDate = editingDateInputElement.value;

      if (!editedDate) {
        storeEditedTodoItem(index, editedTodo, '');
        return;
      }
      storeEditedTodoItem(index, editedTodo, editedDate);
    });
  });

  // cancel button event listener
  const cancelButtonElement = document.querySelectorAll('.js-edit-cancel-button');
  cancelButtonElement.forEach((button) => {
    button.addEventListener('click', (event) => {
      const todoDescriptionElement = document.querySelectorAll('.js-todo-description');
      const todoDateElement = document.querySelectorAll('.js-todo-due-date');
      const index = Number(button.dataset.index);
      // unflag the currently editing ID
      currentlyEditingId = null; // Reset the currently editing ID
      
      // show the other todo descriptions
      todoDescriptionElement.forEach((description) => {
        if (description.dataset.index != String(index)) {
          description.classList.remove('disable-todo-description');
        }
      });

      // show the other todo dates
       todoDateElement.forEach((description) => {
        if (description.dataset.index != String(index)) {
          description.classList.remove('disable-todo-description');
        }
      });

      // enable the edit button of other todos
      editButtonElement.forEach((button) => {
        if (button.dataset.index !== String(index)) {
          button.classList.remove('disabled-button'); 
        }
      });
      // enable the delete button of other todos
      deleteButtonElement.forEach((button) => {
        if (button.dataset.index !== String(index)) {
          button.classList.remove('disabled-button'); 
        }
      });
      // Show the create todo button
      const createTodoElement = document.querySelector('.js-todo-create-button');
      createTodoElement.classList.remove('disabled-button');
      cancelButonPresses(index); // Call the cancel function

      //hide the edit todo input and date fields
      const editTodoContainerElement = document.querySelector(`.edit-todo-container[data-index="${index}"]`);
      editTodoContainerElement.style.visibility = 'hidden';

      // enable the checkbox of editing todo
      const editingTodoCheckboxElement = document.querySelector(`.js-todo-checkbox-input[data-index="${index}"]`);
      editingTodoCheckboxElement.style.visibility = 'visible';
      // show description
      todoDescriptionElement[index].style.visibility = 'visible';
      // show date
      todoDateElement[index].style.visibility = 'visible';
    });
  });

  // checkbox event listener
  const checkboxElement = document.querySelectorAll('.js-todo-checkbox-input');
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

  // delete button event listener
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

// create todo button event listener
const createButtonElement = document.querySelector('.js-todo-create-button');
createButtonElement.addEventListener('click', () => {
  console.log('Create button pressed');
  getTodoInput();
  updatePendingCount();
});

// Check if the input/pasted date while creating is valid or not function
export function checkDateTodayOrLater(dateInput) {
  const today = new Date().toISOString().split('T')[0];
  return dateInput === '' || dateInput >= today; // allow empty date
}

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