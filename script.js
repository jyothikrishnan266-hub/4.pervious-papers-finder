// ========================================
// Previous Papers Finder
// ========================================


// Sample paper database
let papers = JSON.parse(
    localStorage.getItem("previousPapers")
) || [

    {
        id: 1,
        subject: "Data Structures",
        year: 2025,
        exam: "B.Tech CSE - Semester 3",
        topics: [
            "Arrays",
            "Linked Lists",
            "Stacks",
            "Queues",
            "Trees"
        ],
        link: "#"
    },

    {
        id: 2,
        subject: "Data Structures",
        year: 2024,
        exam: "B.Tech CSE - Semester 3",
        topics: [
            "Arrays",
            "Stacks",
            "Queues",
            "Trees"
        ],
        link: "#"
    },

    {
        id: 3,
        subject: "Database Management Systems",
        year: 2025,
        exam: "B.Tech CSE - Semester 4",
        topics: [
            "SQL",
            "Normalization",
            "ER Model",
            "Transactions"
        ],
        link: "#"
    },

    {
        id: 4,
        subject: "Computer Networks",
        year: 2024,
        exam: "B.Tech CSE - Semester 4",
        topics: [
            "OSI Model",
            "TCP/IP",
            "Routing",
            "Network Security"
        ],
        link: "#"
    },

    {
        id: 5,
        subject: "Operating Systems",
        year: 2023,
        exam: "B.Tech CSE - Semester 4",
        topics: [
            "Processes",
            "Scheduling",
            "Deadlocks",
            "Memory Management"
        ],
        link: "#"
    },

    {
        id: 6,
        subject: "Java Programming",
        year: 2025,
        exam: "B.Tech CSE - Semester 3",
        topics: [
            "OOP",
            "Classes",
            "Inheritance",
            "Exception Handling"
        ],
        link: "#"
    },

    {
        id: 7,
        subject: "Machine Learning",
        year: 2024,
        exam: "B.Tech CSE - Semester 6",
        topics: [
            "Regression",
            "Classification",
            "Clustering",
            "Decision Trees"
        ],
        link: "#"
    },

    {
        id: 8,
        subject: "Computer Organization",
        year: 2023,
        exam: "B.Tech CSE - Semester 3",
        topics: [
            "CPU",
            "Memory",
            "Cache",
            "Instruction Set"
        ],
        link: "#"
    }

];


// ========================================
// Save Papers
// ========================================

function savePapers() {

    localStorage.setItem(
        "previousPapers",
        JSON.stringify(papers)
    );
}


// ========================================
// Initialize
// ========================================

function initialize() {

    populateYears();

    populateTopics();

    displayTopicIndex();

    displayPapers(papers);

    updateDashboard();
}


// ========================================
// Populate Years
// ========================================

function populateYears() {

    const yearFilter =
        document.getElementById("yearFilter");

    const years = [
        ...new Set(
            papers.map(paper => paper.year)
        )
    ];

    years.sort((a, b) => b - a);

    yearFilter.innerHTML =
        `<option value="all">All Years</option>`;

    years.forEach(year => {

        yearFilter.innerHTML += `
            <option value="${year}">
                ${year}
            </option>
        `;
    });
}


// ========================================
// Populate Topics
// ========================================

function populateTopics() {

    const topicFilter =
        document.getElementById("topicFilter");

    const topics = getAllTopics();

    topicFilter.innerHTML =
        `<option value="all">All Topics</option>`;

    topics.sort().forEach(topic => {

        topicFilter.innerHTML += `
            <option value="${topic}">
                ${topic}
            </option>
        `;
    });
}


// ========================================
// Get All Topics
// ========================================

function getAllTopics() {

    const topics = new Set();

    papers.forEach(paper => {

        paper.topics.forEach(topic => {

            topics.add(topic);

        });

    });

    return [...topics];
}


// ========================================
// Display Topic Index
// ========================================

function displayTopicIndex() {

    const container =
        document.getElementById("topicIndex");

    container.innerHTML = "";

    const topics = getAllTopics();

    topics.sort().forEach(topic => {

        const button =
            document.createElement("div");

        button.className = "topic";

        button.textContent = topic;

        button.onclick = function() {

            document.getElementById(
                "topicFilter"
            ).value = topic;

            searchPapers();

        };

        container.appendChild(button);

    });
}


// ========================================
// Search Papers
// ========================================

