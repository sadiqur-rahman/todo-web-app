export function editButtonPressed(index) {
  console.log('Edit button pressed for index:', index);
  const saveButtonElement = document.querySelector(`.js-todo-save-button[data-index="${index}"]`);
  const editButtonElement = document.querySelector(`.js-todo-edit-button[data-index="${index}"]`);
  // Show the save button
  saveButtonElement.style.visibility = 'visible'; 
  editButtonElement.style.visibility = 'hidden'; 
}

export function saveButtonPressed(index) {
  console.log('Save button pressed for index:', index);
  const saveButtonElement = document.querySelector(`.js-todo-save-button[data-index="${index}"]`);
  const editButtonElement = document.querySelector(`.js-todo-edit-button[data-index="${index}"]`);
  // Hide the save button after saving
  saveButtonElement.style.visibility = 'hidden';
  // Show the edit button
  editButtonElement.style.visibility = 'visible'; 
}