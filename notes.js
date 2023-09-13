// Trigger when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Fetch and display existing notes
  fetchNotes();

  // Add an event listener for the "Save Note" button
  const saveNoteButton = document.getElementById('saveNoteButton');
  saveNoteButton.addEventListener('click', saveNote);
});

function fetchNotes() {
  fetch('http://localhost:8090/General/restForm/restgetNoteList.request')
  .then(response => response.json())
  .then(data => {
      // Empty the existing table
      let noteList = document.getElementById('noteList');
      noteList.innerHTML = "";

      // Rebuild the table
      data.forEach(item => {
        let row = noteList.insertRow();
        let cell = row.insertCell(0);
        cell.innerHTML = item;  
    });
  })
  .catch(error => {
      console.error('Error fetching notes:', error);
  });
}

function saveNote() {
  // Get the text from the textarea
  const noteText = document.getElementById('noteText').value;
  
  // Prepare data to send to the server
  const noteData = new URLSearchParams();
  noteData.append('note', noteText);
  
  // Send a POST request to save the note
  fetch('http://localhost:8090/General/restForm/restAddNote.request', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: noteData
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {  // Replace 'success' with the actual field that indicates a successful operation
          // Clear the textarea
          document.getElementById('noteText').value = '';
          
          // Reload the list of notes
          fetchNotes();  // Assuming this function fetches and displays all notes
      } else {
          alert('Could not save the note. Please try again.');
      }
  })
  .catch(error => console.error('Error:', error));
}
