const questions = [
    {
        question: "На каком ладу  находится нота Ми первой октавы на 6 струне?  ",
        optionA: "12 лад",
        optionB: "7 лад",
        optionC: "5 лад",
        optionD: "3 лад",
        correctOption: "optionA"
    },

    {
        question: "Нота Ми на 5 струне расположена на...",
        optionA: "5 ладу",
        optionB: "9 ладу",
        optionC: "7 ладу",
        optionD: "12 лад",
        correctOption: "optionC"
    },

    {
        question: "Чтобы сыграть ноту Ми в первой октаве на 4 струне какой лад нужно зажать?",
        optionA: "3 лад",
        optionB: "5 лад",
        optionC: "2 лад",
        optionD: "7 лад",
        correctOption: "optionC"
    },

    {
        question: "Какая из указанных позиций соответствуетствует расположению ноты Ми в первой октаве?",
        optionA: "5 лад, 5 струна",
        optionB: "7 лад, 4 струна",
        optionC: "12 лад, 6 струна",
        optionD: "3 лад, 5 струна",
        correctOption: "optionC"
    },

    {
        question: "На какой стране можно сыграть ноту Ми первой октавы на 2 ладу?",
        optionA: "3 струна",
        optionB: "5 струна",
        optionC: "4 струна",
        optionD: "6 струна",
        correctOption: "optionC"
    },

    {
        question: "Если зажать 7 лад на 5 струне, какая нота прозвучит?",
        optionA: "Ми малой октавы",
        optionB: "Си первой октавы",
        optionC: "Ми первой октавы",
        optionD: "До первой октавы",
        correctOption: "optionC"
    },

    {
        question: "Какой лад на 4 струне соответствует ноте Ми первой октавы?",
        optionA: "3",
        optionB: "5",
        optionC: "2",
        optionD: "7",
        correctOption: "optionC"
    },

    {
        question: "Где НЕ находится нота Ми первой октавы?",
        optionA: "12 лад, 6 струна",
        optionB: "7 лад, 5 струна",
        optionC: "14 лад, 6 струна",
        optionD: "3 лад, 4 струна",
        correctOption: "optionC"
    },

    {
        question: "На какой струне для получения Ми первой октавы нужно зажать 12 лад?  ",
        optionA: "4 струна",
        optionB: "5 струна",
        optionC: "6 струна",
        optionD: "3 струна",
        correctOption: "optionC"
    },

    {
        question: "где указаны все ноты Ми первой октавы? (Лад, струна соответственно)",
        optionA: "12/6, 7/4, 3/5",
        optionB: "12/5, 7/5, 2/3",
        optionC: "12/6, 7/5, 2/4",
        optionD: "12/4, 7/5, 2/6",
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