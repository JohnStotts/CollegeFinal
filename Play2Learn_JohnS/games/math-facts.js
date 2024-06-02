document.addEventListener('DOMContentLoaded', function() {
    // Refernces
    const operationSelect = document.getElementById('operation');
    const startButton = document.getElementById('start');
    const gameBox = document.getElementById('game-box');
    const problemDisplay = document.getElementById('problem');
    const userAnswer = document.getElementById('user-input');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const finalResults = document.getElementById('final-score');
    const replayButton = document.getElementById('replay');
    const clearButton = document.getElementById('clear');
    const settingsHide = document.getElementById('settings');
    const userInstruction = document.getElementById('instructions');
    const checkBtn = document.getElementById('check-answer');
    const bravoPic = document.getElementById('bravo-pic');

    // Initializing......
    let currentProblem;
    let score = 0;
    let timeLeft = 30;
    let timerInterval;
    let gameStarted = false;

    // Function to generate problems
    function generateNewProblem() {
        const operators = ['+', '-', '*', '/'];
        // choose operator based on waht user's seclected
        const operator = operators[operationSelect.selectedIndex];
        let number1, number2;

        // Generate random #'s based on the selected operator
        switch(operator) {
            case '+':
                number1 = Math.floor(Math.random() * 10);
                number2 = Math.floor(Math.random() * 10);
                break;

            case '-':
                number1 = Math.floor(Math.random() * 20); //included larger numbers for harder arithmetic
                number2 = Math.floor(Math.random() * number1); // should also eliminate negative numbers? 
                break;

            case '*':
                number1 = Math.floor(Math.random() * 10);
                number2 = Math.floor(Math.random() * 10);
                break;

            case '/':
                number2 = Math.floor(Math.random() * 9) + 1; // Avoid division by zero bc thats impossible!!
                number1 = number2 * Math.floor(Math.random() * 10);
                break;

            default: 
                number1 = Math.floor(Math.random() * 10);
                number2 = Math.floor(Math.random() * 10);
        }
        
        // Return the generated problem as a string
        return `${number1} ${operator} ${number2} = ?`;
    }

   
    function displayCurrentProblem() {
        currentProblem = generateNewProblem();
        problemDisplay.textContent = currentProblem;
    }


    function updateTimer() {
        timeLeft--;
        timerDisplay.textContent = `Countdown: ${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endCurrentGame();
            gameBox.style.display = 'none';
            timerDisplay.style.display = 'none';
            replayButton.style.display = 'block';
            finalResults.style.display = 'block';
            scoreDisplay.style.display = 'none';
            userAnswer.style.display = 'none';
            settingsHide.style.display = 'none';
            userInstruction.style.display = 'none';

        }
    }

    // Start new game // hide or show certain elements upon start
    function startNewGame() {
        if (!gameStarted) {
            gameStarted = true;
            gameBox.style.display = 'block';
            document.getElementById('user-box').style.display = 'flex';
            displayCurrentProblem();
            score = 0;
            scoreDisplay.textContent = `Score: 0`;
            timeLeft = 30;
            timerDisplay.textContent = `Countdown: 30`;
            timerInterval = setInterval(updateTimer, 1000);
            userAnswer.focus();
            operationSelect.style.display = 'none';
            startButton.style.display = 'none';
            timerDisplay.style.display = 'block';
            replayButton.style.display = 'none';
            scoreDisplay.style.display = 'block';
            settingsHide.style.display = 'none';
            checkBtn.style.display = 'block';
            userInstruction.style.display = 'none';
            
        } 
    }
    // Fianlly got it to check the user's answer and move 2 next question
    function checkAnswerNextQ() {
        const answerInput = userAnswer.value.trim();
        const [number1, operator, number2] = currentProblem.split(' ');
        // breaks user input down into strings that can easily be evaluated !
        let correctAnswer;
        switch (operator) {
            case '+':
                correctAnswer = parseInt(number1) + parseInt(number2);
                break;
            
            case '-':
                correctAnswer = parseInt(number1) - parseInt(number2);
                break;
            
            case '*':
                correctAnswer = parseInt(number1) * parseInt(number2);
                break;
               
            case '/':
                correctAnswer = parseInt(number1) / parseInt(number2);
                break;
        }
        // point system
        if (parseFloat(answerInput) === correctAnswer) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }

        userAnswer.value = '';
        displayCurrentProblem();
    }
  
    // hide or show items when game ends 
    function endCurrentGame() {
        clearInterval(timerInterval);
        finalResults.textContent = `Final Score: ${score}`;
        finalResults.style.display = 'block';
        checkBtn.style.display = 'none';
        bravoPic.style.display = 'block'

    }

    startButton.addEventListener('click', startNewGame);

    checkBtn.addEventListener('click', checkAnswerNextQ);

    // makes enter button work as check
    userAnswer.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.target.tagName !== 'BUTTON') {
            event.preventDefault();
            checkBtn.click();
        }
       
    });

    // activate replay button
    replayButton.addEventListener('click', function() {
        window.location.href = 'math-facts.html';
    });

    

    // make the numbers work
    const numberpadBtns = document.querySelectorAll('.number');
    numberpadBtns.forEach(button => {
        button.addEventListener('click', function() {
            userAnswer.value += button.textContent;
        });
    });

    // make that clear button work
    clearButton.addEventListener('click', function() {
        userAnswer.value = '';
    });
});
