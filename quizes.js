import{
    questions
} from "./PE.js";


const correctScore = document.getElementById("correctScore");
const wrongScore = document.getElementById("wrongScore");
const goBackBtn = document.querySelector("#physicalGoBackButton")
const totalQuestions = questions.length;
const progressNumber = document.querySelector("#progressNumber");
const flashCard = document.querySelector(".flashCard");
const checkBtn = document.querySelector("#checkButton")
const wrongBtn = document.querySelector("#physicalWrongButton")
let myQuestion = document.querySelector("#myQuestion");


randomNumberPicker();

let wentBack = false;
let firstNumberProgressBar = 1;
let randomNumber = randomNumberPicker();
let correctAnswer = [];
let wrongAnswer = [];
let usedQuestions = [];

let [question, answer] = questions[randomNumber];
myQuestion.innerHTML = question;
progressNumber.innerHTML = `${firstNumberProgressBar}/${totalQuestions}`;
usedQuestions.push([question, answer]);


function randomNumberPicker(){
    let randomNumber = Math.floor(Math.random() * questions.length);
    return randomNumber;
}


function questionChangerHTML(){
    if(questions.length != 0){
        randomNumber = randomNumberPicker();
        [question, answer] = questions[randomNumber];
        myQuestion.innerHTML = question;
        usedQuestions.push([question, answer]);
        updateIndex();
    }
}

// This shit is for the switching of question and getting the score(buttons)

checkBtn.addEventListener("click", () => {
    if(currentIndex < usedQuestions.length){
        currentIndex++;
        [question, answer] = usedQuestions[currentIndex];
        myQuestion.innerHTML = usedQuestions[currentIndex][0];
        console.log(currentIndex);
    }
    else if(questions.length != 0){
        correctAnswer.push([question, answer]);
        correctScore.innerHTML = `Correct: ${correctAnswer.length}`;
        console.log(correctAnswer)
        questions.splice(randomNumber, 1);
        console.log(questions);
        console.log(usedQuestions)
        questionChangerHTML();
        if(firstNumberProgressBar < totalQuestions){
            firstNumberProgressBar++;
        }
        progressNumber.innerHTML = `${firstNumberProgressBar}/${totalQuestions}`;
        if (questions.length === 0) {
        myQuestion.textContent = `Congrats you got ${correctAnswer.length} correct!`;
        }
    }
    
    
});

wrongBtn.addEventListener("click", () => {
    if(currentIndex < usedQuestions.length){
        currentIndex++;
        [question, answer] = usedQuestions[currentIndex];
        myQuestion.innerHTML = usedQuestions[currentIndex][0];
        console.log(currentIndex);
    }
    else if(questions.length != 0){
        wrongAnswer.push([question, answer]);
        wrongScore.innerHTML = `Wrong: ${wrongAnswer.length}`;
        usedQuestions.push([question, answer]);
        console.log(wrongAnswer)
        questions.splice(randomNumber, 1);
        console.log(questions);
        questionChangerHTML();
        if(firstNumberProgressBar < totalQuestions){
            firstNumberProgressBar++;
        }
        progressNumber.innerHTML = `${firstNumberProgressBar}/${totalQuestions}`;
        if (questions.length === 0){
        myQuestion.textContent = `Congrats you got ${correctAnswer.length} correct!`;
        }
    }
    
});


// This shit is for the flipping of flash card

flashCard.addEventListener("click", () => {
    if(questions.length != 0){
        if(myQuestion.textContent == question){
            myQuestion.innerHTML = answer;
        }
        else{
            myQuestion.innerHTML = question;
        }
    }
    
});

//these are for the go forward in flash cards and go back

let currentIndex = usedQuestions.length;


goBackBtn.addEventListener("click", () => {

    if (usedQuestions.length > 0) {
        if (currentIndex > 0) {
            currentIndex--;
            [question, answer] = usedQuestions[currentIndex];
            myQuestion.innerHTML = question;
            wentBack = true;

            if(correctAnswer.includes(usedQuestions[currentIndex+1])){
                correctAnswer.splice(correctAnswer.indexOf(usedQuestions[currentIndex+1]),1);
                correctScore.innerHTML = `Correct: ${correctAnswer.length}`;
            }
            else if(wrongAnswer.includes(usedQuestions[currentIndex+1])){
                wrongAnswer.splice(wrongAnswer.indexOf(usedQuestions[currentIndex+1]),1);
                wrongScore.innerHTML = `Wrong: ${wrongAnswer.length}`;
            }
        }
        // reset wentBack to false if user goes forward again
        else if(currentIndex === 0 && wentBack){
            wentBack = false;
        }
    }
});


function updateIndex() {
    currentIndex = usedQuestions.length - 1;
  }


function wentBackChecker(){
    
}




console.log(questions);
console.log(questions.length)
console.log(question)
console.log(usedQuestions)

