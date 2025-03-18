const moodInput = document.querySelectorAll(".mood-emoji");
const moodArray = JSON.parse(localStorage.getItem("moodHistory")) || [];
const calendar = document.getElementById("calendar");
const filterButtons = document.querySelectorAll(".filter-button");
const moodHistory = document.getElementById("mood-history");
let currentDate = new Date(); // Track the current date for navigation
let currentView = "Day";

moodInput.forEach((btn) =>
  btn.addEventListener("click", () => {
    moodInput.forEach((button) => button.classList.remove("selected-emoji"));
    saveMood(btn.textContent);
    // to add css to know it is selected
    btn.classList.add("selected-emoji");
  })
);

const saveMood = (mood) => {
  //1) get todays date as we will have to display it on calender for today
  // 2) check if the date already exists
  // 3) If yes, replace the date, bcoz if the user clicks twice it will create a new entry
  // if no, the directly push in the array
  const today = new Date().toLocaleDateString();
  const existingIndex = moodArray.findIndex((entry) => entry.date === today);

  if (existingIndex !== -1) {
    moodArray[existingIndex].mood = mood;
  } else {
    moodArray.push({ date: today, mood: mood });
  }
  localStorage.setItem("moodHistory", JSON.stringify(moodArray));
  renderCalendar();
};

// day/week/month view 
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("selected-filter"));
    console.log(button.textContent);

    const filter = button.textContent;
    currentView = filter; // Update the current view
    button.classList.add("selected-filter");
    renderCalendar(); // Re-render the calendar
  });
});

function renderCalendar() {
  moodHistory.innerHTML = "";
  if (currentView === "Day") {
    renderDayCalendar();
  } else if (currentView === "Month") {
    renderMonthCalendar();
  } else {
    renderWeekCalender();
  }
}

const dateStr = new Date().toLocaleDateString();
const moodEntry = moodArray.find((entry) => entry.date === dateStr);

const renderDayCalendar = () => {
  moodHistory.textContent += new Date().getDate();
  moodHistory.textContent += ` ${moodEntry.mood}`;
};

const renderMonthCalendar = () => {
  const firstDayOfMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(),1);
  const daysInMonth = new Date(currentDate.getFullYear(),currentDate.getMonth() + 1,0).getDate();

  // Create the calendar header (month and year)
  const header = document.createElement("div");
  header.className = "calendar-header";
  header.textContent = firstDayOfMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  moodHistory.appendChild(header);

  // Create the calendar grid
  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  const days = ["Sun", "Mon", "Tues", "Wed", "Thrus", "Fri", "Sat"];
  const weekdayRow = document.createElement("div");
  weekdayRow.className = "weekday-row";
  days.forEach((day) => {
    const weekdayCell = document.createElement("div");
    weekdayCell.className = "weekday-cell";
    weekdayCell.textContent = day;
    weekdayRow.appendChild(weekdayCell);
  });
  moodHistory.appendChild(weekdayRow);

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-day empty";
    grid.appendChild(emptyCell);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    ).toLocaleDateString();
    const moodEntry = moodArray.find((entry) => entry.date === dateStr);

    const dayCell = document.createElement("div");
    dayCell.className = "calendar-day";
    dayCell.textContent = day;

    if (moodEntry) {
      dayCell.textContent += ` ${moodEntry.mood}`;
      dayCell.classList.add("has-mood");
    }
    grid.appendChild(dayCell);
  }
  moodHistory.appendChild(grid);
};

const renderWeekCalender = () => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the week (Sunday)
  const endOfWeek = new Date(currentDate);
  endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay())); // End of the week (Saturday)

  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dateStr = day.toLocaleDateString();
    const moodEntry = moodArray.find((entry) => entry.date === dateStr);
    const dayCell = document.createElement("div");
    dayCell.className = "calendar-day";
    dayCell.textContent = day.getDate();
      
    if (moodEntry) {
      dayCell.textContent += ` ${moodEntry.mood}`;
      dayCell.classList.add("has-mood");
    }
    grid.appendChild(dayCell);
  }
  moodHistory.append(grid);
};

renderCalendar();