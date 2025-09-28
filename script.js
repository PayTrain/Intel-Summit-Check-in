// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track attendance
let count = 0;
const maxCount = 50;

// Load counts from localStorage if available
if (localStorage.getItem("totalCount")) {
  count = parseInt(localStorage.getItem("totalCount"));
}

const teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};

if (localStorage.getItem("teamCounts")) {
  const saved = JSON.parse(localStorage.getItem("teamCounts"));
  teamCounts.water = saved.water || 0;
  teamCounts.zero = saved.zero || 0;
  teamCounts.power = saved.power || 0;
}

// Load attendee lists from localStorage if available
const attendeeLists = {
  water: [],
  zero: [],
  power: [],
};
if (localStorage.getItem("attendeeLists")) {
  const savedLists = JSON.parse(localStorage.getItem("attendeeLists"));
  attendeeLists.water = savedLists.water || [];
  attendeeLists.zero = savedLists.zero || [];
  attendeeLists.power = savedLists.power || [];
}

// Set initial counts and lists in DOM
window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("attendeeCount").textContent = count;
  document.getElementById("waterCount").textContent = teamCounts.water;
  document.getElementById("zeroCount").textContent = teamCounts.zero;
  document.getElementById("powerCount").textContent = teamCounts.power;

  // Set progress bar
  const percentage = Math.round((count / maxCount) * 100);
  document.getElementById("progressBar").style.width = `${percentage}%`;

  // Restore attendee lists
  for (const team in attendeeLists) {
    const list = attendeeLists[team];
    const ul = document.getElementById(team + "List");
    ul.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
      const li = document.createElement("li");
      li.textContent = list[i];
      ul.appendChild(li);
    }
  }
});

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  // Increment count
  count++;
  teamCounts[team]++;

  // Save counts to localStorage
  localStorage.setItem("totalCount", count);
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));

  // Update attendee count on the page
  const attendeeCount = document.getElementById("attendeeCount");
  attendeeCount.textContent = count;

  // Update progress bar width
  const percentage = Math.round((count / maxCount) * 100);
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = `${percentage}%`;

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = teamCounts[team];

  // Show welcome message on the page
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  const greeting = document.getElementById("greeting");

  greeting.textContent = message;
  greeting.style.display = "block";
  greeting.classList.add("success-message");

  // Add attendee to the team list and save
  const attendeeList = document.getElementById(team + "List");
  const listItem = document.createElement("li");
  const attendeeText = `${name} (${teamName})`;
  listItem.textContent = attendeeText;
  attendeeList.appendChild(listItem);
  attendeeLists[team].push(attendeeText);
  localStorage.setItem("attendeeLists", JSON.stringify(attendeeLists));

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
