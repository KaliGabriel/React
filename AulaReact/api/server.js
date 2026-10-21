import express from "express";

import cors from "cors";

//Impora o módulo FS (File System)
//Este módulo permite ler e escrever arquivos utilizando JavaScript
import fs from "fs";

//Importa a conexão criada com o Firebase
import db from "./firebase.js";

import {
    ref,
    push
} from "firebase/database";

const app = express();

app.use(cors());

//Permite que a API receba e interprete dados no formato Json
app.use(express.json());

let historico = [];

//Verifica se o arquivo historico.json existe
//Caso exist, os dados serão carregados para dentro do vetor historico
if (fs.existsSync("./api/historico.json")) {

    //Lê o conteúdo do arquivo histórico.json
    const dadosArquivo = fs.readFileSync (
        "./api/historico.json",
        "utf8"
    );

    try {
        if (dadosArquivo.trim() !== "") {

            //Converte o Json do arquivo para Array JavaScript
            historico = JSON.parse(dadosArquivo);
        } else {

            historico = [];

        }
    } catch {
        historico = [];
    }
}

app.get("/historico", (req, res) => {
    res.json(historico);
});

app.post("/historico", async (req, res) => {
    historico.push(req.body);

    //Cria uma referência chamada "historico" dentro do Firebase, caso ela não exista, o Firebase irá criá-la automáticamente
    const referenciaFirebase = ref(
        db,
        "historico"
    );

    //Salva uma cópia dos dados também no Firebase
    //Realtime Database
    await push(
        referenciaFirebase,
        req.body
    );

    //Converte o array JavaScript para o formato Json
    //O número 2 deixa o arquivo organizado e legível
    const historicoJSON = JSON.stringify(
        historico,
        null,
        2
    );

    //Salva os dados atualizados no arquivo historico.josn
    //Assim os registros permanecem armazenados mesmo após desligar o servidor
    fs.writeFileSync(
        "./api/historico.json",
        historicoJSON
    );

    //Retorna uma mensagem informando que o registro foi salvo com sucesso
    res.json ({
        mensagem: "Consulta salva"
    });
});

//Inicialização do servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});