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
          html += `<td>${dayCounter}</td>`;
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