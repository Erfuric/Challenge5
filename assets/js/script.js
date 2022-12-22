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

const container = document.querySelector(".container-lg");

for (let i = 7; i <= 19; i++) {
  const timeBlock = document.createElement("div");
  timeBlock.id = `hour-${i}`;
  timeBlock.classList.add("row", "time-block");

  const hour = document.createElement("div");
  hour.classList.add("col-2", "col-md-1", "hour", "text-center", "py-3");
  hour.textContent = `${i}AM`;
  timeBlock.appendChild(hour);

  const description = document.createElement("textarea");
  description.classList.add("col-8", "col-md-10", "description");
  description.rows = 3;
  timeBlock.appendChild(description);

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("btn", "saveBtn", "col-2", "col-md-1");
  saveBtn.setAttribute("aria-label", "save");
  saveBtn.innerHTML = '<i class="fas fa-save" aria-hidden="true"></i>';
  timeBlock.appendChild(saveBtn);

  container.appendChild(timeBlock);
}


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
