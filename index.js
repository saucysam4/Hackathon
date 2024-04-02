function generateCalendar(year, month) {
    const calendarDiv = document.getElementById('calendar');
    const monthYearHeader = document.getElementById('month-year');
  
    const date = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let html = '<table>';
    html += `<tr><th colspan="7" class="month-year">${monthNames[month - 1]} ${year}</th></tr>`;
    html += '<tr>';
    for (let i = 0; i < 7; i++) {
      html += `<th>${dayNames[i]}</th>`;
    }
    html += '</tr>';
  
    let dayCounter = 1;
    while (dayCounter <= daysInMonth) {
      html += '<tr>';
      for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
        if (i === new Date(year, month - 1, dayCounter).getDay()) {
          html += `<td><span>${dayCounter}</span></td>`;
          dayCounter++;
        } else {
          html += '<td></td>';
        }
      }
      html += '</tr>';
    }
  
    html += '</table>';
    calendarDiv.innerHTML = html;
  }
  

  const currentDate = new Date();
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1);

  // Define function to toggle visibility of calendar and meeting scheduler form
function toggleCalendarAndForm() {
    const calendarDiv = document.getElementById('calendar');
    const meetingFormDiv = document.getElementById('meetingFormContainer');

    // Toggle visibility by toggling the 'hidden' class
    calendarDiv.classList.toggle('hidden');
    meetingFormDiv.classList.toggle('hidden');
}

// Function to handle click event on calendar dates
function handleCalendarClick(event) {
    const target = event.target;
    if (target.tagName === 'TD') { // Check if the clicked element is a table cell
        // Remove 'selected' class from previously selected date box
        const selectedDateBox = document.querySelector('.selected');
        if (selectedDateBox) {
            selectedDateBox.classList.remove('selected');
        }

        target.classList.add('selected'); // Add 'selected' class to the clicked date box
        toggleCalendarAndForm(); // Toggle visibility of calendar and meeting scheduler form
    }
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form from submitting in the default way

    const time = document.getElementById('meetingTime').value;
    const description = document.getElementById('description').value;
    const meetingInfo = `Time: ${time}<br> Description: ${description}`;

    // Get the selected date box
    const selectedDateBox = document.querySelector('.selected');

    
    if (selectedDateBox) {
        selectedDateBox.innerHTML += '<br>' + meetingInfo; // Append the meeting information to the content of the selected date box
    }

    toggleCalendarAndForm(); // Hide the form and show the calendar
}

// Attach click event listener to the calendar container
document.getElementById('calendar').addEventListener('click', handleCalendarClick);

// Attach submit event listener to the meeting scheduler form
document.getElementById('meetingForm').addEventListener('submit', handleFormSubmit);

// Hide the meeting scheduler form and show the calendar by default
document.getElementById('meetingFormContainer').classList.add('hidden');
document.getElementById('calendar').classList.remove('hidden');

