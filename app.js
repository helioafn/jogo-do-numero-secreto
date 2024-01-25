function verificarChute() {
  let chute = document.querySelector("input").valueAsNumber;
  let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
  let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;

  if (chute === numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    exibirTextoNaTela("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela("p", "O número secreto é menor");
    } else {
      exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativas += 1;
    limparCampo();
  }
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}

function exibirMensagemInicial() {
  exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
  exibirTextoNaTela("h1", "Jogo do número secreto");
}

function limparCampo() {
  let chute = document.querySelector("input");
  chute.value = "";
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * 10 + 1, 10);
  let quantidadeDeElementos = listaDeNumerosSorteados.length;

  if (quantidadeDeElementos == numeroLimite) listaDeNumerosSorteados = [];

  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  }

  listaDeNumerosSorteados.push(numeroEscolhido);
  return numeroEscolhido;
}

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

exibirMensagemInicial();
let listaDeNumerosSorteados = [];
let numeroLimite = 10; // Número máximo de números a serem sorteados (1..10)
let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();
