/************************************
 * Scroll Animation (IntersectionObserver)
 ************************************/
const animateElements = document.querySelectorAll("[data-animate]");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

animateElements.forEach(el => observer.observe(el));


/************************************
 * Projects Configuration (Single Source)
 ************************************/
const projectsConfig = {
    "Weather_App": {
        displayName: "Weather App",
        image: "images/project1.jpg",
        liveUrl: "https://mayuri-vaddempudi.github.io/Weather_App/",
        description:
            "A weather application that fetches real-time data using a public API, allowing users to search cities and view current conditions and forecasts."
    },
    "fg-git-group-assignment": {
        displayName: "Git Group Assignment",
        image: "images/project6.jpg",
        liveUrl: "https://mayuri-vaddempudi.github.io/fg-git-group-assignment/",
        description:
            "A collaborative Git and GitHub group assignment focused on version control, branching, pull requests, and team workflows."
    },
    "FG-AnimalZoo-GroupAssignment": {
        displayName: "FG Animal Zoo (Group Project)",
        image: "images/project2.jpg",
        liveUrl: "https://fg-animal-zoo-group-assignment.vercel.app",
        description:
            "A responsive group project simulating an animal zoo website, built with modern HTML, CSS, and JavaScript."
    },
    "FG-Assignment_1": {
        displayName: "Frontend Assignment 1",
        image: "images/project5.jpg",
        liveUrl: "https://mayuri-vaddempudi.github.io/FG-Assignment_1/",
        description:
            "A foundational frontend assignment demonstrating semantic HTML structure, CSS styling, and basic interactivity."
    },
    "Memory_Game-Color_cards": {
        displayName: "Memory Game",
        image: "images/project3.jpg",
        liveUrl: "https://mayuri-vaddempudi.github.io/Memory_Game-Color_cards/",
        description:
            "An interactive memory game where users match color cards, improving logic and memory skills using JavaScript."
    },
    "Tic_Tac_Toe": {
        displayName: "Tic Tac Toe",
        image: "images/project7.jpg",
        liveUrl: "https://mayuri-vaddempudi.github.io/Tic_Tac_Toe/",
        description:
            "A classic Tic Tac Toe game built with JavaScript, featuring win detection and a clean, user-friendly interface."
    },
    "Word-Guess-Game": {
        displayName: "Word Guess Game",
        image: "images/project4.jpg",
        liveUrl: "https://mayuri-vaddempudi.github.io/Word-Guess-Game/",
        description:
            "A word guessing game that challenges users to identify hidden words with limited attempts."
    },
    "rack_paper_scissors": {
        displayName: "Rock Paper Scissors",
        image: "images/project8.jpg",
        liveUrl: "https://mayuri-vaddempudi.github.io/rack_paper_scissors/",
        description:
            "A simple Rock, Paper, Scissors game built with JavaScript, demonstrating conditional logic and user interaction."
    },
    "text_adventure_game": {
        displayName: "Text Adventure Game",
        image: "images/project9.jpg",
        liveUrl: "https://mayuri-vaddempudi.github.io/text_adventure_game/",
        description:
            "A text-based adventure game where users make choices to navigate through different story paths."
    }
};


/************************************
 * Fetch & Render Projects
 ************************************/
const projectsContainer = document.getElementById("projects");

Promise.all([
    fetch("https://api.github.com/users/mayuri-vaddempudi/repos").then(r => r.json()),
    fetch("https://api.github.com/users/SuneethaBandaru/repos").then(r => r.json())
])
    .then(([myRepos, suneethaRepos]) => {
        const combinedRepos = [...myRepos, ...suneethaRepos];

        // Filter only configured projects
        const selectedProjects = combinedRepos.filter(repo =>
            projectsConfig.hasOwnProperty(repo.name)
        );

        if (!selectedProjects.length) {
            projectsContainer.innerHTML = "<p>No projects found.</p>";
            return;
        }

        selectedProjects.forEach((repo, index) => {
            const config = projectsConfig[repo.name];
            if (!config) return;

            const card = document.createElement("div");
            card.className = "project-card";
            card.style.transitionDelay = `${index * 100}ms`;

            const liveLink = config.liveUrl
                ? `<a href="${config.liveUrl}" target="_blank">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                   </a>`
                : `<span class="disabled">No Live Demo</span>`;

            card.innerHTML = `
                <div class="project-image-wrapper">
                    <img src="${config.image}" alt="${config.displayName}" class="project-img" />
                    <div class="project-overlay">
                        <p>${config.description}</p>
                    </div>
                </div>

                <div class="project-content">
                    <h3>${config.displayName}</h3>
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
    .catch(error => {
        console.error(error);
        projectsContainer.innerHTML = "<p>Could not load projects.</p>";
    });
