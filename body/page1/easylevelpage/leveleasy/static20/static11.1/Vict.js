const questions = [
{
    question: "На какой струне нота Ре третьей октавы находится на 15 ладу?",
    optionA: "1",
    optionB: "2",
    optionC: "3",
    optionD: "4",
    correctOption: "optionB"
},
{
    question: "Сколько всего нот Ре в третьей октаве?",
    optionA: "2",
    optionB: "3",
    optionC: "4",
    optionD: "1",
    correctOption: "optionB"
},
{
    question: "Нота Ре третьей октавы на 1 струне находится на...",
    optionA: "8 ладу",
    optionB: "10 ладу",
    optionC: "12 ладу",
    optionD: "15 ладу",
    correctOption: "optionB"
},
{
    question: "На 3 струне нота Ре третьей октавы можно сыграть на...",
    optionA: "15 ладу",
    optionB: "17 ладу",
    optionC: "19 ладу",
    optionD: "20 ладу",
    correctOption: "optionC"
},
{
    question: "Нота Ре третьей октавы НЕ находится на...",
    optionA: "2 струне",
    optionB: "3 струне",
    optionC: "1 струне",
    optionD: "4 струне",
    correctOption: "optionD"
},
{
    question: "Самый низкий лад для ноты Ре на 2 струне:",
    optionA: "13",
    optionB: "15",
    optionC: "17",
    optionD: "19",
    correctOption: "optionB"
},
{
    question: "Нота Ре третьей октавы на 3 струне — это...",
    optionA: "15 лад",
    optionB: "17 лад",
    optionC: "19 лад",
    optionD: "20 лад",
    correctOption: "optionC"
},
{
    question: "На 1 струне нота Ре находится между какими ладами?",
    optionA: "8-10",
    optionB: "10-12",
    optionC: "12-15",
    optionD: "15-17",
    correctOption: "optionB"
},
{
    question: "Нота Ре третьей октавы на 2 струне — это...",
    optionA: "13 лад",
    optionB: "15 лад",
    optionC: "17 лад",
    optionD: "19 лад",
    correctOption: "optionB"
},
{
    question: "Какая нота находится на 2 струне 15 ладу?",
    optionA: "До",
    optionB: "Ре",
    optionC: "Ми",
    optionD: "Фа",
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