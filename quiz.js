const questions = [
    {
        question : "Capital of India?",
        answers:[
            {text:"Goa",correct:false},
            {text:"Mumbai",correct:false},
            {text:"Delhi",correct:true},
            {text:"Chennai",correct:false},
        ]
    },
    {
        question : "Capital of Tamil Nadu?",
        answers:[
            {text:"Salem",correct:false},
            {text:"Madurai",correct:false},
            {text:"Trichy",correct:false},
            {text:"Chennai",correct:true},
        ]
    },
    {
        question : "National Animal of India?",
        answers:[
            {text:"Tiger",correct:true},
            {text:"Lion",correct:false},
            {text:"Zebra",correct:false},
            {text:"Lipord",correct:false},
        ]
    },
    {
        question : " Python is a  ?",
        answers:[
            {text:"Compiler",correct:false},
            {text:"Interpreter",correct:true},
            {text:"Compiler and Interpreter ",correct: false},
            {text:"Run Time",correct:false},
        ]
    },
     
];

const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answer-buttons");
const nextbtn = document.getElementById("next");

let currentquestionindex = 0;
let score = 0;

function StartQuiz()
{
    currentquestionindex = 0;
     score = 0;
     nextbtn.innerHTML="Next";
       showquestion();
     
     
}

function showquestion()
{
    restate();
    const currentquestion = questions[currentquestionindex];
    const questionno = currentquestionindex + 1;
    questionelement.innerHTML = questionno + "." + currentquestion.question;
    currentquestion.answers.forEach( answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectanswer);

      } );
}

function restate()
{
    nextbtn.style.display = "none";
    while(answerbutton.firstChild)
    {
        answerbutton.removeChild(answerbutton.firstChild);
    }
}


 
function selectanswer(e)
{
    const selectbtn = e.target;
    const iscorrect = selectbtn.dataset.correct ==="true";
    if(iscorrect)
    {
        selectbtn.classList.add("correct");
        score++;
    }
    else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button => {
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display = "block";
}

function handlenextbutton()
{
    currentquestionindex++;
    if(currentquestionindex < questions.length)
    {
        showquestion();
    }
    else{
        showscore();
    }
}

function showscore()
{
    restate();
    questionelement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextbtn.innerHTML = "Quiz Start Again";
    nextbtn.style.display = "block";
}


nextbtn.addEventListener("click", () => {
    if(currentquestionindex < questions.length)
    {
        handlenextbutton();
    }
    else{
        StartQuiz();
    }
        
});

StartQuiz();