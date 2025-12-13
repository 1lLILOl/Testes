var acertos = 0;
var erros = 0;

let audioObliterar = document.getElementById('obliterar');
//funcao para a q19 e a q20 declarar o primeiro pokemon que vc marcar e dpos batalhar com eles
var pokemonEscolhido = null;

window.pokemonInicial = function(pokemon){
    if (pokemonEscolhido === null){
        pokemonEscolhido = pokemon;
    }
}

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

        acertos += 1;
        console.log('acertos: ', acertos, ' erros: ', erros, ' pontuação: ');
        console.log('Seu pokemon atual é o ', pokemonEscolhido);

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
        erros += 5;

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
        //funcao mobile

        window.botaoMobile = function(tecla){
            switch (tecla){
                case "direita":
                    keys[68] = true;
                    setTimeout(() => {
                        keys[68] = false;
                    }, 400);
                    break;
                case "esquerda":
                    keys[65] = true;
                    setTimeout(() => {
                        keys[65] = false;
                    }, 400);
                    break; 
                case "cima":
                    keys[87] = true;
                    setTimeout(() => {
                        keys[87] = false;
                    }, 400);
                    break; 
                case "baixo":
                    keys[83] = true;
                    setTimeout(() => {
                        keys[83] = false;
                    }, 400);
                    break; 
            }
           
        }
            
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

        var timerSemColisao = null;

        let surf = document.getElementById('surf');
        let darkrai = document.getElementById('darkrai');
        let charizard = document.getElementById('charizard');
        let haunter = document.getElementById('haunter');
        let jolteon = document.getElementById('jolteon');
        let aerodactyl = document.getElementById('aerodactyl');

        function colidirShed(){
            if (colisao(personagem, darkrai)    || colisao(personagem, charizard) 
                || colisao(personagem, haunter) || colisao(personagem, aerodactyl)){
                option(10);
                resetTimerSC();
            }
            
            console.log(timerSemColisao);
            requestAnimationFrame(colidirShed);
        }

        if (timerSemColisao === null){
                resetTimerSC();
        
                timerSemColisao = setTimeout(() => {
                option(10, 9);
                timerSemColisao = null;
            }, 9700);
        }

        function resetTimerSC(){
            if (timerSemColisao !== null){
                clearTimeout(timerSemColisao);
                timerSemColisao = null;
            }
        }



    function colisao(a, b){

        let bl1 = a.getBoundingClientRect();
        let bl2 = b.getBoundingClientRect();

        if (bl1.x < bl2.x + bl2.width &&
            bl1.x + bl1.width > bl2.x &&
            bl1.y < bl2.y + bl2.height &&
            bl1.y + bl1.height > bl2.y) {
              return true;
        } else{
            return false;
        } 
    }
    colidirShed();
}
//fim da q10 minigame

//Q12 nomes arceus

function verificarInputsArceus(){
    let arceusNormal = document.getElementById("arceusNormal").value;
    let arceusAco = document.getElementById("arceusAco").value;
    let arceusVoador = document.getElementById("arceusVoador").value;
    let arceusEletrico = document.getElementById("arceusEletrico").value;

    function remEspLower(palavra){
        palavra = palavra.toLowerCase();
        palavra.replace(/\s/g, 'arceus');
        palavra = palavra.trim();
        
        return palavra;
    }
    if ((remEspLower(arceusAco) === "aço" || remEspLower(arceusAco) ===  "aco") &&
        remEspLower(arceusNormal) === "normal" &&
        (remEspLower(arceusEletrico) === "eletrico" || remEspLower(arceusEletrico) === "elétrico") &&
        remEspLower(arceusVoador) === "voador"){
        
        option(12, 9);
    }else{
        option(12);
    }
}

//Q13 arrastar botao pra red

let botaoRed = document.getElementById("botaoRed");
let red = document.getElementById("red");

