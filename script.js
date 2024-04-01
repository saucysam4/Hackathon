document.getElementById('meetingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get selected date and time
    const meetingDate = document.getElementById('meetingDate').value;
    const meetingTime = document.getElementById('meetingTime').value;
  
    // Example: You can do further processing here like sending the meeting details to a server, etc.
    
    // Display confirmation message
    alert(`Meeting scheduled for ${meetingDate} at ${meetingTime}`);
  });
  

  // Get current date
const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

// Ensure month and day are in two digits format
month = month < 10 ? '0' + month : month;
day = day < 10 ? '0' + day : day;

// Format as yyyy-mm-dd for setting the min attribute
const currentDate = `${year}-${month}-${day}`;

// Set min attribute for the date input
document.getElementById('meetingDate').setAttribute('min', currentDate);