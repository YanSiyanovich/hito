let questionQueue = [];
let currentQuestion = null;
let answerStatus = "unanswered";

const activeLesson = window.lesson || { questions: [] };

function shuffleQuestions(questions) {
    const shuffled = [...questions];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

function showScreen(screenName) {
    const homeScreen = document.getElementById("home-screen");
    const quizScreen = document.getElementById("screen-quiz");

    if (homeScreen) {
        homeScreen.style.display = screenName === "home" ? "" : "none";
    }

    if (quizScreen) {
        quizScreen.style.display = screenName === "quiz" ? "" : "none";
    }
}

function startQuiz() {
    questionQueue = shuffleQuestions(activeLesson.questions);
    currentQuestion = null;
    answerStatus = "unanswered";

    const quizInput = document.getElementById("quiz-input");
    const nextButton = document.getElementById("NextBtn");

    if (quizInput) {
        quizInput.style.display = "";
    }

    if (nextButton) {
        nextButton.style.display = "";
        nextButton.textContent = "Submit in ひらがな";
    }

    showScreen("quiz");
    nextQuestion();
}

function showQuestion() {
    const questionEl = document.getElementById("quiz-question");
    const quizInput = document.getElementById("quiz-input");
    const feedbackEl = document.getElementById("quiz-feedback");

    if (!questionEl || !quizInput || !feedbackEl || !currentQuestion) {
        return;
    }

    questionEl.textContent = currentQuestion.prompt;
    quizInput.value = "";
    feedbackEl.textContent = "";
    answerStatus = "unanswered";
}

function nextQuestion() {
    if (questionQueue.length === 0) {
        finishQuiz();
        return;
    }

    currentQuestion = questionQueue.shift();
    showQuestion();
}

function checkAnswer() {
    if (!currentQuestion) {
        return false;
    }

    const input = document.getElementById("quiz-input")
        .value.trim();

    const correctAnswers = Array.isArray(currentQuestion.answer)
        ? currentQuestion.answer
        : [currentQuestion.answer];

    return correctAnswers.some(
        answer => input === answer.trim()
    );
}

function isAlternateAnswer(input) {
    const alternateAnswers = currentQuestion?.alternateAnswers || [];

    return alternateAnswers.some(
        answer => input === answer.trim()
    );
}

function submitAnswer() {
    const fb = document.getElementById("quiz-feedback");
    const quizInput = document.getElementById("quiz-input");
    const nextButton = document.getElementById("NextBtn");

    if (answerStatus === "failed") {
        startQuiz();
        return;
    }

    if (!currentQuestion) {
        return;
    }

    if (answerStatus === "correct") {
        nextQuestion();
        return;
    }

    const input = quizInput ? quizInput.value.trim() : "";

    if (!input) {
        if (fb) {
            fb.textContent = "Type an answer first.";
        }
        return;
    }

    if (checkAnswer()) {
        if (fb) {
            fb.textContent = "Correct!";
        }
        answerStatus = "correct";
    } else if (isAlternateAnswer(input)) {
        if (fb) {
            fb.textContent = `That's also correct! Please enter the more common reading.`;
        }

        if (quizInput) {
            quizInput.value = "";
            quizInput.focus();
        }
    } else {
        if (fb) {
            fb.textContent = "Game over! One mistake and you're done.";
        }

        answerStatus = "failed";

        if (quizInput) {
            quizInput.style.display = "none";
        }

        if (nextButton) {
            nextButton.textContent = "Retry";
        }
    }
}

function finishQuiz() {
    const questionEl = document.getElementById("quiz-question");
    const quizInput = document.getElementById("quiz-input");
    const nextButton = document.getElementById("NextBtn");
    const feedbackEl = document.getElementById("quiz-feedback");

    if (questionEl) {
        questionEl.textContent = "お疲れ様！ You cleared the run!";
    }

    if (quizInput) {
        quizInput.style.display = "none";
    }

    if (nextButton) {
        nextButton.style.display = "none";
    }

    if (feedbackEl) {
        feedbackEl.textContent = "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("button1");
    const nextButton = document.getElementById("NextBtn");
    const quizInput = document.getElementById("quiz-input");

    if (startButton) {
        startButton.addEventListener("click", startQuiz);
    }

    if (nextButton) {
        nextButton.addEventListener("click", submitAnswer);
    }

    if (quizInput) {
        quizInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                submitAnswer();
            }
        });
    }
});