botaoRed.addEventListener("dragstart", (evento) => {
    evento.dataTransfer.setData("text", evento.target.id);
})
red.addEventListener("dragover", (evento) => {
    evento.preventDefault();
})
red.addEventListener("drop", (evento) => {
    evento.preventDefault();

    let trintaUm = document.getElementById(event.dataTransfer.getData("text"));
    trintaUm.textContent = " (31.000.000)";
    red.appendChild(trintaUm);
    red.onclick = () => option(13, 9);
        
})

//Q 15 batalha rattata vs lunala

function optionQ15(){
     let question = document.getElementById("q15");
     question.innerHTML = "";
     question.textContent = "";
     question.style.background = "url('../img/backgroundPokemonBattles.webp')";
     question.style.height = "clamp(200px, 50dvh, 700px)";

     rattataVsLunala(question);
}
function rattataVsLunala(question){

    let lunala = document.createElement('img');
    lunala.src = "../img/lunala.gif";
    lunala.id = "lunala";
    question.appendChild(lunala);
    let lunalaDados = document.createElement("span");
    lunalaDados.textContent = "Lunala - Level 100";
    lunalaDados.id = "lunalaDados";
    question.appendChild(lunalaDados);
    let lunalaVida = document.createElement("meter");
    lunalaVida.id = "lunalaVida";
    lunalaVida.min = "0";
    lunalaVida.max = "100";
    lunalaVida.low = "33";
    lunalaVida.optimum = "80";
    lunalaVida.value = "100";
    question.appendChild(lunalaVida);

    let rattata = document.createElement("img");
    rattata.src = "../img/rattata.gif";
    rattata.id = "rattata";
    question.appendChild(rattata);
    let rattataDados = document.createElement("span");
    rattataDados.textContent = "Rattata - Level 12";
    rattataDados.id = "rattataDados";
    question.appendChild(rattataDados);
    let rattataVida = document.createElement("meter");
    rattataVida.id = "rattataVida";
    rattataVida.min = "0";
    rattataVida.max = "100";
    rattataVida.low = "33";
    rattataVida.optimum = "80";
    rattataVida.value = "100";
    question.appendChild(rattataVida);


    let ataquesRattataDiv = document.createElement("div");
    ataquesRattataDiv.id = "ataquesRattataDiv";
    question.appendChild(ataquesRattataDiv);

    let endeavorRattata = document.createElement("button");
    endeavorRattata.classList.add("ataquesRattata");
    endeavorRattata.id = "endeavorRattata";
    endeavorRattata.textContent = "Endeavor";
    endeavorRattata.onclick = () => rattataUsaEndeavor(suckerPunchRattata, quickAttackRattata);
    ataquesRattataDiv.appendChild(endeavorRattata);

    let suckerPunchRattata = document.createElement("button");
    suckerPunchRattata.classList.add("ataquesRattata");
    suckerPunchRattata.id = "suckerPunchRattata";
    suckerPunchRattata.textContent = "Sucker Punch";
    suckerPunchRattata.onclick = () => option(15);
    ataquesRattataDiv.appendChild(suckerPunchRattata);

    let quickAttackRattata = document.createElement("button");
    quickAttackRattata.classList.add("ataquesRattata");
    quickAttackRattata.id = "quickAttackRattata";
    quickAttackRattata.textContent = "Quick Attack";
    quickAttackRattata.onclick = () => option(15);
    ataquesRattataDiv.appendChild(quickAttackRattata);

    let tackleRattata = document.createElement("button");
    tackleRattata.classList.add("ataquesRattata");
    tackleRattata.id = "tackleRattata";
    tackleRattata.textContent = "Tackle";
    tackleRattata.onclick = () => option(15);
    ataquesRattataDiv.appendChild(tackleRattata);

    function rattataUsaEndeavor(suckerPR, quickAR){
        suckerPR.onclick = () => {
            option(15, 9);
            rattata.style.animation = "ataqueEsquerda 0.5s";
        }
        quickAR.onclick = () => {
            option(15);
            alert("Esqueceu que Lunala é fantasma?");
        }
        rattataVida.value = "1";
        lunala.style.animation = "ataqueDireita 0.7s";
        setInterval(() => {
            lunalaVida.value = "1";
            rattata.style.animation = "ataqueEsquerda 0.5s";
        }, 1000);

    }
}
    
