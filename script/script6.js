const questions = [
    { question: "What is the chemical symbol for Gold?", choices: ["Au", "Ag", "Ge", "Ga"], answer: "Au" },
    { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "What force pulls objects towards the earth?", choices: ["Magnetism", "Gravity", "Electrostatic Force", "Nuclear Force"], answer: "Gravity" },
    { question: "Which gas is most abundant in the Earth's atmosphere?", choices: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"], answer: "Nitrogen" },
    { question: "What is the hardest natural substance on Earth?", choices: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 30; // seconds
let timerInterval;

// Functions: startTimer, displayQuestion, checkAnswer, showResults


function startTimer() {
    timer = 30; 
    document.getElementById('timer').textContent = `Time: ${timer}`;
    clearInterval(timerInterval); 
    timerInterval = setInterval(function() {
        timer--;
        document.getElementById('timer').textContent = `Time: ${timer}`;
        if (timer <= 0) {
            clearInterval(timerInterval);
            checkAnswer();
        }
    }, 1000);
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('btn', 'btn-info', 'm-2');
        button.onclick = () => selectAnswer(choice);
        choicesContainer.appendChild(button);
    });
    startTimer();
}

function selectAnswer(choice) {
    if (choice === questions[currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    displayQuestion();
}

function checkAnswer() {
    // Function to handle timeout scenarios
    selectAnswer(''); // Passing empty string as no answer
}

function showResults() {
    document.getElementById('quiz-container').innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2> <button id="restart-btn" class="btn btn-primary">Restart Quiz</button>`;
    document.getElementById('restart-btn').onclick = () => window.location.reload();
}

document.getElementById('next-btn').addEventListener('click', checkAnswer);
displayQuestion();
