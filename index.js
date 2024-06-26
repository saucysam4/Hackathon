const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// Default events array
let eventsArr = [];

// then call get
getEvents();

//Function to add days
function initCalendar() {
    // to get prev month days and current month days and rem next month days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // Update date top of calendar
    date.innerHTML = months[month] + " " + year;


    let days = "";

    // prev month days
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date" >${prevDays - x + 1}</div>`;
    }

    // current month days
    for (let i = 1; i <= lastDate; i++) {
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                event = true;
            }
        });

        if (
            i === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth()
        ) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);

            if (event) {
                days += `<div class="day today active event" >${i}</div>`;
            } else {
                days += `<div class="day today active" >${i}</div>`;
            }
        } else {
            if (event) {
                days += `<div class="day event" >${i}</div>`;
            } else {
                days += `<div class="day" >${i}</div>`;
            }
        }
    }

    // next month days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date " >${j}</div>`;
    }

    // If the last row is not full, add empty divs to make it full
    const totalDays = day + lastDate + nextDays;
    const remainingEmptyDays = 7 - (totalDays % 7);
    if (remainingEmptyDays < 7) {
        for (let k = 0; k < remainingEmptyDays; k++) {
            days += `<div class="day next-date empty"></div>`;
        }
    }

    daysContainer.innerHTML = days;
    
    addListener();
}

initCalendar();

// prev month
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

// next month
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

// add eventlistener on prev and next
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// our calendar is ready
// add goto date and goto today functionality
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    // allow only numbers remove anything else
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        //    add a slash if 2 numbers entered
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        // don't allow more than 7 characters
        dateInput.value = dateInput.value.slice(0, 7);
    }
    // if backspace pressed
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener("click", gotoDate);

// function to go to entered date
function gotoDate() {
    const dateArr = dateInput.value.split("/");
    // some date validation
    if (dateArr.length === 2) {
        if (
            dateArr[0] > 0 &&
            dateArr[0] < 13 &&
            dateArr[1].length === 4
        ) {
            month = parseInt(dateArr[0]) - 1;
            year = parseInt(dateArr[1]);
            initCalendar();
            return;
        }
    }
    // if invalid date
    alert("invalid date");
}

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");

addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
    // if click outside
    if (
        e.target !== addEventBtn &&
        !addEventContainer.contains(e.target)
    ) {
        addEventContainer.classList.remove("active");
    }
});

// allow only 50 chars in title
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

// time format in from and to time
addEventFrom.addEventListener("input", (e) => {
    // remove anything else numbers
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    // if two numbers entered auto add :
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }
    // don't let user enter more than 5 chars
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});
// same with to time
addEventTo.addEventListener("input", (e) => {
    // remove anything else numbers
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    // if two numbers entered auto add :
    if (addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }
    // don't let user enter more than 5 chars
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

//create function to add listener on days after rendered
function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            // set current day as active day
            activeDay = Number(e.target.innerHTML);

            // call active day after click
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

            // remove active from already active day
            days.forEach((day) => {
                day.classList.remove("active");
            });

            // if prev month day clicked goto prev month and active
            if (e.target.classList.contains("prev-date")) {
                prevMonth();
                setTimeout(() => {
                    // select all days of that month
                    const days = document.querySelectorAll(".day");
                    // after going to prev month add active to clicked
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("prev-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
                // same with next month
            } else if (e.target.classList.contains("next-date")) {
                nextMonth();
                setTimeout(() => {
                    // select all days of that month
                    const days = document.querySelectorAll(".day");
                    // after going to prev month add active to clicked
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("next-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                // remaining current month days
                e.target.classList.add("active");
            }
        });
    });
}

//show active day events and date at top
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML =
        date + " " + months[month] + " " + year;
}

// function to show events of that day
function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        // get events of active day only
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            // then show event on document
            event.events.forEach((event) => {
                events += `
                <div class="event">
                    <div class="title">
                    <i class="fas fa-circle"></i>
                    <h3 class="event-title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                    <span class="event-time">${event.time}</span>
                    </div>
                    </div>
                `;
            });
        }
    });

    // if nothing found
    if (events === "") {
        events = `<div class="no-event">
            <h3>No Events</h3>
            </div>`;
    }
    eventsContainer.innerHTML = events;
    //  save events when update event called
    saveEvents();
}

//function to add events
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    // some validations
    if (
        eventTitle === "" ||
        eventTimeFrom === "" ||
        eventTimeTo === ""
    ) {
        alert("Please fill all the fields");
        return;
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if (
        timeFromArr.length !== 2 ||
        timeToArr.length !== 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59
    ) {
        alert("Invalid Time Format");
        return;
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
    };

    let eventAdded = false;

    // check if eventsArr is not empty
    if (eventsArr.length > 0) {
        // check if current day has already any event then add to that
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    // if event array empty or current day has no event create new
    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }

    // remain active from add event form
    addEventContainer.classList.remove("active");
    // clear the fields
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    // show current added event
    updateEvents(activeDay);

    // also add event class to newly added day if not already
    const activeDayElem = document.querySelector(".day.active");
    if (!activeDayElem.classList.contains("event")) {
        activeDayElem.classList.add("event");
    }
});

function convertTime(time) {
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}

// function to remove events on click
eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
        const eventTitle =
            e.target.children[0].children[1].innerHTML;
        // get the title of event then search in array by title and delete
        eventsArr.forEach((event) => {
            if (
                event.day === activeDay &&
                event.month === month + 1 &&
                event.year === year
            ) {
                event.events.forEach((item, index) => {
                    if (item.title === eventTitle) {
                        event.events.splice(index, 1);
                    }
                });

                // if no event remaining on that date remove complete day
                if (event.events.length === 0) {
                    eventsArr.splice(
                        eventsArr.indexOf(event),
                        1
                    );
                    // after remove complete day also remove active class of that day
                    const activeDayElem = document.querySelector(
                        ".day.active"
                    );
                    if (
                        activeDayElem.classList.contains(
                            "event"
                        )
                    ) {
                        activeDayElem.classList.remove(
                            "event"
                        );
                    }
                }
            }
        });
        // after removing from array update event
        updateEvents(activeDay);
    }
});

// store events in local storage
function saveEvents() {
    localStorage.setItem(
        "events",
        JSON.stringify(eventsArr)
    );
}

function getEvents() {
    if (localStorage.getItem("events") === null) {
        return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}