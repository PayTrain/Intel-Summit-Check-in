// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 50;

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  // Increment count
  count++;

  // Update attendee count on the page
  const attendeeCount = document.getElementById("attendeeCount");
  attendeeCount.textContent = count;

  // Update progress bar width
  const percentage = Math.round((count / maxCount) * 100);
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = `${percentage}%`;

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Show welcome message
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  console.log(message);

  form.reset();
});
