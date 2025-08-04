// Function to handle the edit button press
export function editButtonPressed(index) {
  console.log('Edit button pressed for index:', index);
  const saveButtonElement = document.querySelector(`.js-todo-save-button[data-index="${index}"]`);
  const editButtonElement = document.querySelector(`.js-todo-edit-button[data-index="${index}"]`);
  const cancelButtonElement = document.querySelector(`.js-edit-cancel-button[data-index="${index}"]`);
  // Show the save button
  saveButtonElement.style.visibility = 'visible'; 
  // show the cancel button
  cancelButtonElement.style.visibility = 'visible';
  // Hide the edit button
  editButtonElement.style.visibility = 'hidden'; 
}

// Function to handle the save button press
export function saveButtonPressed(index) {
  console.log('Save button pressed for index:', index);
  const saveButtonElement = document.querySelector(`.js-todo-save-button[data-index="${index}"]`);
  const editButtonElement = document.querySelector(`.js-todo-edit-button[data-index="${index}"]`);
  const cancelButtonElement = document.querySelector(`.js-edit-cancel-button[data-index="${index}"]`);
  // Hide the save button after saving
  saveButtonElement.style.visibility = 'hidden';
  // Show the edit button
  editButtonElement.style.visibility = 'visible'; 
  // Hide the cancel button
  cancelButtonElement.style.visibility = 'hidden';
}

// Function to handle the cancel button press
export function cancelButonPresses(index) {
  console.log('Cancel button pressed for index:', index);
  const saveButtonElement = document.querySelector(`.js-todo-save-button[data-index="${index}"]`);
  const editButtonElement = document.querySelector(`.js-todo-edit-button[data-index="${index}"]`);
  const cancelButtonElement = document.querySelector(`.js-edit-cancel-button[data-index="${index}"]`);
  // Hide the save button
  saveButtonElement.style.visibility = 'hidden';
  // Show the edit button
  editButtonElement.style.visibility = 'visible'; 
  // Hide the cancel button
  cancelButtonElement.style.visibility = 'hidden';
  // Reset the todo description and date to original values
}