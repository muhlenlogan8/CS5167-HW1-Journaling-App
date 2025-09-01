// JavaScript file for App

// Entry Data //
// User entries array with existing entries data
const entries = [
    {

        image: "assets/entry1.jpg",
        datetime: "08/30/2025 11:31 pm",
        sleep: 9,
        moods: ["happy"],
        text: "Today was a good day!"
    },
    {
        image: "assets/entry2.jpg",
        datetime: "08/28/2025 9:02 am",
        sleep: 4,
        moods: ["tired", "happy"],
        text: "Very tired today this morning but I'm happy and hopeful for today"
    },
    {
        image: "assets/entry2.jpg",
        datetime: "08/24/2025 1:42 pm",
        sleep: 7,
        moods: ["sad"],
        text: "Today hasn't been great so far."
    },
    {
        image: "assets/entry2.jpg",
        datetime: "08/17/2025 1:42 pm",
        sleep: 11,
        moods: ["happy"],
        text: "I slept so much today this is awesome!"
    }
];

// Event Listeners //
// Overall event listener on page load
document.addEventListener("DOMContentLoaded", () => {
    displayEntries();
    updateSummary();
    sleepInputListener();
    moodCheckboxListener();
});

// If the sleep input changes, update the summary to reflect this
function sleepInputListener() {
    const sleepInput = document.getElementById("sleep-hours");
    sleepInput.addEventListener("input", () => {
        console.log("Sleep input changed:", sleepInput.value);
    });
}

// If the mood checkboxes change, update the summary to reflect this
function moodCheckboxListener() {
    const moodCheckboxes = document.querySelectorAll('input[name="mood"]');
    // Add an eventListener for each checkbox so we detect if any one of them changes
    moodCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const checkedMoods = Array.from(moodCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            console.log("Mood checkbox changed. Checked moods:", checkedMoods);
        });
    });
}

// Summary Function //
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
    document.getElementById('summary-avg-sleep').textContent = averageSleep;

    // Get mood counts
    let happyCount = 0;
    let sadCount = 0;
    let tiredCount = 0;
    entries.forEach(entry => {
        if (entry.moods.includes("happy")) happyCount++;
        if (entry.moods.includes("sad")) sadCount++;
        if (entry.moods.includes("tired")) tiredCount++;
    });

    // Show mood counts in the summary
    document.getElementById('summary-happy-count').textContent = happyCount;
    document.getElementById('summary-sad-count').textContent = sadCount;
    document.getElementById('summary-tired-count').textContent = tiredCount;
}


// Render entries logic (Creating html components which will be added inside of a div or section already present in index.html)
function displayEntries() {
    const entriesList = document.querySelector(".entries-list"); // Get the entries list container
    entriesList.innerHTML = "" // Reinitialize entries html

    // Set present svgs to use in the rendering of an entry
        const moodSvgs = {
            happy: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#FFD600" stroke-width="2" fill="#FFF9C4"/>
                        <ellipse cx="9" cy="10" rx="1" ry="1.5" fill="#333"/>
                        <ellipse cx="15" cy="10" rx="1" ry="1.5" fill="#333"/>
                        <path d="M9.5 15c1 2 4 2 5 0" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>`,
            sad:   `<svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#2196F3" stroke-width="2" fill="#E3F2FD"/>
                        <ellipse cx="9" cy="10" rx="1" ry="1.5" fill="#333"/>
                        <ellipse cx="15" cy="10" rx="1" ry="1.5" fill="#333"/>
                        <path d="M9.5 16c1-2 4-2 5 0" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>`,
            tired: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#90A4AE" stroke-width="2" fill="#ECEFF1"/>
                        <path d="M6 10c1-1 4-1 4 0" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M13 10c1-1 3-1 4 0" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M9 16h6" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>`
        };

    // Loop through entries and create html for each
    entries.forEach(entry => {
        // Create mood html
        let moodHtml = '';
        if (entry.moods.length > 1) {
            moodHtml = `<div class="entry-mood-container">` +
                entry.moods.map(mood =>
                    `<span class="entry-mood">${moodSvgs[mood] || ''}${mood.charAt(0).toUpperCase() + mood.slice(1)}</span>`
                ).join('') +
                `</div>`;
        } else if (entry.moods.length === 1) {
            const mood = entry.moods[0];
            moodHtml = `<span class="entry-mood">${moodSvgs[mood] || ''}${mood.charAt(0).toUpperCase() + mood.slice(1)}</span>`;
        }

        // Create html for the image component of the entry
        const imageHtml = entry.image
            ? `<img src="${entry.image}" alt="Entry Image" class="entry-image">`
            : "";

        // Create entry html
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