//funcao de batalha da q19 e 20, vai pegar os valores do poke e entao dar status ability e attack

function pegarStatus(pokemon){

    let statusPokemon = {};

    switch (pokemon){
        case "regieleki":
            statusPokemon.src = "../img/regieleki.webp";
            statusPokemon.nome = "Regieleki";
            statusPokemon.vida = 364;
            statusPokemon.dano = 328;
            statusPokemon.speed = 548;
            statusPokemon.move1 = "Rapid Spin";
            statusPokemon.move2 = "Wild charge";
            statusPokemon.move3 = "Explosion";
            statusPokemon.move4 = "Assurance";
            break;
        case "ninjask":
            statusPokemon.src = "../img/ninjask.gif";
            statusPokemon.nome = "Ninjask";
            statusPokemon.vida = 326;
            statusPokemon.dano = 306;
            statusPokemon.speed = 460;
            statusPokemon.move1 = "Leech Life";
            statusPokemon.move2 = "U Turn";
            statusPokemon.move3 = "Aerial Ace";
            statusPokemon.move4 = "Night Slash";
            break;
        case "rayquaza":
            statusPokemon.src = "../img/rayquazaEsquerda.gif";
            statusPokemon.nome = "Shiny Mega Rayquaza";
            statusPokemon.vida = 414;
            statusPokemon.dano = 504;
            statusPokemon.speed = 361;
            statusPokemon.move1 = "Dragon Ascent";
            statusPokemon.move2 = "V-Create";
            statusPokemon.move3 = "Extreme Speed";
            statusPokemon.move4 = "Earthquake";
            break;
        case "deoxys":
            statusPokemon.src = "../img/deoxys.svg";
            statusPokemon.nome = "Speed Deoxys";
            statusPokemon.vida = 304;
            statusPokemon.dano = 317;
            statusPokemon.speed = 504;
            statusPokemon.move1 = "Stealth Rock";
            statusPokemon.move2 = "Taunt";
            statusPokemon.move3 = "Skill Swap";
            statusPokemon.move4 = "Spikes";
            break;
        case "beedrill":
            statusPokemon.src = "../img/beedrill.gif";
            statusPokemon.nome = "Mega Beedrill";
            statusPokemon.vida = 334;
            statusPokemon.dano = 438;
            statusPokemon.speed = 427;
            statusPokemon.move1 = "U Turn";
            statusPokemon.move2 = "Poison Jab";
            statusPokemon.move3 = "Drill Run";
            statusPokemon.move4 = "Knock Off";
            break;
        
    }
    return statusPokemon;
}
// calcular dano de cada ataque
function danoAtaque(ataque){
    let multipliers = {
        danoMultiplier: 0,
        speedMultiplier: 1,
        itSelfDamage: 0,
        healsItSelf: 0
    }
    switch (ataque){
        case "Rapid Spin":
            multipliers.danoMultiplier = 0.2;
            break;
        case "Wild Charge":
            multipliers.danoMultiplier = 0.9;
            multipliers.itSelfDamage = 0.225;
            break;
        case "Explosion":
            multipliers.danoMultiplier = 2.5;
            multipliers.itSelfDamage = 9999999;
            break;
        case "Assurance":
            multipliers.danoMultiplier = 1.2;
            break;
        case "Leech Life":
            multipliers.danoMultiplier = 0.2;
            multipliers.healsItSelf = 0.1;
            break;
        case "U Turn":
            multipliers.danoMultiplier = 0.7;
            break;
        case "Aerial Ace":
            multipliers.danoMultiplier = 0.6;
            break;
        case "Night Slash":
            multipliers.danoMultiplier = 0.7;
            break;
        case "Dragon Ascent":
            multipliers.danoMultiplier = 1.2;
            multipliers.itSelfDamage = 0.2;
            break;
        case "V-Create":
            multipliers.danoMultiplier = 1.8;
            multipliers.itSelfDamage = 0.2;
            multipliers.speedMultiplier = 0.8;
            break;
        case "Extreme Speed":
            multipliers.danoMultiplier = 0.8;
            multipliers.speedMultiplier = 2;
            break;
        case "Earthquake":
            multipliers.danoMultiplier = 1;
            break;
        case "Poison Jab":
            multipliers.danoMultiplier = 0.8;
            break;
        case "Drill Run":
            multipliers.danoMultiplier = 0.8;
            break;
        case "Knock Off":
            multipliers.danoMultiplier = 0.65;
    }
    return multipliers;
}

