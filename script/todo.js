const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// check todo status on page load
renderTodo();
checkTodoStatus();

const createButtonElement = document.querySelector('.js-todo-create-button');
createButtonElement.addEventListener('click', () => {
  // get the todo description and date from input fields before clearing them
  getTodoInput();
});

// Gets the Todo and Date from input
let timeoutId; // Declare a variable to hold the timeout ID
function getTodoInput() {
  const todoDescriptionElement = document.querySelector('.js-todo-description');
  const todoDateElement = document.querySelector('.js-todo-date');
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
  const todoObject = {
    todo,
    date
  };
  todoList.push(todoObject);
  // Save to local storage
  saveToLocal();
  checkTodoStatus();
}

// Checking todo status before rendering
function checkTodoStatus() {
  const todoStatusDiv = document.querySelector('.js-todo-status-div');
  if (todoList.length === 0) {
    todoStatusDiv.classList.add('todo-status-completed');
    console.log(todoStatusDiv);
  } else {
    todoStatusDiv.classList.remove('todo-status-completed');
    console.log(todoStatusDiv);
  }
  renderTodo();
}

// Show the todo array by looping in the HTML
function renderTodo() {
  let renderHTML = '';
  todoList.forEach((todoItem, index) => {
    renderHTML += `
        <div class="todo-container">
          <div class="todo-checkbox">
            <input class="todo-checkbox-input" type="checkbox">
          </div>

          <div class="todo-description">${todoItem.todo}</div>

          <div class="todo-date">
            <div class="todo-due-date">${todoItem.date}</div>
          </div>
          
          <div class="action-button">
            <button class="todo-edit-button">Edit</button>
            <button class="delete-todo-button js-delete-todo-button" data-index="${index}">Delete</button>
          </div>
        </div>
      `;
  });

  // render the HTML first to get all the buttons to query
  const todoDisplayElement = document.querySelector('.js-todo-display');
  todoDisplayElement.innerHTML = renderHTML;

  // Set data attribute = (index) to the delete button to match it. 
  // Select all the button elements, loop the buttons, add click listener on the button, 
  // get the index of deleting item 
  // call the delete function
  const deleteButtonElement = document.querySelectorAll('.js-delete-todo-button');

  deleteButtonElement.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = Number(button.dataset.index);
      deleteTodo(index);
    });
  });
};

// delete button function
function deleteTodo(index) {
  todoList.splice(index, 1);
  // Save to local storage
  saveToLocal();
  checkTodoStatus();
};

// Save to local storage
function saveToLocal() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}















