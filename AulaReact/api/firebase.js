//concectando o banco api com o banco do Firebase

//importa a função responsável por inicializar o firebase
import { initializeApp } from "firebase/app";

//importa a função responsável por conectar o realtime database
import { getDatabase } from "firebase/database";

//configuração do projeto no Firebase

//essas informações são geradas automaticamente pelo Firebase quando registramos a nossa aplicação

//elas funcionam como um endereço que permite que a nossa aplicação econtre e se conecte com o banco de dados da nuvem
const firebaseConfig = {
    //identificador unico do aplicativo
    apiKey: "AIzaSyBs2w31DK95PCMo3YGisEieamS4dsOB254",

    //dominio de autenticação do projeto
    authDomain: "system-time.firebaseapp.com",

    // endereço Realtime Database
    databaseURL: "https://system-time-default-rtdb.firebaseio.com",

    // identificador do projeto Firebase
    projectId: "system-time",

    // Serviço de armazenamento de arquivos
    storageBucket: "system-time.firebasestorage.app",

    // Identificador repsonsavel pela troca de mensagens
    messagingSenderId: "105922965010",

    // Identificador unico da aplicação web
    appId: "1:105922965010:web:e264aef2f79d706f2df2cb",

    // Identificador utilizado pelo Google Analytics
    measurementId: "G-42DPXLXWG3"
}

// Inicialização do Firebase utilizando as configuração acima
const app = initializeApp(firebaseConfig); 

// Cria uma conexão com o Realtime Database

// A partir deste objeto será possviel
// ¬ Ler Dados
// ¬ Salvar dados
// ¬ Atualizar dados
// ¬ Excluir dados
const db = getDatabase(app);

// Exporta a conexão para que ela possa ser utilizada em outros arquivos
// como o server.js
export default db;