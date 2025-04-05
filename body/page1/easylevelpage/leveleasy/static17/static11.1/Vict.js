const questions = [
    {
        question: "Нота Ля второй октавы на 4-й струне находится на:",
        optionA: "17 ладу",
        optionB: "19 ладу",
        optionC: "20 ладу",
        optionD: "21 ладу",
        correctOption: "optionB"
    },
    {
        question: "На 3-й струне нота Ля второй октавы зажимается на:",
        optionA: "12 ладу",
        optionB: "14 ладу",
        optionC: "16 ладу",
        optionD: "18 ладу",
        correctOption: "optionB"
    },
    {
        question: "Где находится нота Ля второй октавы на 2-й струне?",
        optionA: "8 лад",
        optionB: "10 лад",
        optionC: "12 лад",
        optionD: "14 лад",
        correctOption: "optionB"
    },
    {
        question: "На 1-й струне нота Ля второй октавы играется на:",
        optionA: "3 ладу",
        optionB: "5 ладу",
        optionC: "7 ладу",
        optionD: "9 ладу",
        correctOption: "optionB"
    },
    {
        question: "Какая позиция НЕ соответствует ноте Ля второй октавы?",
        optionA: "4 струна, 19 лад",
        optionB: "3 струна, 14 лад",
        optionC: "2 струна, 12 лад",
        optionD: "1 струна, 5 лад",
        correctOption: "optionC"
    },
    {
        question: "Ноту Ля второй октавы можно сыграть на:",
        optionA: "3 струне, 16 ладу",
        optionB: "2 струне, 10 ладу",
        optionC: "4 струне, 17 ладу",
        optionD: "5 струне, 20 ладу",
        correctOption: "optionB"
    },
    {
        question: "На какой струне нота Ля второй октавы находится на 14 ладу?",
        optionA: "2-я",
        optionB: "3-я",
        optionC: "4-я",
        optionD: "5-я",
        correctOption: "optionB"
    },
    {
        question: "Какой лад на 1-й струне нужно зажать, чтобы сыграть ноту Ля второй октавы?",
        optionA: "3",
        optionB: "5",
        optionC: "7",
        optionD: "9",
        correctOption: "optionB"
    },
    {
        question: "Какая комбинация соответствует ноте Ля второй октавы?",
        optionA: "4 струна, 19 лад",
        optionB: "3 струна, 12 лад",
        optionC: "2 струна, 8 лад",
        optionD: "1 струна, 3 лад",
        correctOption: "optionA"
    },
    {
        question: "Нота Ля второй октавы НЕ находится на:",
        optionA: "3 струне, 14 ладу",
        optionB: "4 струне, 17 ладу",
        optionC: "2 струне, 10 ладу",
        optionD: "1 струне, 5 ладу",
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