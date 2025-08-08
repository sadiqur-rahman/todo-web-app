// Function to handle the edit button press
export function editButtonPressed(index) {
  console.log('Edit button pressed for index:', index);

  // elements
  const saveButtonElement = document.querySelector(`.js-todo-save-button[data-index="${index}"]`);
  const editButtonElement = document.querySelector(`.js-todo-edit-button[data-index="${index}"]`);
  const cancelButtonElement = document.querySelector(`.js-edit-cancel-button[data-index="${index}"]`);
  const deleteButtonElement = document.querySelector(`.js-todo-delete-button[data-index="${index}"]`);
  
  // Hide the edit button
  editButtonElement.style.transition = 'none';
  editButtonElement.style.visibility = 'hidden'; 

  // Disable the delete button
  deleteButtonElement.classList.add('disabled-delete-button');

  // Show the save button
  saveButtonElement.style.visibility = 'visible'; 
  // show the cancel button
  cancelButtonElement.style.visibility = 'visible';
}

// Function to handle the save button press
export function saveButtonPressed(index) {
  console.log('Save button pressed for index:', index);

  // elements
  const saveButtonElement = document.querySelector(`.js-todo-save-button[data-index="${index}"]`);
  const editButtonElement = document.querySelector(`.js-todo-edit-button[data-index="${index}"]`);
  const cancelButtonElement = document.querySelector(`.js-edit-cancel-button[data-index="${index}"]`);
  const deleteButtonElement = document.querySelector(`.js-todo-delete-button[data-index="${index}"]`);
  
  // Hide the save button after saving
  saveButtonElement.style.transition = 'none';
  saveButtonElement.style.visibility = 'hidden';
  // Hide the cancel button
  cancelButtonElement.style.transition = 'none';
  cancelButtonElement.style.visibility = 'hidden';

  // Show the edit button
  // Show the saved message for 1 second
  const savedMessageElement = document.querySelector(`.js-edit-saved-message[data-index="${index}"]`);
  savedMessageElement.style.visibility = 'visible';
  setTimeout(() => {
    // set the visibility of the saved message to hidden after 1 second
    savedMessageElement.style.visibility = 'hidden';
    // Show the edit button
    editButtonElement.style.visibility = 'visible'; 
    // Show the delete button
    deleteButtonElement.classList.remove('disabled-delete-button');
  }, 1000); // Hide after 1 second
}

// Function to handle the cancel button press
export function cancelButonPresses(index) {
  console.log('Cancel button pressed for index:', index);

  // elements
  const saveButtonElement = document.querySelector(`.js-todo-save-button[data-index="${index}"]`);
  const editButtonElement = document.querySelector(`.js-todo-edit-button[data-index="${index}"]`);
  const cancelButtonElement = document.querySelector(`.js-edit-cancel-button[data-index="${index}"]`);
  const deleteButtonElement = document.querySelector(`.js-todo-delete-button[data-index="${index}"]`);

  // Hide the save button
  saveButtonElement.style.transition = 'none';
  saveButtonElement.style.visibility = 'hidden';
  // Hide the cancel button
  cancelButtonElement.style.transition = 'none';
  cancelButtonElement.style.visibility = 'hidden';

  // Show the edit button
  editButtonElement.style.visibility = 'visible'; 

  // Show the delete button
  deleteButtonElement.classList.remove('disabled-delete-button');
}

// get current todo, date before editing
export function storeCurrentTodoItem(currentTodo, currentDate) {
  const currentTodoObject = {
    todo: currentTodo,
    date: currentDate
  }
}