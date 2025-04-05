const questions = [
{
    question: "На какой струне Ми третьей октавы находится на 17 ладу?",
    optionA: "1",
    optionB: "2",
    optionC: "3",
    optionD: "4",
    correctOption: "optionB"
},
{
    question: "Сколько всего нот Ми в третьей октавы?",
    optionA: "1",
    optionB: "2",
    optionC: "3",
    optionD: "4",
    correctOption: "optionB"
},
{
    question: "Ми третьей октавы на 1 струне — это...",
    optionA: "10 лад",
    optionB: "12 лад",
    optionC: "15 лад",
    optionD: "17 лад",
    correctOption: "optionB"
},
{
    question: "Ми НЕ находится на...",
    optionA: "2 струне 17 ладу",
    optionB: "1 струне 12 ладу",
    optionC: "3 струне 19 ладу",
    optionD: "Все варианты верны",
    correctOption: "optionC"
},
{
    question: "На 2 струне Ми находится на...",
    optionA: "15 ладу",
    optionB: "17 ладу",
    optionC: "18 ладу",
    optionD: "20 ладу",
    correctOption: "optionB"
},
{
    question: "На какой струне Ми третьей октавы есть на 17 ладу?",
    optionA: "1 струна",
    optionB: "2 струна",
    optionC: "3 струна",
    optionD: "4 струна",
    correctOption: "optionB"
},
{
    question: "Где находится Ми третьей октавы на 1 струне?",
    optionA: "10 лад",
    optionB: "12 лад",
    optionC: "15 лад",
    optionD: "17 лад",
    correctOption: "optionB"
},
{
    question: "Какая нота на 2 струне 17 ладу?",
    optionA: "Фа",
    optionB: "Ми",
    optionC: "Ре",
    optionD: "До",
    correctOption: "optionB"
},
{
    question: "Сколько позиций у Ми третьей октавы?",
    optionA: "1",
    optionB: "2",
    optionC: "3",
    optionD: "4",
    correctOption: "optionB"
},
{
    question: "На каком ладу 1 струны НЕТ Ми третьей октавы?",
    optionA: "12",
    optionB: "15",
    optionC: "17",
    optionD: "Все перечислены",
    correctOption: "optionB"
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