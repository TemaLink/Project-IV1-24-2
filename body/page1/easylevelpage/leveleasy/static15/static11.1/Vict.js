const questions = [
    {
        question: "На каком ладу 5-я струна играет ноту Фа второй октавы?",
        optionA: "18",
        optionB: "19",
        optionC: "20",
        optionD: "21",
        correctOption: "optionC"
    },
    {
        question: "Где находится нота Фа второй октавы на 4-й струне?",
        optionA: "15 лад",
        optionB: "16 лад",
        optionC: "17 лад",
        optionD: "18 лад",
        correctOption: "optionA"
    },
    {
        question: "На 3-й струне нота Фа второй октавы находится на ладу..?",
        optionA: "8",
        optionB: "9",
        optionC: "10",
        optionD: "11",
        correctOption: "optionC"
    },
    {
        question: "Какой лад 2-й струны зажать, чтобы сыграть ноту Фа второй октавы?",
        optionA: "5",
        optionB: "6",
        optionC: "7",
        optionD: "8",
        correctOption: "optionB"
    },
    {
        question: "На первой струне нота Фа второй октавы можно сыграть на ладу..?",
        optionA: "1",
        optionB: "2",
        optionC: "3",
        optionD: "4",
        correctOption: "optionA"
    },
    {
        question: "Какая комбинация позволит сыграть ноту Фа второй октавы?",
        optionA: "5 струна, 20 лад",
        optionB: "4 струна, 17 лад",
        optionC: "3 струна, 14 лад",
        optionD: "2 струна, 12 лад",
        correctOption: "optionA"
    },
    {
        question: "Нота Фа второй октавы НЕ находится на:",
        optionA: "4 струна, 15 лад",
        optionB: "1 струна, 1 лад",
        optionC: "3 струна, 10 лад",
        optionD: "2 струна, 12 лад",
        correctOption: "optionD"
    },
    {
        question: "На какой струне нота Фа второй октавы находится на 10 ладу?",
        optionA: "2-я",
        optionB: "3-я",
        optionC: "4-я",
        optionD: "5-я",
        correctOption: "optionB"
    },
    {
        question: "Какой лад на 4-й струне нужно зажать, чтобы сыграть ноту Фа второй октавы?",
        optionA: "15",
        optionB: "16",
        optionC: "17",
        optionD: "18",
        correctOption: "optionA"
    },
    {
        question: "Какая позиция соответствует ноте Фа второй октавы?",
        optionA: "2 струна, 6 лад",
        optionB: "3 струна, 12 лад",
        optionC: "1 струна, 3 лад",
        optionD: "4 струна, 19 лад",
        correctOption: "optionA"
    }
];



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