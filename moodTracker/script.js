const moodInput = document.querySelectorAll(".mood-emoji");
const moodArray = JSON.parse(localStorage.getItem("moodHistory")) || [];

moodInput.forEach((btn) => btn.addEventListener("click", () => {
    saveMood(btn.textContent)
    // to add css to know it is selected
    btn.classList.add("selected-emoji")
}))

const saveMood = (mood) => {
    //1) get todays date as we will have to display it on calender for today
    // 2) check if the date already exists
    // 3) If yes, replace the date, bcoz if the user clicks twice it will create a new entry
    // if no, the directly push in the array
  const today = new Date().toLocaleDateString();
    const existingIndex = moodArray.findIndex((entry) => entry.date === today);

    if (existingIndex !== -1) {
      // Replace existing mood entry for today
      moodArray[existingIndex].mood = mood;
    } else {
      // Add new entry
      moodArray.push({ date: today, mood: mood });
    }

    localStorage.setItem("moodHistory", JSON.stringify(moodArray));
};
