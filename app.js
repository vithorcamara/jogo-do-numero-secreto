let listaDeNumerosSorteados = [];
let numeroLimite = 98;
let tentativas = 0;
let numeroSecreto = gerarNumeroSecreto();

function exibirTextoNaTela(tag, texto){
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Adivinhe o número secreto entre 1 e 100');
}

function verificarChute(){
    tentativas++;
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
        let resultado = `Parabéns você acertou com ${tentativas} ${palavraTentativa}.`
        exibirTextoNaTela('p', resultado);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if(chute < numeroSecreto){
        exibirTextoNaTela('p', 'Tente um número maior!');
        limparCampo();
    } else {
        exibirTextoNaTela('p', 'Tente um número menor!');
        limparCampo();
    }
}

function gerarNumeroSecreto(){
    let numeroEscolhido = Math.floor(Math.random() * 100) + 1;
    if(listaDeNumerosSorteados.length == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroSecreto();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    limparCampo();
    numeroSecreto = gerarNumeroSecreto();
    tentativas = 0;
    exibirMensagemInicial();
}

exibirMensagemInicial();