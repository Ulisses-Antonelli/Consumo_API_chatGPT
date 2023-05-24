
let perguntaRespostas = {
  "questao": "Qual o maior planeta do sistema solar?",
  "correta": "Júpiter",
  "errada1": "Saturno",
  "errada2": "Vênus"
};

let respostaCorreta = false;

function atualizarPerguntaRespostas(jsonResposta) {
  perguntaRespostas = jsonResposta;

  const perguntaElement = document.getElementById('questao');
  perguntaElement.textContent = perguntaRespostas.questao;

  const botoes = document.getElementsByClassName('botao');
  botoes[0].textContent = perguntaRespostas.correta;
  botoes[1].textContent = perguntaRespostas.errada1;
  botoes[2].textContent = perguntaRespostas.errada2;
}

function exibirRespostaCorreta() {
  if (respostaCorreta) {
    console.log("Resposta correta!");
  }
}

function proximaPergunta() {
  respostaCorreta = false;
  gerarNovaPergunta();
}

function gerarNovaPergunta() {
  geraJson()
    .then(jsonResposta => {
      atualizarPerguntaRespostas(jsonResposta);
    })
    .catch(error => {
      console.error("Erro ao gerar nova pergunta:", error);
    });
}

function iniciarJogo() {
  gerarNovaPergunta();
}

function sair() {
  // Lógica para sair do ciclo do jogo
}

const botaoIniciar = document.getElementById('iniciar');
botaoIniciar.addEventListener('click', iniciarJogo);

const botaoSair = document.getElementById('sair');
botaoSair.addEventListener('click', sair);

const botoesRespostas = document.getElementsByClassName('botao');
for (let i = 0; i < botoesRespostas.length; i++) {
  const botao = botoesRespostas[i];
  botao.addEventListener('click', () => {
    if (botao.textContent === perguntaRespostas.correta) {
      respostaCorreta = true;
    }
    exibirRespostaCorreta();
    proximaPergunta();
  });
}