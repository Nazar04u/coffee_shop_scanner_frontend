const BaseData = [
    {
        question: "In what country you are looking for a place?",
        options: ["USA", "United Kingdom", "France"]
    },
    {
        question: 'You find a place for what',
        options: ['Business', 'Living', 'Storage'],
    },
];

const BusinessData = [
    {
        question: "In what industry is your business?",
        options: ["Technical industry (IT industry, banking, finances, sales...)",
                "Entertainment industry (clubs, tourism...)", "Services (gym, tutoring...)", "Shop/store (coffee shop, a product store, a clothing store)"]    
    },
    {
        question: "How big is your business?",
        options: ["startup (only start)", "small (up to 5 employers)", "medium-size (5-10 employers)", "big (more than 10 employers)"]
    },
    {
        question: "Do you want to buy or rent?",
        options: ["Buy", "Rent"]
    },
    {
        question: "Your budget is ...",
        options: ["Under $50000", "From $50000-100000", "More than $1000000"],
    }
];

const LivingData = [
    {
        question: "How many people will live in a place you are looking for?",
        options: ["1-2", "3-4", "5-6", "more than 6"]
    },
    {
        question: "How many bedrooms do you want?",
        options: ["1-2", "3-4", "more than 4"]
    },
    {
        question: "How many bathrooms do you want?",
        options: ["1-2", "3-4", "more than 4"]
    },
    {
        question: "Do you want a backyard?",
        options: ["Yes", "No"]
    },
    {
        question: "Do you want to buy or rent?",
        options: ["Buy", "Rent"]
    },
    {
        question: "Your budget is ...",
        options: ["Under $50000", "From $50000-100000", "More than $1000000"],
    }
];

const StorageData = [
    {
        question: "What is the area you are looking for?",
        options: ["250 sq m", "250-500 sq m", "500-1000 sq m", "more than 1000 sq m"] 
    },
    {
        question: "What will you store there?",
        options: ["Food", "Building material", "Electronics"]
    },
    {
        question: "Do you want to buy or rent?",
        options: ["Buy", "Rent"]
    },
    {
        question: "Your budget is ...",
        options: ["Under $50000", "From $50000-100000", "More than $1000000"],
    }
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const introContainer = document.getElementById('intro');
const thanksContainer = document.getElementById('thanks');
const startQuizButton = document.getElementById('startQuiz');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const showResults = document.getElementById('showResults')

let currentCategory = null;
let currentQuestion = 0;

function displayThanks() {
    quizContainer.style.display = 'none';
    introContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    thanksContainer.style.display = 'block';
}

function startQuiz() {
    introContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    thanksContainer.style.display = 'none';
    currentCategory = null;
    displayQuestion();
}

function displayQuestion() {
    if (currentCategory === null) {
        currentCategory = BaseData;
    } else if (currentCategory === BaseData) {
        const answer = getSelectedAnswer();
        currentCategory = getSubCategory(answer);
    }

    if (currentQuestion < currentCategory.length) {
        const questionData = currentCategory[currentQuestion];

        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = questionData.question;

        const optionsElement = document.createElement('div');
        optionsElement.className = 'options';

        for (let i = 0; i < questionData.options.length; i++) {
            const option = document.createElement('label');
            option.className = 'option';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'quiz';
            radio.value = questionData.options[i];

            const optionText = document.createTextNode(questionData.options[i]);

            option.appendChild(radio);
            option.appendChild(optionText);
            optionsElement.appendChild(option);
        }

        quizContainer.innerHTML = '';
        quizContainer.appendChild(questionElement);
        quizContainer.appendChild(optionsElement);
    } else {
        displayThanks();
    }
}

function getSelectedAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    return selectedOption ? selectedOption.value : null;
}

function getSubCategory(answer) {
    switch (answer) {
        case 'Business':
            return BusinessData;
        case 'Living':
            return LivingData;
        case 'Storage':
            return StorageData;
        default:
            return BaseData;
    }
}

function checkAnswer() {
    const answer = getSelectedAnswer();
    if (answer !== null & answer !== "Business" & answer !== "Living" & answer !== "Storage") {
        currentQuestion++;
        displayQuestion();
    }
    if (answer == "Business" | answer == "Living" | answer == "Storage"){
        currentQuestion = 0;
        displayQuestion();
    }
}

function retryQuiz() {
    currentQuestion = 0;
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    thanksContainer.style.display = 'none';
    displayQuestion();
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
startQuizButton.addEventListener('click', startQuiz);

// Display the introduction initially
introContainer.style.display = 'block';
