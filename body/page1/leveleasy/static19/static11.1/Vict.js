const questions = [
    {
        question: "На какой струне и ладу находится нота До третьей октавы?",
        optionA: "2 струна, 15 лад",
        optionB: "3 струна, 17 лад",
        optionC: "1 струна, 12 лад",
        optionD: "4 струна, 19 лад",
        correctOption: "optionB"
    },
    {
        question: "Сколько всего нот До в третьей октаве?",
        optionA: "1",
        optionB: "2",
        optionC: "3",
        optionD: "4",
        correctOption: "optionD"
    },
    {
        question: "На 1 струне ноту До третьей октавы можно сыграть на...",
        optionA: "5 ладу",
        optionB: "8 и 20 ладах",
        optionC: "12 ладу",
        optionD: "17 ладу",
        correctOption: "optionB"
    },
    {
        question: "Какой лад на 3 струне соответствует ноте До?",
        optionA: "15",
        optionB: "17",
        optionC: "19",
        optionD: "20",
        correctOption: "optionB"
    },
    {
        question: "На какой струне НЕТ ноты До третьей октавы?",
        optionA: "1",
        optionB: "2",
        optionC: "3",
        optionD: "4",
        correctOption: "optionD"
    },
    {
        question: "Нота До третьей октавы на 2 струне находится на...",
        optionA: "10 ладу",
        optionB: "13 ладу",
        optionC: "15 ладу",
        optionD: "17 ладу",
        correctOption: "optionB"
    },
    {
        question: "Самый высокий лад для ноты До третьей октавы на 1 струне:",
        optionA: "8",
        optionB: "12",
        optionC: "17",
        optionD: "20",
        correctOption: "optionD"
    },
    {
        question: "Нота До на 3 струне находится на...",
        optionA: "12 ладу",
        optionB: "15 ладу",
        optionC: "17 ладу",
        optionD: "19 ладу",
        correctOption: "optionC"
    },
    {
        question: "На 1 струне нота До третьей октавы НЕ находится на...",
        optionA: "8 ладу",
        optionB: "20 ладу",
        optionC: "17 ладу",
        optionD: ".",
        correctOption: "optionB"
    },
    {
        question: "Какой лад на 2 струне соответствует ноте До?",
        optionA: "10",
        optionB: "13",
        optionC: "15",
        optionD: "17",
        correctOption: "optionB"
    },
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