const todoList = [];

document.querySelector('.js-todo-create-button')
  .addEventListener('click', () => {
    getTodoInput();
    
    // Clears each input field after create button is clicked. 
    document.querySelector('.js-todo-description').value = '';
    document.querySelector('.js-todo-date').value = '';
  });

// Gets the Todo from input
function getTodoInput() {
  const todoDescription = document.querySelector('.js-todo-description').value;
  const todoDate = document.querySelector('.js-todo-date').value;

  addTodo(todoDescription, todoDate);
}

// Adds the Todo into array
function addTodo(todo, date){
  const todoObject = {
    todo,
    date
  };
  todoList.push(todoObject);
  console.log(todoList);
}

// Show the todo array by looping in the HTML