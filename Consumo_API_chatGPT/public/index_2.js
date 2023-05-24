
        const grupoBotoes = document.getElementById('grupobotoes');
        const conjuntoTags = [];
  
        const botao01 = document.createElement('div');
        botao01.className = 'botao col mb-3';
        botao01.innerHTML = `<button id="botao_01" class="btn btn-primary btn-lg answer-button w-100 my-custom-text">{{correta}}</button>`;
        conjuntoTags.push(botao01);
  
        const botao02 = document.createElement('div');
        botao02.className = 'botao col mb-3';
        botao02.innerHTML = `<button id="botao_02" class="btn btn-primary btn-lg answer-button w-100 my-custom-text">{{errada1}}</button>`;
        conjuntoTags.push(botao02);
  
        const botao03 = document.createElement('div');
        botao03.className = 'botao col mb-3';
        botao03.innerHTML = `<button id="botao_03" class="btn btn-primary btn-lg answer-button w-100 my-custom-text">{{errada2}}</button>`;
        conjuntoTags.push(botao03);
  
        const botao04 = document.createElement('div');
        botao04.className = 'botao col mb-3';
        botao04.innerHTML = `<button id="botao_04" class="btn btn-primary btn-lg answer-button w-100 my-custom-text">{{errada3}}</button>`;
        conjuntoTags.push(botao04);
  
        conjuntoTags.sort(function() {
          return 0.5 - Math.random();
        });
        conjuntoTags.forEach(tag => grupoBotoes.appendChild(tag));

document.addEventListener('DOMContentLoaded', async function() {
  await fetch('http://localhost:8080/')
    .then(response => response.json())
    .then(data => {

      const botao01Element = document.getElementById('botao_01');
      const botao02Element = document.getElementById('botao_02');
      const botao03Element = document.getElementById('botao_03');
      const botao04Element = document.getElementById('botao_04');

      const correta = data.correta;
      const errada1 = data.errada1;
      const errada2 = data.errada2;
      const errada3 = data.errada3;

      botao01Element.innerHTML = correta;
      botao02Element.innerHTML = errada1;
      botao03Element.innerHTML = errada2;
      botao04Element.innerHTML = errada3;
    })
    .catch(error => {
      console.error('Erro ao obter os dados:', error);
    });
});