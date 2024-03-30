const questions = [
    { question: "What is the capital of France?", choices: ["Paris", "London", "Rome", "Madrid"], answer: "Paris" },
    { question: "Who painted the Mona Lisa?", choices: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], answer: "Leonardo da Vinci" },
    { question: "Which planet is known as the Red Planet?", choices: ["Mars", "Jupiter", "Saturn", "Venus"], answer: "Mars" },
    { question: "What is the largest ocean on Earth?", choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
    { question: "In what year did the Titanic sink?", choices: ["1912", "1911", "1915", "1905"], answer: "1912" },
    { question: "Which element is said to keep bones strong?", choices: ["Calcium", "Iron", "Oxygen", "Hydrogen"], answer: "Calcium" },
    { question: "What is the capital of Australia?", choices: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
    { question: "How many continents are there?", choices: ["5", "6", "7", "8"], answer: "7" },
    { question: "What is the largest country by area?", choices: ["Russia", "Canada", "China", "United States"], answer: "Russia" },
    { question: "Who wrote 'Hamlet'?", choices: ["William Shakespeare", "Charles Dickens", "Leo Tolstoy", "Mark Twain"], answer: "William Shakespeare" },
    { question: "Which is the longest river in the world?", choices: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" }
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

