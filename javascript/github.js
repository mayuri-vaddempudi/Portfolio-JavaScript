const projectsContainer = document.getElementById("projects");

// List of selected projects to show
const selectedProjectNames = [
    "Weather_App",
    "fg-git-group-assignment",
    "FG-AnimalZoo-GroupAssignment",
    "FG-Assignment_1",
    "Memory_Game-Color_cards",
    "Tic_Tac_Toe",
    "Word-Guess-Game",
    "rack_paper_scissors",
    "text_adventure_game"
];

// Map project names to Live URLs (empty string if no live link)
const liveURLs = {
    "FG-Assignment_1": "https://mayuri-vaddempudi.github.io/FG-Assignment_1/",
    "FG-AnimalZoo-GroupAssignment": "https://fg-animal-zoo-group-assignment.vercel.app",
    "Weather_App": " https://mayuri-vaddempudi.github.io/Weather_App/",
    "fg-git-group-assignment": "https://mayuri-vaddempudi.github.io/fg-git-group-assignment/",
    "Memory_Game-Color_cards": "https://mayuri-vaddempudi.github.io/Memory_Game-Color_cards/",
    "Tic_Tac_Toe": "https://mayuri-vaddempudi.github.io/Tic_Tac_Toe/",
    "Word-Guess-Game": "https://mayuri-vaddempudi.github.io/Word-Guess-Game/",
    "rack_paper_scissors": "https://mayuri-vaddempudi.github.io/rack_paper_scissors/",
    "text_adventure_game": " https://mayuri-vaddempudi.github.io/text_adventure_game/"
};
const projectDescriptions = {
    "Weather_App": "A weather application that fetches real-time data using a public API, allowing users to search cities and view current conditions and forecasts.",

    "fg-git-group-assignment": "A collaborative Git and GitHub group assignment focused on version control, branching, pull requests, and team workflows.",

    "FG-AnimalZoo-GroupAssignment": "A responsive group project simulating an animal zoo website, built with modern HTML, CSS, and JavaScript.",

    "FG-Assignment_1": "A foundational frontend assignment demonstrating semantic HTML structure, CSS styling, and basic interactivity.",

    "Memory_Game-Color_cards": "An interactive memory game where users match color cards, improving logic and memory skills using JavaScript.",

    "Tic_Tac_Toe": "A classic Tic Tac Toe game built with JavaScript, featuring win detection and a clean, user-friendly interface.",

    "Word-Guess-Game": "A word guessing game that challenges users to identify hidden words with limited attempts.",

    "rack_paper_scissors": "A simple Rock, Paper, Scissors game built with JavaScript, demonstrating conditional logic and user interaction.",

    "text_adventure_game": "A text-based adventure game where users make choices to navigate through different story paths."
};

// Fetch repos from both users
Promise.all([
    fetch("https://api.github.com/users/mayuri-vaddempudi/repos").then(r => r.json()),
    fetch("https://api.github.com/users/SuneethaBandaru/repos").then(r => r.json())
])
    .then(([myRepos, suneethaRepos]) => {
        // Combine repos from both users
        const combined = [...myRepos, ...suneethaRepos];

        // Filter only selected projects
        const selectedProjects = combined.filter(repo =>
            selectedProjectNames.includes(repo.name)
        );

        if (selectedProjects.length === 0) {
            projectsContainer.innerHTML = "<p>No projects found.</p>";
            return;
        }

        // Display cards
        selectedProjects.forEach((repo, index) => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.style.transitionDelay = `${index * 100}ms`;

            const projectImages = {
                "Weather_App": "images/project1.jpg",
                "fg-git-group-assignment": "images/project6.jpg",
                "FG-AnimalZoo-GroupAssignment": "images/project2.jpg",
                "FG-Assignment_1": "images/project5.jpg",
                "Memory_Game-Color_cards": "images/project3.jpg",
                "Tic_Tac_Toe": "images/project7.jpg",
                "Word-Guess-Game": "images/project4.jpg",
                "rack_paper_scissors": "images/project8.jpg",
                "text_adventure_game": "images/project9.jpg"
            };

            const displayName = repo.name === "FG-AnimalZoo-GroupAssignment"
                ? "FG Animal Zoo (Group Project)"
                : repo.name.replace(/-/g, " ");

            const liveLink = liveURLs[repo.name]
                ? `<a href="${liveURLs[repo.name]}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>`
                : `<span class="disabled">No Live Demo</span>`;

            card.innerHTML = `
                <div class="project-image-wrapper">
                    <img src="${projectImages[repo.name]}" alt="${displayName}" class="project-img" />
                    <div class="project-overlay">
                        <p>${projectDescriptions[repo.name]}</p>
                    </div>
                </div>
            
                <div class="project-content">
                    <h3>${displayName}</h3>
                    <div class="project-footer">
                        <a href="${repo.html_url}" target="_blank">
                            <i class="fa-brands fa-github"></i> GitHub
                        </a>
                        ${liveLink}
                    </div>
                </div>
            `;


            projectsContainer.appendChild(card);
        });

    })
    .catch(err => {
        projectsContainer.innerHTML = "<p>Could not load projects.</p>";
        console.error(err);
    });

