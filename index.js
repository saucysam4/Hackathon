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

  
function toggleCalendarAndForm() {
    const calendarDiv = document.getElementById('calendar');
    const meetingFormDiv = document.getElementById('meetingFormContainer');


    calendarDiv.classList.toggle('hidden');
    meetingFormDiv.classList.toggle('hidden');
}


function handleCalendarClick(event) {
    const target = event.target;
    if (target.tagName === 'TD') { 
        const selectedDateBox = document.querySelector('.selected');
        if (selectedDateBox) {
            selectedDateBox.classList.remove('selected');
        }

        target.classList.add('selected'); 
        toggleCalendarAndForm(); 
    }
}


function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form from submitting in the default way
    const title = document.getElementById('title').value;
    const time = document.getElementById('meetingTime').value;
    const description = document.getElementById('description').value;
    
    const meetingContainer = document.createElement('div');
    meetingContainer.classList.add('meeting-info');

   
    const titleElement = document.createElement('div');
    titleElement.classList.add('meeting-title');
    titleElement.textContent = title;

  
    const timeElement = document.createElement('div');
    timeElement.classList.add('meeting-time');
    timeElement.textContent = time;

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('description');
    descriptionElement.textContent = description;

    
    meetingContainer.appendChild(titleElement);
    meetingContainer.appendChild(timeElement);
    meetingContainer.appendChild(descriptionElement);

    meetingContainer.addEventListener('click', ()=> {
        const expandedDescription =document.createElement('div');
        const p= document.createElement('p')
        p.innerText=description
        const deleteButton=document.createElement('button')
        deleteButton.addEventListener('click',()=>{
            expandedDescription.remove()
        })
        deleteButton.innerText='x'
        expandedDescription.append(p,deleteButton)
        document.body.append(expandedDescription)
        

    })

   
    const selectedDateBox = document.querySelector('.selected');

    if (selectedDateBox) {
        selectedDateBox.appendChild(meetingContainer); 
        toggleCalendarAndForm(); 
    }

   
}
// Function to handle click event on meeting-info divs


// Attach click event listener to the body for meeting-info divs


document.getElementById('calendar').addEventListener('click', handleCalendarClick);

document.getElementById('meetingForm').addEventListener('submit', handleFormSubmit);


document.getElementById('meetingFormContainer').classList.add('hidden');
document.getElementById('calendar').classList.remove('hidden');

