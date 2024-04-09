const questions = [
    { question: "What is the name of the game engine owned by Epic Games, the company behind Fortnite?", choices: ["EA Games", "Rockstar Studios", "Epic Games", "Riot Games"], answer: "Epic Games" } , 
    { question: "Making his debut in 1990's Super Mario World, what is the name of the enemy-eating, egg-throwing green dinosaur who serves as a sidekick to Mario and Luigi in the Mario franchise?", choices: ["Luigi", "Birdo", "Toad", "Yoshi"], answer: "Yoshi" } , 
    { question: "What is thought to be the first video game, created in 1958 and becoming popular in the 1970s?", choices: ["Pac Man", "Pong", "Space Invaders", "Alien Invasion"], answer: "Pong" } , 
    { question: "Which video game console released in 2006 pioneered the use of motion controls in its gameplay?", choices: ["Nintendo Wii", "Xbox Connect", "Playstation 3", "Nintendo DSi"], answer: "Nintendo Wii" } , 
    { question: "In Mario Kart, the power-up that seeks out the player in first position and explodes on impact is a shell that is what color?", choices: ["Yellow", "Blue", "Green", "Red"], answer: "Blue" } , 
    { question: "Pocket, Light, Color, and Advance were all styles or variants of what video game hardware system?", choices: ["Atari", "Playstation 1", "Game Boy"], answer: "Game Boy" } ,
    { question: "What card game related to the Warcraft universe did Blizzard release in 2014?", choices: ["Hearthstone", "Slay the Spire", "World of Warcraft", "Warcraft III"], answer: "Hearthstone" }
];
let currentQuestionIndex = 0;
let score = 0;
let timer = 30;
let timerInterval;

function startTimer() {
    timer = 30; // Reset timer to 30 seconds for each question
    document.getElementById('timer').textContent = `Time: ${timer}`;
    clearInterval(timerInterval); // Clear existing timer
    timerInterval = setInterval(function() {
        timer--;
        document.getElementById('timer').textContent = `Time: ${timer}`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            checkAnswer(); // Automatically move to next question
        }
    }, 1000);
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    currentQuestion.choices.forEach(choice => {
        const label = document.createElement('label');
        label.textContent = choice;
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'choice';
        radio.value = choice;
        label.prepend(radio);
        choicesContainer.appendChild(label);
    });
}

function checkAnswer() {
    clearInterval(timerInterval); // Stop the timer as we're moving to the next question or showing results
    const selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (selectedChoice && selectedChoice.value === questions[currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-container').innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2> <button id="restart-btn" class="btn btn-primary">Restart Quiz</button>`;
    document.getElementById('restart-btn').addEventListener('click', () => window.location.reload());
}

document.getElementById('next-btn').addEventListener('click', function() {
    checkAnswer(); // 
});

// Start the quiz
displayQuestion();