function searchPapers() {

    const subject =
        document
            .getElementById("subjectSearch")
            .value
            .toLowerCase()
            .trim();

    const year =
        document.getElementById(
            "yearFilter"
        ).value;

    const topic =
        document.getElementById(
            "topicFilter"
        ).value;


    const results = papers.filter(paper => {

        // Subject matching
        const subjectMatch =
            paper.subject
                .toLowerCase()
                .includes(subject);


        // Year matching
        const yearMatch =
            year === "all" ||
            paper.year.toString() === year;


        // Topic matching
        const topicMatch =
            topic === "all" ||
            paper.topics.includes(topic);


        return (
            subjectMatch &&
            yearMatch &&
            topicMatch
        );

    });


    displayPapers(results);
}


// ========================================
// Display Papers
// ========================================

function displayPapers(list) {

    const container =
        document.getElementById("paperList");

    const count =
        document.getElementById("resultCount");

    container.innerHTML = "";

    count.textContent =
        `${list.length} paper${list.length !== 1 ? "s" : ""} found`;


    if (list.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <h3>📭 No papers found</h3>
                <p>
                    Try another subject, year or topic.
                </p>
            </div>
        `;

        return;
    }


    list.forEach(paper => {

        const card =
            document.createElement("div");

        card.className = "paper-card";


        const topics =
            paper.topics.map(topic => `
                <span class="topic-tag">
                    ${topic}
                </span>
            `).join("");


        card.innerHTML = `

            <h3>
                ${paper.subject}
            </h3>

            <div class="paper-info">
                <span class="year">
                    ${paper.year}
                </span>
            </div>

            <div class="paper-info exam">
                📘 ${paper.exam}
            </div>

            <div class="topic-tags">
                ${topics}
            </div>

            <a
                href="${paper.link}"
                target="_blank"
                class="view-btn"
            >
                📄 View Paper
            </a>

            <button
                class="delete-btn"
                onclick="deletePaper(${paper.id})"
            >
                Delete
            </button>

        `;

        container.appendChild(card);

    });
}


// ========================================
// Reset Filters
// ========================================

function resetFilters() {

    document.getElementById(
        "subjectSearch"
    ).value = "";

    document.getElementById(
        "yearFilter"
    ).value = "all";

    document.getElementById(
        "topicFilter"
    ).value = "all";

    displayPapers(papers);
}


// ========================================
// Add Paper
// ========================================

document
    .getElementById("paperForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const subject =
                document
                    .getElementById("paperSubject")
                    .value
                    .trim();


            const year =
                Number(
                    document
                        .getElementById("paperYear")
                        .value
                );


            const topics =
                document
                    .getElementById("paperTopics")
                    .value
                    .split(",")
                    .map(topic => topic.trim())
                    .filter(topic => topic);


            const exam =
                document
                    .getElementById("paperExam")
                    .value
                    .trim();


            const link =
                document
                    .getElementById("paperLink")
                    .value
                    .trim() || "#";


            const newPaper = {

                id: Date.now(),

                subject,

                year,

                exam,

                topics,

                link

            };


            papers.push(newPaper);

            savePapers();

            populateYears();

            populateTopics();

            displayTopicIndex();

            displayPapers(papers);

            updateDashboard();

            this.reset();

        }
    );


// ========================================
// Delete Paper
// ========================================

function deletePaper(id) {

    if (
        !confirm(
            "Are you sure you want to delete this paper?"
        )
    ) {
        return;
    }


    papers =
        papers.filter(
            paper => paper.id !== id
        );


    savePapers();

    populateYears();

    populateTopics();

    displayTopicIndex();

    displayPapers(papers);

    updateDashboard();
}


// ========================================
// Dashboard
// ========================================

function updateDashboard() {

    const subjects =
        new Set(
            papers.map(
                paper => paper.subject
            )
        );


    const years =
        new Set(
            papers.map(
                paper => paper.year
            )
        );


    const topics =
        new Set(
            getAllTopics()
        );


    document.getElementById(
        "totalPapers"
    ).textContent = papers.length;


    document.getElementById(
        "totalSubjects"
    ).textContent = subjects.size;


    document.getElementById(
        "totalYears"
    ).textContent = years.size;


    document.getElementById(
        "totalTopics"
    ).textContent = topics.size;
}


// ========================================
// Live Search
// ========================================

document
    .getElementById("subjectSearch")
    .addEventListener(
        "input",
        searchPapers
    );


document
    .getElementById("yearFilter")
    .addEventListener(
        "change",
        searchPapers
    );


document
    .getElementById("topicFilter")
    .addEventListener(
        "change",
        searchPapers
    );


// ========================================
// Start Application
// ========================================

initialize();