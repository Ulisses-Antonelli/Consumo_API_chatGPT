//importação das dependencias
const { gerarQuestao } = require("./App"); 
const express = require('express');
const handlebars = require("express-handlebars").engine
const app = express();
const path = require('path') 
const bodyParser = require('body-parser');



app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', async (req, res) => {
    try {
      const data = await gerarQuestao();
      //console.log(data);
      //res.json(data);
      res.render('index', data); 
    } catch (error) {
      console.error("Erro ao gerar o JSON:", error);
      res.status(500).json({ error: "Erro ao gerar o JSON" });
    }
  });
  

app.listen(8080, function(){
    console.log("O servidor está ativo")
});