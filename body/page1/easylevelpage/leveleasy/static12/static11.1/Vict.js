const questions = [
    {
        question: "На каком ладу 6-й струны находится нота До второй октавы?",
        optionA: "12",
        optionB: "13",
        optionC: "15",
        optionD: "17",
        correctOption: "optionC"
    },

    {
        question: "Где на 5-й струне можно сыграть До второй октавы?",
        optionA: "8 лад",
        optionB: "9 лад",
        optionC: "10 лад",
        optionD: "12 лад",
        correctOption: "optionC"
    },

    {
        question: "На каком ладу 4-й струны расположена нота До второй октавы?",
        optionA: "3",
        optionB: "4",
        optionC: "5",
        optionD: "7",
        correctOption: "optionC"
    },

    {
        question: "Какой лад 3-й струны соответствует ноте До второй октавы?",
        optionA: "0",
        optionB: "2",
        optionC: "1",
        optionD: "3",
        correctOption: "optionC"
    },

    {
        question: "До второй октавы на 6-й струне на каком ладу?",
        optionA: "12",
        optionB: "14",
        optionC: "15",
        optionD: "16",
        correctOption: "optionC"
    },

    {
        question: "Найдите верное расположение ноты До для 5-й струны:",
        optionA: "7 лад",
        optionB: "9 лад",
        optionC: "10 лад",
        optionD: "11 лад",
        correctOption: "optionC"
    },

    {
        question: "Где НЕ распологается нота До второй октавы?",
        optionA: "3 струна 1 лад",
        optionB: "4 струна 5 лад",
        optionC: "5 струна 12 лад",
        optionD: "6 струна 15 лад",
        correctOption: "optionC"
    },

    {
        question: "На какой струне нота До второй октавы находится на 5-м ладу?",
        optionA: "5-я струна",
        optionB: "2-я струна",
        optionC: "4-я струна",
        optionD: "6-я струна",
        correctOption: "optionC"
    },

    {
        question: "Сколько ладов между До на 3-й и 4-й струнах?",
        optionA: "2",
        optionB: "3",
        optionC: "4",
        optionD: "5",
        correctOption: "optionC"
    },

    {
        question: "Нота До второй октавы на 1-м ладу расположена на какой струне?",
        optionA: "2-я",
        optionB: "4-я",
        optionC: "3-я",
        optionD: "5-я",
        correctOption: "optionC"
    }
]


let shuffledQuestions = [] 

function handleQuestions() { 
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 


function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption
    const options = document.getElementsByName("option");
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {

            correctOption = option.labels[0].id
        }
    })
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ 
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null


    if (playerScore <= 4) {
        remark = "Пока что не стоит переходить к следующей теме.."
        remarkColor = "red"
    }
    else if (playerScore >= 5 && playerScore < 8) {
        remark = "Думаю, стоит доучить материал.."
        remarkColor = "orange"
    }
    else if (playerScore >= 8) {
        remark = "Отлично! Идем дальше?"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}