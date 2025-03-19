const moodInput = document.querySelectorAll(".mood-emoji");
const moodArray = JSON.parse(localStorage.getItem("moodHistory")) || [];
const calendar = document.getElementById("calendar");
const filterButtons = document.querySelectorAll(".filter-button");
const moodHistory = document.getElementById("mood-history");
let currentDate = new Date();
let currentView = "Day";
const options = {
  year: "numeric",
  month: "long",
  day: "2-digit",
};
const highlightCurrentMood = () => {
  const today = new Date().toLocaleDateString();
  const moodEntry = moodArray.find((entry) => entry.date === today);

  if (moodEntry) {
    moodInput.forEach((btn) => {
      if (btn.textContent === moodEntry.mood) {
        btn.classList.add("selected-emoji");
      }
    });
  }
};

moodInput.forEach((btn) =>
  btn.addEventListener("click", () => {
    moodInput.forEach((button) => button.classList.remove("selected-emoji"));
    saveMood(btn.textContent);
    // to add css to know it is selected
    btn.classList.add("selected-emoji");
  })
);

const saveMood = (mood) => {
  // update existing or add new
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

const daysOfWeek = () => {
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
};

const renderDayCalendar = () => {
 const today = new Date().toLocaleDateString();
 const moodEntry = moodArray.find((entry) => entry.date === today);

 const dayContent = document.createElement("div");
 dayContent.className = "day-content";
 dayContent.textContent = `Today's Mood: ${
   moodEntry ? moodEntry.mood : "No mood logged"
 }`;
 moodHistory.appendChild(dayContent);
};

const renderMonthCalendar = () => {
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

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

  daysOfWeek();

  // Add empty cells for days before the first day of the month to align it with the days
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
    if (day === currentDate.getDate()) {
      dayCell.classList.add("has-mood");
    }

    if (moodEntry) {
      dayCell.textContent += ` ${moodEntry.mood}`;
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

  // Create the calendar header (week range)
  const header = document.createElement("div");
  header.className = "calendar-header";
  header.textContent = `Week from ${startOfWeek.toLocaleDateString(
    "en-GB",
    options
  )} to ${endOfWeek.toLocaleDateString("en-GB", options)}`;
  moodHistory.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "calendar-grid";

  daysOfWeek();

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dateStr = day.toLocaleDateString();
    const moodEntry = moodArray.find((entry) => entry.date === dateStr);
    const dayCell = document.createElement("div");
    dayCell.className = "calendar-day";
    dayCell.textContent = day.getDate();

    if (day.getDate() === currentDate.getDate()) {
      dayCell.classList.add("has-mood");
    }

    if (moodEntry) {
      dayCell.textContent += ` ${moodEntry.mood}`;
    }
    grid.appendChild(dayCell);
  }
  moodHistory.append(grid);
};

renderCalendar();
highlightCurrentMood();
