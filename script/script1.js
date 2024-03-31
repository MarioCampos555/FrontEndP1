const questions = [
    { question: "What fast food restaurant is known for its golden arches?", choices: ["KFC", "Subway", "McDonald's", "Burger King"], answer: "McDonald's" },
    { question: "Which fast food chain specializes in tacos and burritos?", choices: ["Chipotle", "Taco Bell", "Del Taco", "Qdoba"], answer: "Taco Bell" },
    { question: "In which fast food restaurant can you order a Frosty?", choices: ["Wendy's", "McDonald's", "Burger King", "Carl's Jr."], answer: "Wendy's" },
    { question: "Which fast food chain is known for its 'square' hamburgers?", choices: ["McDonald's", "Wendy's", "In-N-Out", "Whataburger"], answer: "Wendy's" },
    { question: "What is the main ingredient of a McDonald's Big Mac Sauce?", choices: ["Mayonnaise", "Mustard", "Ketchup", "Relish"], answer: "Mayonnaise" },
    { question: "Which chain introduced the concept of a 'drive-thru' window?", choices: ["McDonald's", "Jack in the Box", "Wendy's", "In-N-Out Burger"], answer: "Jack in the Box" },
    { question: "What fast food chain is known for its chicken sandwiches?", choices: ["KFC", "Chick-fil-A", "Popeyes", "Church's Chicken"], answer: "Chick-fil-A" },
    { question: "Which pizza chain is famous for its 'stuffed crust' pizza?", choices: ["Domino's", "Pizza Hut", "Papa John's", "Little Caesars"], answer: "Pizza Hut" },
    { question: "Where can you buy a 'Whopper'?", choices: ["McDonald's", "Burger King", "Wendy's", "Carl's Jr."], answer: "Burger King" },
    { question: "What is the signature menu item at KFC?", choices: ["Chicken Sandwich", "Chicken Nuggets", "Fried Chicken", "Chicken Tenders"], answer: "Fried Chicken" },
    { question: "Which fast food chain has a mascot named Ronald McDonald?", choices: ["KFC", "McDonald's", "Burger King", "Wendy's"], answer: "McDonald's" }
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

