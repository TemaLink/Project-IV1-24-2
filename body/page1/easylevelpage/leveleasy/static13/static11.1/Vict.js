const questions = [
    {
        question: "На каком ладу 6-й струны находится нота Ре второй октавы?",
        optionA: "15",
        optionB: "16",
        optionC: "17",
        optionD: "18",
        correctOption: "optionC"
    },

    {
        question: "Где на 5-й струне можно сыграть ноту Ре второй октавы?",
        optionA: "10 лад",
        optionB: "11 лад",
        optionC: "12 лад",
        optionD: "13 лад",
        correctOption: "optionC"
    },

    {
        question: "На каком ладу 4-й струны расположена нота Ре второй октавы?",
        optionA: "5",
        optionB: "6",
        optionC: "7",
        optionD: "8",
        correctOption: "optionC"
    },

    {
        question: "Какой лад 3-й струны соответствует ноте Ре второй октавы?",
        optionA: "1",
        optionB: "2",
        optionC: "3",
        optionD: "4",
        correctOption: "optionC"
    },

    {
        question: "Нота Ре второй октавы на 5-й струне, на каком ладу?",
        optionA: "10",
        optionB: "11",
        optionC: "12",
        optionD: "13",
        correctOption: "optionC"
    },

    {
        question: "Найдите верное расположение ноты Ре для 4-й струны:",
        optionA: "5 лад",
        optionB: "6 лад",
        optionC: "7 лад",
        optionD: "9 лад",
        correctOption: "optionC"
    },

    {
        question: "Где НЕ расположена нота Ре второй октавы?",
        optionA: "3 струна 3 лад",
        optionB: "5 струна 12 лад",
        optionC: "6 струна 15 лад",
        optionD: "4 струна 7 лад",
        correctOption: "optionC"
    },

    {
        question: "На какой струне нота Ре второй октавы находится на 7-м ладу?",
        optionA: "5-я струна",
        optionB: "2-я струна",
        optionC: "4-я струна",
        optionD: "6-я струна",
        correctOption: "optionC"
    },

    {
        question: "Сколько ладов между нотами Ре на 3-й и 4-й струнах?",
        optionA: "2",
        optionB: "3",
        optionC: "4",
        optionD: "5",
        correctOption: "optionC"
    },

    {
        question: "Ре второй октавы на 3-м ладу, на какой стрнуе?",
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