//funcao de ataque simples dos pokemons
window.atacar = function(move, pokemonEsquerda, esquerdaVida, pokemonDireita, danoDireita, speedDireita, vidaDireita, pikachu, numQuestao){

    let statusPokemon = pegarStatus(pokemonEscolhido);
        //se for mais rapido
        if (statusPokemon.speed * danoAtaque(move).speedMultiplier > speedDireita){

            if (pikachu){
                pikachu.style.animation = "ataqueEsquerda 1s";
            }
        setTimeout(() => {
            pokemonEsquerda.style.animation = "ataqueEsquerda 1s";
        }, 300);

        setTimeout(() => {
            if (pikachu){
                pikachu.style.animation = "";
            }
            pokemonEsquerda.style.animation = "";
        }, 1000);
        vidaDireita.value -= statusPokemon.dano * danoAtaque(move).danoMultiplier;

        setTimeout(() => {

            if (vidaDireita.value <= 0){
                option(numQuestao, 9);
            }else if (numQuestao === 20){
                audioObliterar.play();
                document.getElementById('indestrutivel').pause();
                setTimeout(() => {
                    pokemonDireita.style.animation = "ataqueDireita 1s";
                    esquerdaVida.value -= danoDireita;

                    setTimeout(() => {
                        pokemonDireita.style.animation = "";
                        console.log(esquerdaVida.value);
                    }, 1000);
                    
                    if (esquerdaVida.value <= 0){
                    option(numQuestao);
                    pokemonEscolhido = null;
                    }
                }, 5000);
            }
            else{    
                pokemonDireita.style.animation = "ataqueDireita 1s";
                esquerdaVida.value -= danoDireita;

                setTimeout(() => {
                pokemonDireita.style.animation = "";
                }, 1000);
            }
            if (esquerdaVida.value <= 0){
                option(numQuestao);
                pokemonEscolhido = null;
            }
        }, 1500);
        
        }else{

            // se for mais lento
            if (numQuestao === 20){
                audioObliterar.play();
                document.getElementById('indestrutivel').pause();
                setTimeout(() => {
                    pokemonDireita.style.animation = "ataqueDireita 1s";
                    esquerdaVida.value -= danoDireita;

                    setTimeout(() => {
                        pokemonDireita.style.animation = "";
                    }, 1000);

                     if (esquerdaVida.value <= 0){
                        option(numQuestao);
                        pokemonEscolhido = null;
                     }
                }, 5000);
            }else{
                pokemonDireita.style.animation = "ataqueDireita 1s";
                esquerdaVida.value -= danoDireita;
                setTimeout(() => {
                    pokemonDireita.style.animation = "";
                }, 1000);
            }

            setTimeout(() => {
                if (esquerdaVida.value <= 0){
                    option(numQuestao);
                    pokemonEscolhido = null;
            }else{
                vidaDireita.value -= statusPokemon.dano * danoAtaque(move).danoMultiplier;
                if (pikachu){
                    pikachu.style.animation = "ataqueEsquerda 1s";
                }
                setTimeout(() => {
                    pokemonEsquerda.style.animation = "ataqueEsquerda 1s";
                }, 300);

                setTimeout(() => {
                    if (pikachu){
                        pikachu.style.animation = "";
                    }
                    pokemonEsquerda.style.animation = "";
                }, 1000);
            }
            if (vidaDireita.value <= 0){
                option(numQuestao, 9);
            }
            }, 1500);
        }
    }
