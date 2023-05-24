const botao01 = { id: 'botao_01', value: 'correta' };
const botao02 = { id: 'botao_02', value: 'errada1' };
const botao03 = { id: 'botao_03', value: '{{errada2}}' };
const botao04 = { id: 'botao_04', value: '{{errada3}}' };

const conjuntoTags = [botao01, botao02, botao03, botao04];
shuffleArray(conjuntoTags);

const grupoBotoes = document.getElementById('grupobotoes');
grupoBotoes.innerHTML = ''; // Limpa o conteúdo anterior

conjuntoTags.forEach(tag => {
  const botaoElement = document.createElement('div');
  botaoElement.className = 'botao col mb-3';
  botaoElement.innerHTML = `<button id="${tag.id}" class="btn btn-primary btn-lg answer-button w-100 my-custom-text">${tag.value}</button>`;
  grupoBotoes.appendChild(botaoElement);
});

document.addEventListener('DOMContentLoaded', function() {
  var responseClone;
  fetch('http://localhost:8080/')
    .then(function(response) {
      responseClone = response.clone();
      return response.json();
    })
    .then(function(data) {
      const botao01Element = document.getElementById('botao_01');
      const botao02Element = document.getElementById('botao_02');
      const botao03Element = document.getElementById('botao_03');
      const botao04Element = document.getElementById('botao_04');

      botao01Element.innerText = data.correta;
      botao02Element.innerText = data.errada1;
      botao03Element.innerText = data.errada2;
      botao04Element.innerText = data.errada3;
    },function(reject){ 
      console.log('Erro + 1', reject, 'responseClone' + responseClone);
      responseClone.text()
      .then(function (btx){
        console.log('Texto: ???', btx);
      })
    })
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
