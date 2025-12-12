// Funcao para ler o botao e a question e devolver a pontuaçao
document.querySelectorAll('.question').forEach(q => {
    q.dataset.original = q.innerHTML;
});

function option(numQuestion, option){
    let question = document.getElementById('q'+numQuestion)
    question.innerHTML = "";

    const pont = 0;
    if (option){
        //alert("Você acertou a questão ", numQuestion, "!!!");
        question.textContent = "ACERTOU!!!!";
        question.classList.add("questionAcertou");
        question.style.background = "green";
        //pont += 5;

        if (numQuestion === 7){
            question.style.color = "var(--color2a)";
            question.style.height = "300px";
            question.style.background = 'url("../img/gengarLaughing.gif")';
        }
        if (numQuestion === 9){
            setTimeout(() => {
                minigameQ10()
        }, 2050);
        }
        setTimeout(() => {
            question.style.background = "var(--color3)";
            question.innerHTML = question.dataset.original;
            question.classList.remove("questionVisivel");
            question.classList.remove("questionAcertou");

        let proxNumero = numQuestion + 1;
        let proxQuestion = document.getElementById('q' + proxNumero);
        proxQuestion.classList.add("questionVisivel");
        }, 2000);
    }else{
        //alert("Você errou a questão ", numQuestion,".")
        question.textContent = "ERROU!!!!";
        question.classList.add("questionErrou");
        question.style.background = "red";

        setTimeout(() => {
            question.style.background = "var(--color3)";
            question.innerHTML = question.dataset.original;
            question.classList.remove("questionErrou");
            question.classList.remove("questionVisivel");
        
        let questionUm = document.getElementById("q1");
        questionUm.classList.add("questionVisivel");
        }, 3000);
    }
}

//FUNCAO DA Q10 MINIGAME 
function minigameQ10(){
    let q10 = document.getElementById("q10");
    let personagem = document.getElementById('personagem');
    let minigameQ10 = document.getElementById('minigameQ10');

//funcao de movimento do shedinja
    function movShed(){
        let x = 0;
        let y = 0;
        let speed = 6;
        const keys = {};

        window.addEventListener('keydown', (i) => {
            keys[i.keyCode] = true;
        });
        window.addEventListener('keyup', (i) => {
            keys[i.keyCode] = false;
        });
            
            function atualizar(){

                let limiteX = minigameQ10.clientWidth;
                let limiteY = minigameQ10.clientHeight;

                //direita
                if (keys[68] && x < limiteX) x += speed;
                //esquerda
                if (keys[65] && x > 0) x -= speed;
                //cima
                if (keys[87] && y > 0) y -= speed;
                //baixo
                if (keys[83] && y < limiteY) y += speed;

                personagem.style.left = x + "px";
                personagem.style.top = y + "px";
                requestAnimationFrame(atualizar);
            }
            
            atualizar();
    }
    
    movShed();

    //funcao para colidir os ataques com o shedinja

    function colidirShed(){
        
        let surf = document.getElementById('surf');
        let darkrai = document.getElementById('darkrai');
        let charizard = document.getElementById('charizard');
        let haunter = document.getElementById('haunter');
        let jolteon = document.getElementById('jolteon');
        let aerodactyl = document.getElementById('aerodactyl');

        let epsilon = 10;
        if (surf.style.top - personagem.style.top < epsilon && surf.style.left - personagem.style.left < epsilon){
            alert('funcionou');
        }
        requestAnimationFrame(colidirShed);
    }
    colidirShed();
}