//q19 ajude pikachu  a matar onix

function pikachuVsOnix(){

    let statusPokemon = pegarStatus(pokemonEscolhido);

    let question = document.getElementById('q19');
    question.innerHTML = "";
    question.textContent = "";
    question.style.background = "url('../img/backgroundPokemonBattles.webp')";
    question.style.height = "clamp(200px, 50dvh, 700px)";

    let onix = document.createElement("img");
    onix.src = "../img/onix.gif";
    onix.id = "onix";
    question.appendChild(onix);
    let onixDados = document.createElement('span');
    onixDados.textContent = 'Onix - level 35';
    onixDados.id = "onixDados";
    question.appendChild(onixDados);
    let onixVida = document.createElement('meter');
    onixVida.id = "onixVida";
    onixVida.min = "0";
    onixVida.max = "300";
    onixVida.low = "100";
    onixVida.optimum = "220";
    onixVida.value = "300";
    question.appendChild(onixVida);

    let pikachu = document.createElement("img");
    pikachu.src = "../img/pikachuRunning.webp";
    pikachu.id = "pikachu";
    question.appendChild(pikachu);
    

    let esquerdaDados = document.createElement('span');
    esquerdaDados.textContent = 'Pikachu - level 35 e ' + statusPokemon.nome + ' - level 100';
    esquerdaDados.id = "esquerdaDados";
    question.appendChild(esquerdaDados);
    let esquerdaVida = document.createElement('meter');
    esquerdaVida.id = "esquerdaVida";
    esquerdaVida.min = "0";
    esquerdaVida.max = statusPokemon.vida + 100;
    esquerdaVida.low = (statusPokemon.vida + 100) / 3;
    esquerdaVida.optimum = (statusPokemon.vida + 100) / 1.2;
    esquerdaVida.value = statusPokemon.vida + 100;
    question.appendChild(esquerdaVida);

    let pokemonEsquerda = document.createElement('img');
    pokemonEsquerda.src = statusPokemon.src;
    pokemonEsquerda.id = "pokemonEsquerda";
    question.appendChild(pokemonEsquerda);

    let ataquesDiv = document.createElement('div');
    ataquesDiv.id = "ataquesDiv";
    question.appendChild(ataquesDiv);

    let ataque1 = document.createElement('button');
    ataque1.textContent = statusPokemon.move1;
    ataque1.classList.add("ataques");
    ataque1.onclick = () => atacar(statusPokemon.move1, pokemonEsquerda, esquerdaVida, onix, 200, 262, onixVida, pikachu, 19);
    ataquesDiv.appendChild(ataque1);

    let ataque2 = document.createElement('button');
    ataque2.textContent = statusPokemon.move2;
    ataque2.classList.add("ataques");
    ataque2.onclick = () => atacar(statusPokemon.move2, pokemonEsquerda, esquerdaVida, onix, 200, 262, onixVida, pikachu, 19);
    ataquesDiv.appendChild(ataque2);

    let ataque3 = document.createElement('button');
    ataque3.textContent = statusPokemon.move3;
    ataque3.classList.add("ataques");
    ataque3.onclick = () => atacar(statusPokemon.move3, pokemonEsquerda, esquerdaVida, onix, 200, 262, onixVida, pikachu, 19);
    ataquesDiv.appendChild(ataque3);

    let ataque4 = document.createElement('button');
    ataque4.textContent = statusPokemon.move4;
    ataque4.classList.add("ataques");
    ataque4.onclick = () => atacar(statusPokemon.move4, pokemonEsquerda, esquerdaVida, onix, 200, 262, onixVida, pikachu, 19);
    ataquesDiv.appendChild(ataque4);
}

