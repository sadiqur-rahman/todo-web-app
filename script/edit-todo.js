// Function to handle the edit button press
export function editButtonPressed(index) {
  console.log('Edit button pressed for index:', index);
  const saveButtonElement = document.querySelector(`.js-todo-save-button[data-index="${index}"]`);
  const editButtonElement = document.querySelector(`.js-todo-edit-button[data-index="${index}"]`);
  const cancelButtonElement = document.querySelector(`.js-edit-cancel-button[data-index="${index}"]`);
  const deleteButtonElement = document.querySelector(`.js-todo-delete-button[data-index="${index}"]`);
  
  // Hide the edit button
  editButtonElement.style.transition = 'none';
  editButtonElement.style.visibility = 'hidden'; 

  // Hide the delete button
  deleteButtonElement.style.transition = 'none';
  deleteButtonElement.style.visibility = 'hidden';

  // Show the save button
  saveButtonElement.style.visibility = 'visible'; 
  // show the cancel button
  cancelButtonElement.style.visibility = 'visible';
}

// Function to handle the save button press
export function saveButtonPressed(index) {
  console.log('Save button pressed for index:', index);
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
    savedMessageElement.style.visibility = 'hidden';
    editButtonElement.style.visibility = 'visible'; 
    // Show the delete button
    deleteButtonElement.style.visibility = 'visible';
  }, 1000); // Hide after 1 second
}

// Function to handle the cancel button press
export function cancelButonPresses(index) {
  console.log('Cancel button pressed for index:', index);
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
  deleteButtonElement.style.visibility = 'visible';
}

// performing the editing of the todo items
function editTodo() {}