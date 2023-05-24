const { Configuration, OpenAIApi } = require ("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const gerarQuestao = async () => {
  const prompt = `
  Gere uma questão relacionada a um assunto aleatório, porém fácil, que venha no seguinte formato indicado abaixo entre os **:
  Entenda que a questão gerada deve vir neste formato apenas, não pode ser nada além disso!
  A resposta será consumida por uma aplicação, portanto deve vir no formato indicado
  Não pode haver explicação!
  Nem contexto adicionais!
  Deve vir neste formato!:
  **
  perguntaRespostas = {
    "questao": "Qual a capital do Brasil?",
    "correta": "Brasília",
    "errada1": "São Paulo",
    "errada2": "Rio de Janeiro",
    "errada3": "Curitiba"
  }
  **
  `;
  const completion = await openai.createChatCompletion({  
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt}],
    max_tokens: 2048,
    temperature: 0.9,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0
  });

  const respostaApi = completion.data.choices[0].message;
  const respostaFormatada1 = respostaApi.content.replace('perguntaRespostas = ', "");
  const respostaFormatada2 = respostaFormatada1.replace(/'/g, '"');
  
  return JSON.parse(respostaFormatada2, (key, value) => {
    if (typeof value === 'string') {
      return value.replace(/"/g, '\\"'); // adiciona escape às aspas duplas
    }
    return value;
  });
  return jsonResposta;
};

const geraJson = async () => { 
  try {
    const jsonResposta = await gerarQuestao();
    console.log(JSON.stringify(jsonResposta)); // imprime a resposta com aspas duplas
    return jsonResposta;
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
  }
}

// try {
//   const respostaFormatada = JSON.parse(respostaApi.content.replace('perguntaRespostas = ', ''));
//   console.log(respostaFormatada)
//   console.log(respostaApi);
//   return respostaFormatada;
// } catch (error) {
//   console.error("Erro ao formatar a resposta:", error);
//   return null;
// }
// };

// gerarQuestao();
// //module.exports = { geraJson };
// //geraJson();
module.exports = {geraJson}
// module.exports = {gerarQuestao}






