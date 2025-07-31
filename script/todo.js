const todoList = [];

const createButtonElement = document.querySelector('.js-todo-create-button');
createButtonElement.addEventListener('click', () => {
  getTodoInput();

  // Clears each input field after create button is clicked. 
  const todoDescriptionElement = document.querySelector('.js-todo-description');
  todoDescriptionElement.value = '';
  const todoDateElement = document.querySelector('.js-todo-date');
  todoDateElement.value = '';
});

// Gets the Todo from input
function getTodoInput() {
  const todoDescriptionElement = document.querySelector('.js-todo-description');
  todoDescription = todoDescriptionElement.value;
  const todoDateElement = document.querySelector('.js-todo-date');
  todoDate = todoDateElement.value;
  addTodo(todoDescription, todoDate);
}

// Adds the Todo into array
function addTodo(todo, date){
  const todoObject = {
    todo,
    date
  };
  todoList.push(todoObject);
  renderTodo();
}

// Show the todo array by looping in the HTML
function renderTodo() {
  let renderHTML = '';
  todoList.forEach((todoItem, index) => {
    let todoRender = {
      todo: todoItem.todo,
      date:  todoItem.date
    };
    renderHTML += `
      <div class="todo-container">
        <div class="todo-checkbox">
          <input class="todo-checkbox-input" type="checkbox">
        </div>

        <div class="todo-description">${todoRender.todo}</div>

        <div class="todo-date">
          <div class="todo-due-date"><b>Time: </b>${todoRender.date}</div>
        </div>
        
        <div class="action-button">
          <button class="todo-edit-button">Edit</button>
          <button class="delete-todo-button js-delete-todo-button">Delete</button>
        </div>
      </div>
    `;
  });

  let todoDisplayElement = document.querySelector('.todo-display');
  todoDisplayElement.innerHTML = renderHTML;
};

// // Loop the array and get the index of deleting item
// todoList.forEach((todoItem, index) => {
//   const deleteButtonElement = document.querySelector('.js-delete-todo-button');
//   deleteButtonElement.addEventListener('click', (event) => {
//     deleteTodo(index);
//     console.log('delete');
//   });
// });

// delete button
function deleteTodo(index) {
  todoList.slice(index, 1);
  renderTodo();
};