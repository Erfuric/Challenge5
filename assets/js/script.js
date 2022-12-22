// Get the current hour
const currentHour = dayjs().hour();

// Loop through each time block
$('.time-block').each(function() {
  // Get the hour from the time block's id
  const hour = $(this).attr('id').replace('hour-', '');

  // Remove the past, present, and future classes
  $(this).removeClass('past present future');

  // If the hour is less than the current hour, add the past class
  if (hour < currentHour) {
    $(this).addClass('past');
  }
  // If the hour is the same as the current hour, add the present class
  else if (hour === currentHour) {
    $(this).addClass('present');
  }
  // Otherwise, add the future class
  else {
    $(this).addClass('future');
  }
});

const currentDay = document.querySelector("#currentDay");

const today = new Date();
const options = { weekday: "long", month: "long", day: "numeric" };
const formattedDate = today.toLocaleDateString("en-US", options);

currentDay.textContent = formattedDate;

const timeBlocks = document.querySelectorAll(".time-block");

timeBlocks.forEach(timeBlock => {
  const hour = timeBlock.id.split("-")[1];
  if (hour < today.getHours()) {
    timeBlock.classList.add("past");
  } else if (hour === today.getHours()) {
    timeBlock.classList.add("present");
  } else {
    timeBlock.classList.add("future");
  }
});

timeBlocks.forEach(timeBlock => {
  timeBlock.addEventListener("click", e => {
    const description = timeBlock.querySelector(".description");
    const saveBtn = timeBlock.querySelector(".saveBtn");
    description.style.display = "block";
    saveBtn.style.display = "block";
  });
});

timeBlocks.forEach(timeBlock => {
  const saveBtn = timeBlock.querySelector(".saveBtn");
  saveBtn.addEventListener("click", e => {
    const description = timeBlock.querySelector(".description");
    localStorage.setItem(timeBlock.id, description.value);
  });
});

timeBlocks.forEach(timeBlock => {
  const description = timeBlock.querySelector(".description");
  const savedEvent = localStorage.getItem(timeBlock.id);
  if (savedEvent) {
    description.value = savedEvent;
  }
});
