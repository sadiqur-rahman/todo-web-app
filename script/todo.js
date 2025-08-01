const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// render the todo list from local storage on page load
renderTodo();

const createButtonElement = document.querySelector('.js-todo-create-button');
createButtonElement.addEventListener('click', () => {
  // get the todo description and date from input fields before clearing them
  getTodoInput();

  // Clear the input fields after clicking the create button if description is not empty, date is allowed to be empty. 
  const todoDescriptionElement = document.querySelector('.js-todo-description');
  const todoDateElement = document.querySelector('.js-todo-date');

  if (todoDescriptionElement.value) {
    todoDescriptionElement.value = '';
    todoDateElement.value = '';
    document.querySelector('.empty-todo-div').classList.remove('empty-alert-div-active');
  } else {
    // If the description is empty, do not clear the date field
    document.querySelector('.empty-todo-div').classList.add('empty-alert-div-active');
  }
});

// Gets the Todo and Date from input
function getTodoInput() {
  const todoDescriptionElement = document.querySelector('.js-todo-description');
  const todoDateElement = document.querySelector('.js-todo-date');

  todoDescription = todoDescriptionElement.value;
  todoDate = todoDateElement.value;

  // Display an alert if the input is empty, empty date is allowed
  if (todoDescription) {
    if (todoDate) {
      let todoDateWithText = '<b>Date: </b>' + String(todoDate);
      addTodo(todoDescription, todoDateWithText);
  } else {
      addTodo(todoDescription, todoDate);
    }
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
  renderTodo();
  console.log('Todo list rendered:', todoList);
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
  const todoDisplayElement = document.querySelector('.todo-display');
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
  renderTodo();
  console.log('Todo deleted:', todoList);
};

// Save to local storage
function saveToLocal() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