//Q 20, x1 com shiny mega rayquaza level 100 com 6 ivs perfeitos

function vsRayquaza(){

    let statusPokemon = pegarStatus(pokemonEscolhido);

    let question = document.getElementById('q20');
    question.innerHTML = "";
    question.textContent = "";
    question.style.background = "url('../img/backgroundPokemonBattles.webp')";
    question.style.height = "clamp(200px, 50dvh, 700px)";

    document.getElementById('indestrutivel').play();
    

    let shinyRayquaza = document.createElement("img");
    shinyRayquaza.src = "../img/rayquazaDireita.gif";
    shinyRayquaza.id = "shinyRayquaza";
    question.appendChild(shinyRayquaza);
    let shinyRayquazaDados = document.createElement('span');
    shinyRayquazaDados.textContent = 'Shiny Mega Rayquaza - level 100';
    shinyRayquazaDados.id = "shinyRayquazaDados";
    question.appendChild(shinyRayquazaDados);
    let shinyRayquazaVida = document.createElement('meter');
    shinyRayquazaVida.id = "shinyRayquazaVida";
    shinyRayquazaVida.min = "0";
    shinyRayquazaVida.max = "414";
    shinyRayquazaVida.low = "120";
    shinyRayquazaVida.optimum = "350";
    shinyRayquazaVida.value = "414";
    question.appendChild(shinyRayquazaVida);

    let esquerdaDados = document.createElement('span');
    esquerdaDados.textContent = statusPokemon.nome + ' - level 100';
    esquerdaDados.id = "esquerdaDados";
    question.appendChild(esquerdaDados);
    let esquerdaVida = document.createElement('meter');
    esquerdaVida.id = "esquerdaVida";
    esquerdaVida.min = "0";
    esquerdaVida.max = statusPokemon.vida + 100;
    esquerdaVida.low = (statusPokemon.vida + 100) / 3;
    esquerdaVida.optimum = (statusPokemon.vida + 100) / 1.2;
    esquerdaVida.value = statusPokemon.vida + 100;
    question.appendChild(esquerdaVida);

    let pokemonEsquerda = document.createElement('img');
    pokemonEsquerda.src = statusPokemon.src;
    pokemonEsquerda.id = "pokemonEsquerda";
    question.appendChild(pokemonEsquerda);

    let ataquesDiv = document.createElement('div');
    ataquesDiv.id = "ataquesDiv";
    question.appendChild(ataquesDiv);

    let ataque1 = document.createElement('button');
    ataque1.textContent = statusPokemon.move1;
    ataque1.classList.add("ataques");
    ataque1.onclick = () => atacar(statusPokemon.move1, pokemonEsquerda, esquerdaVida, shinyRayquaza, 504, 361, shinyRayquazaVida, null, 20);
    ataquesDiv.appendChild(ataque1);

    let ataque2 = document.createElement('button');
    ataque2.textContent = statusPokemon.move2;
    ataque2.classList.add("ataques");
    ataque2.onclick = () => atacar(statusPokemon.move2, pokemonEsquerda, esquerdaVida, shinyRayquaza, 504, 361, shinyRayquazaVida, null, 20);
    ataquesDiv.appendChild(ataque2);

    let ataque3 = document.createElement('button');
    ataque3.textContent = statusPokemon.move3;
    ataque3.classList.add("ataques");
    ataque3.onclick = () => atacar(statusPokemon.move3, pokemonEsquerda, esquerdaVida, shinyRayquaza, 504, 361, shinyRayquazaVida, null, 20);
    ataquesDiv.appendChild(ataque3);

    let ataque4 = document.createElement('button');
    ataque4.textContent = statusPokemon.move4;
    ataque4.classList.add("ataques");
    ataque4.onclick = () => atacar(statusPokemon.move4, pokemonEsquerda, esquerdaVida, shinyRayquaza, 504, 361, shinyRayquazaVida, null, 20);
    ataquesDiv.appendChild(ataque4);
}
