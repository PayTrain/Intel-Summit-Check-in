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

  // Show welcome message on the page
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  const greeting = document.getElementById("greeting");

  greeting.textContent = message;
  greeting.style.display = "block";
  greeting.classList.add("success-message");

  // Check if goal is reached
  if (count >= maxCount) {
    // Find the winning team
    const waterCount = parseInt(
      document.getElementById("waterCount").textContent
    );
    const zeroCount = parseInt(
      document.getElementById("zeroCount").textContent
    );
    const powerCount = parseInt(
      document.getElementById("powerCount").textContent
    );
    let winningTeam = "";
    let winningEmoji = "";
    let maxTeamCount = Math.max(waterCount, zeroCount, powerCount);
    if (waterCount === maxTeamCount) {
      winningTeam = "Team Water Wise";
      winningEmoji = "🌊";
    } else if (zeroCount === maxTeamCount) {
      winningTeam = "Team Net Zero";
      winningEmoji = "🌿";
    } else {
      winningTeam = "Team Renewables";
      winningEmoji = "⚡";
    }
    greeting.textContent = `🏆 Celebration! ${winningEmoji} ${winningTeam} has the most check-ins!`;
    greeting.style.display = "block";
    greeting.classList.add("success-message");
  }

  form.reset();
});
