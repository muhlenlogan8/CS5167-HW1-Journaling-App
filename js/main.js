// JavaScript file for App

// Entry Data //
// User entries array with existing entries data
const entries = [
    {
        image: "assets/entry2.jpg",
        datetime: "Today's Entry",
        sleep: 0,
        moods: [],
        text: ""
    },
    {
        image: "assets/entry1.jpg",
        datetime: "08/30/2025 11:31 pm",
        sleep: 9,
        moods: ["Happy"],
        text: "Today was a good day!"
    },
    {
        image: "assets/entry2.jpg",
        datetime: "08/28/2025 9:02 am",
        sleep: 4,
        moods: ["Tired", "Happy"],
        text: "Very tired today this morning but I'm happy and hopeful for today"
    },
    {
        image: "assets/entry2.jpg",
        datetime: "08/24/2025 1:42 pm",
        sleep: 7,
        moods: ["Sad"],
        text: "Today hasn't been great so far."
    }
];

// Event Listeners //
// Overall event listener on page load
document.addEventListener("DOMContentLoaded", () => {
    displayEntries();
    updateSummary();
    sleepInputListener();
    moodCheckboxListener();
    entryTextListener();
});

// If the sleep input changes, update today's entry
function sleepInputListener() {
    const sleepInput = document.getElementById("sleep-hours");
    sleepInput.addEventListener("input", updateTodayEntry);
}

// If the mood checkboxes change, update today's entry
function moodCheckboxListener() {
    const moodCheckboxes = document.querySelectorAll('input[name="mood"]');
    moodCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateTodayEntry);
    });
}

// If the entry text input changes, update today's entry
function entryTextListener() {
    const entryText = document.getElementById("entry-text");
    entryText.addEventListener("input", updateTodayEntry);
}

// Functions //
// Update the entry for today
function updateTodayEntry() {
    // Update the first entry in the entries data (First entry is today's entry)
    let entry = entries[0];
    entry.sleep = Number(document.getElementById("sleep-hours")?.value);
    entry.moods = Array.from(document.querySelectorAll('input[name="mood"]:checked')).map(cb => cb.value.charAt(0).toUpperCase() + cb.value.slice(1));
    entry.text = document.getElementById("entry-text")?.value;

    updateSummary();
    displayEntries();
}

// Function to calculate the average sleep time and number of moods for entries and current input
function updateSummary() {
    // Get the average sleep for the entries
    let totalSleep = 0;
    entries.forEach(entry => {
        totalSleep += entry.sleep;
    });
    let averageSleep = totalSleep / entries.length || 0;
    averageSleep = averageSleep.toFixed(2); // Round to 2 decimal places

    // Show average sleep in the summary
    document.getElementById("summary-avg-sleep").textContent = averageSleep;

    // Get mood counts
    let happyCount = 0;
    let sadCount = 0;
    let tiredCount = 0;
    entries.forEach(entry => {
        if (entry.moods.includes("Happy")) happyCount++;
        if (entry.moods.includes("Sad")) sadCount++;
        if (entry.moods.includes("Tired")) tiredCount++;
    });

    // Show mood counts in the summary
    document.getElementById("summary-happy-count").textContent = happyCount;
    document.getElementById("summary-sad-count").textContent = sadCount;
    document.getElementById("summary-tired-count").textContent = tiredCount;
}

// Render entries logic (Creating html components which will be added inside of entries-list div already present in index.html)
function displayEntries() {
    const entriesList = document.querySelector(".entries-list"); // Get the entries list div
    entriesList.innerHTML = ""

    // Set present svgs to use in the rendering of an entry
        const moodSvgs = {
            Happy: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#FFD600" stroke-width="2" fill="#FFF9C4"/>
                        <ellipse cx="9" cy="10" rx="1" ry="1.5" fill="#333"/>
                        <ellipse cx="15" cy="10" rx="1" ry="1.5" fill="#333"/>
                        <path d="M9.5 15c1 2 4 2 5 0" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>`,
            Sad:   `<svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#2196F3" stroke-width="2" fill="#E3F2FD"/>
                        <ellipse cx="9" cy="10" rx="1" ry="1.5" fill="#333"/>
                        <ellipse cx="15" cy="10" rx="1" ry="1.5" fill="#333"/>
                        <path d="M9.5 16c1-2 4-2 5 0" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>`,
            Tired: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#90A4AE" stroke-width="2" fill="#ECEFF1"/>
                        <path d="M6 10c1-1 4-1 4 0" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M13 10c1-1 3-1 4 0" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M9 16h6" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>`
        };

    // Loop through entries and create html for each
    entries.forEach(entry => {
        // Create mood html
        let moodHtml = "";
        if (entry.moods.length > 1) {
            moodHtml = `<div class="entry-mood-container">` +
                entry.moods.map(mood =>
                    `<span class="entry-mood">${moodSvgs[mood]}${mood}</span>`
                ).join("") +
                `</div>`;
        } else if (entry.moods.length === 1) {
            const mood = entry.moods[0];
            moodHtml = `<span class="entry-mood">${moodSvgs[mood]}${mood}</span>`;
        }

        // Create html for the image component of the entry
        const imageHtml = entry.image
            ? `<img src="${entry.image}" alt="Entry Image" class="entry-image">`
            : "";

        // Create html for the entry overall
        const entryHtml = `
            <div class="entry">
                <div class="entry-header">
                    <span class="entry-date-time">${entry.datetime}</span>
                    <span class="entry-sleep">Sleep Time: ${entry.sleep} Hours</span>
                </div>
                <div class="entry-content">
                    ${imageHtml}
                    <div class="entry-text">
                        <p>${entry.text}</p>
                        ${moodHtml}
                    </div>
                </div>
            </div>
        `;
        entriesList.innerHTML += entryHtml; // Append entry html to entriesList
    });
}