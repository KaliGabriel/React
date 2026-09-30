// importa biblioteca Express, responsável por criar o servidor e as rotas da API
import express from "express";

// importa a biblioteca Cors, que permite a comunicação entre aplicações executadas em portas diferentes (React e API)
import cors from "cors"; 

// cria uma instancia da aplicação Express
const app=express();

// habilita o cors npara permitir requisições vindas do react
app.use(cors());
// Permite que a API receba e interprete dados no formato JSON
app.use(express.json());

// Vetor para armazenar temporariamente todas as consultas realizadas pelo usuário
let historico = [];

// MÉTODO GET
// utilizado para consultar informações já armazenadas na API
// Rota responsável por retornar todo o historico
app.get("/historico",(req, res) =>{

    // Envia a lista completa de consultas em formato JSON
    res.json(historico);
});

//MÉTODO POST
//utilizado para enviar informações para a API
app.post("/historico", (req, res) =>{

    //adiciona os dados recebidos pelo react ao vetor de historico 
    historico.push(req.body);

    res.json({
        mensagem: "Consulta salva"
    })

});

// Inicia a API  na porta 3000
app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000");

});