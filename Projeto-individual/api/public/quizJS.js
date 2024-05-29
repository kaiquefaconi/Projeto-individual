var startButton = document.querySelector(".start_quiz");
var perguntaContainer = document.querySelector(".perguntas_container");
var respostaContainer = document.querySelector(".respostas_container");
var quentionText = document.querySelector(".perguntas");
var nextButton = document.querySelector(".next_quiz");

startButton.addEventListener("click", startJogo);
nextButton.addEventListener("click", displayProximaPergunta);

var currentQuestion = 0;
var totalCorrect = 0;

function startJogo() {
    startButton.classList.add("hide");
    perguntaContainer.classList.remove("hide");
    displayProximaPergunta();

}

function displayProximaPergunta() {
    while (respostaContainer.firstChild) {
        respostaContainer.removeChild(respostaContainer.firstChild);
    }

    if (currentQuestion === questions.length) {
        return finishGame();
    }

    document.body.removeAttribute("class");
    nextButton.classList.add("hide");

    quentionText.textContent = questions[currentQuestion].question;
    questions[currentQuestion].answer.forEach(answer => {
        var newAnswer = document.createElement("button");
        newAnswer.classList.add("button", "answer");
        newAnswer.textContent = answer.text;
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct;
        }
        respostaContainer.appendChild(newAnswer);

        newAnswer.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(event) {
    var answerClicked = event.target;

    if (answerClicked.dataset.correct) {
        answerClicked.classList.add("correct");
        totalCorrect++;
    } else {
        answerClicked.classList.add("incorrect");
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button !== answerClicked) {
            button.disabled = true;
        }
    });
    nextButton.classList.remove("hide");
    currentQuestion++;
}


function finishGame() {
    var totalQuestion = questions.length;
    var performance = Math.floor((totalCorrect * 100) / totalQuestion);
    var totalIncorrect = 10 - totalCorrect;
var idquiz = 1;
var id = sessionStorage.ID_USUARIO;
    // var message = "";



    // if (performance >= 80) {
    //     message = "Parabéns! Você é um verdadeiro fã de Bob Marley!<br> Você conhece tudo sobre o rei do reggae!";
    // } else if (performance >= 60) {
    //     message = "Quase lá!<br>Seu conhecimento sobre Bob Marley é muito bom. Faltam poucos detalhes para você se tornar um expert!";
    // } else if (performance >= 50) {
    //     message = "Boa performance! Acertar 50% mostra que você conhece bastante sobre Bob Marley. Não pare por aqui, 'Get up, stand up' e continue!";
    // } else if (performance >= 30) {
    //     message = "Você está no início da jornada!<br>Você acertou algumas questões. Como Bob Marley dizia, 'Love the life you live. Live the life you love.' Continue explorando e aprendendo!";
    // } else {
    //     message = "Não desanime!<br>. Como Bob Marley diria, 'Get up, stand up, don't give up the fight!' Continue aprendendo e tentando novamente!";
    // }

    perguntaContainer.innerHTML = `<p class="mensagem_final">Quer ver o resultado? Clique aqui!</span></p> 
    <a href="dashboard.html" class="dash">Dashboards</a>` ;


    nextButton.classList.add("hide");


    nextButton.removeEventListener("click", displayProximaPergunta);

    fetch("/usuarios/finishGame", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           idServer: id,
            idquiz: idquiz,
            totalCorrect: totalCorrect,
            totalIncorrect: totalIncorrect
         
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO quiz()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.id = json.id;
                sessionStorage.idquiz = json.idquiz;
                sessionStorage.Acertos = json.totalCorrect;
                sessionStorage.Erros = json.totalIncorrect;
             


            });

        } else {
            console.log("Houve um erro ao terminar o quiz!");

            resposta.text().then(texto => {
                console.error(texto);

            });

        }
    }).catch(function (erro) {
        console.log(erro);
    })

    return false;


}


var questions = [
    {
        question: "Em que ano Bob Marley nasceu?",
        answer: [
            { text: "1945", correct: true },
            { text: "1947", correct: false },
            { text: "1949", correct: false },
            { text: "1960", correct: false },
        ],
    },
    {
        question: "Qual é o nome completo de Bob Marley?",
        answer: [
            { text: "Robert Nesta Marley", correct: true },
            { text: "Robert Nigel Marley", correct: false },
            { text: "Robert Nelson Marley", correct: false },
            { text: "Robert Nathan Marley", correct: false },
        ],
    },
    {
        question: "Qual era o nome da banda de Bob Marley?",
        answer: [
            { text: "The Revolutionaries", correct: false },
            { text: "The Wailers", correct: true },
            { text: "The Skatalites", correct: false },
            { text: "The Heptones", correct: false },
        ],
    },
    {
        question: "Em que país Bob Marley nasceu?",
        answer: [
            { text: "Jamaica", correct: true },
            { text: "Estados Unidos", correct: false },
            { text: "Trinidad e Tobago", correct: false },
            { text: "Barbados", correct: false },
        ],
    },
    {
        question: "Qual foi o primeiro álbum de Bob Marley e os Wailers lançado internacionalmente?",
        answer: [
            { text: "Catch a Fire", correct: true },
            { text: "Burnin'", correct: false },
            { text: "Natty Dread", correct: false },
            { text: "Rastaman Vibration", correct: false },
        ],
    },
    {
        question: "Qual música de Bob Marley contém a famosa linha 'One good thing about music, when it hits you, you feel no pain'?",
        answer: [
            { text: "No Woman, No Cry", correct: false },
            { text: "Trenchtown Rock", correct: true },
            { text: "Redemption Song", correct: false },
            { text: "Jamming", correct: false },
        ],
    },
    {
        question: "Qual foi o último álbum de estúdio lançado por Bob Marley antes de sua morte?",
        answer: [
            { text: "Uprising", correct: true },
            { text: "Survival", correct: false },
            { text: "Confrontation", correct: false },
            { text: "Exodus", correct: false },
        ],
    },
    {
        question: "Em que ano Bob Marley faleceu?",
        answer: [
            { text: "1978", correct: false },
            { text: "1980", correct: false },
            { text: "1981", correct: true },
            { text: " 1983", correct: false },
        ],
    },
    {
        question: "Bob Marley foi um seguidor de qual religião?",
        answer: [
            { text: "Hinduísmo", correct: false },
            { text: " Islamismo", correct: false },
            { text: "Rastafarianismo", correct: true },
            { text: "Budismo", correct: false },
        ],
    },
    {
        question: "Qual destas músicas NÃO é uma canção de Bob Marley?",
        answer: [
            { text: "Three Little Birds", correct: false },
            { text: "Buffalo Soldier", correct: false },
            { text: "I Shot the Sheriff", correct: false },
            { text: "The Harder They Come", correct: true },
        ],
    },
];
function login() {
    window.location.href = `login.html`;
}
function cadastro() {
    window.location.href = `cadastro.html`;
}
function biografia() {
    window.location.href = `biografia.html`;

}
function quiz() {
    window.location.href = `quiz.html`;
}
function home() {
    window.location.href = `index.html`;

}
function paises() {
    window.location.href = `paises.html`;

}