const questions = [
    {
        question: "Нота Си второй октавы на 3-й струне находится на:",
        optionA: "14 ладу",
        optionB: "16 ладу",
        optionC: "18 ладу",
        optionD: "20 ладу",
        correctOption: "optionB"
    },
    {
        question: "На 2-й струне нота Си второй октавы зажимается на:",
        optionA: "10 ладу",
        optionB: "12 ладу",
        optionC: "14 ладу",
        optionD: "16 ладу",
        correctOption: "optionB"
    },
    {
        question: "Где находится нота Си второй октавы на 1-й струне?",
        optionA: "5 лад",
        optionB: "7 лад",
        optionC: "9 лад",
        optionD: "11 лад",
        correctOption: "optionB"
    },
    {
        question: "Какая позиция НЕ соответствует ноте Си второй октавы?",
        optionA: "3 струна, 16 лад",
        optionB: "2 струна, 12 лад",
        optionC: "1 струна, 7 лад",
        optionD: "4 струна, 19 лад",
        correctOption: "optionD"
    },
    {
        question: "Нота Си второй октавы можно сыграть на:",
        optionA: "3 струне, 14 ладу",
        optionB: "2 струне, 10 ладу",
        optionC: "1 струне, 5 ладу",
        optionD: "2 струне, 12 ладу",
        correctOption: "optionD"
    },
    {
        question: "На какой струне нота Си второй октавы находится на 7 ладу?",
        optionA: "1-я",
        optionB: "2-я",
        optionC: "3-я",
        optionD: "4-я",
        correctOption: "optionA"
    },
    {
        question: "Какой лад на 2-й струне нужно зажать, чтобы сыграть ноту Си второй октавы?",
        optionA: "10",
        optionB: "12",
        optionC: "14",
        optionD: "16",
        correctOption: "optionB"
    },
    {
        question: "Какая комбинация соответствует ноте Си второй октавы?",
        optionA: "3 струна, 16 лад",
        optionB: "4 струна, 19 лад",
        optionC: "2 струна, 8 лад",
        optionD: "1 струна, 3 лад",
        correctOption: "optionA"
    },
    {
        question: "Ноту Си второй октавы НЕЛЬЗЯ сыграть на:",
        optionA: "1 струне, 7 ладу",
        optionB: "3 струне, 16 ладу",
        optionC: "2 струне, 12 ладу",
        optionD: "4 струне, 17 ладу",
        correctOption: "optionD"
    },
    {
        question: "На какой струне нота Си второй октавы находится на 12 ладу?",
        optionA: "1-я",
        optionB: "2-я",
        optionC: "3-я",
        optionD: "4-я",
        correctOption: "optionB"
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