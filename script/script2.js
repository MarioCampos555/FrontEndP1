const questions = [
    { question: "Which of the following fruits are considered berries?", choices: ["Starberries", "Apples", "Mangos", "Bananas"], answer: "Bananas" },
    { question: "How many seeds can a pomegranate hold up to?", choices: ["100", " 540", "1400", "2000"], answer: "1400" },
    { question: "Which fruit holds more vitamin C?", choices: ["Kiwis", "Oranges", "Grapes", "Pomegranates"], answer: "Kiwis" },
    { question: "What is the science of fruit growing called?", choices: ["Fromology", "Fructology", "Pomology", "Dendrology"], answer: "Pomology" } ,
    { question: "Which fruit tastes like chocolate pudding?", choices: ["Cherimoya", "Fruit of the Hala AKA Puhala Tree", "Black Sapote", "Quince"], answer: "Black Sapote" } ,
    { question: "Which fruit is a hybrid of the pomelo and mandarin?", choices: ["Lemon", "Lime", "Kumquat", "Orange"], answer: "Orange" } ,
    { question: "Which fruit looks like an inside-out starberry?", choices: ["Pineberry", "Cloudberry", "Farkleberry", "Salmonberry"], answer: "Pineberry" }
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

