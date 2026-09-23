import "./App.css"

// Importa o Hook useState da biblioteca React
// Ele permite armazenar valores e atualizar a tela automaticamente
import { useState } from "react";

// Cria o componente principal da aplicação
function App() {

  // Estado responsável por armazenar a cidade digitada
  const [cidade, setCidade] = useState("");

  // Estado responsável por armazenar a temperatura
  const [temperatura, setTemperatura] = useState("");

  // Estado responsável por armazenar a condição climática
  const [clima, setClima] = useState("");

  // Estado responsável por armazenar a umidade
  const [umidade, setUmidade] = useState("");

  // Define a classe de fundo conforme o clima
  let classeClima = "sunny";

  if (clima.toLowerCase().includes("chuva")) {
    classeClima = "rainy";
  } else if (
    clima.toLowerCase().includes("nuv") ||
    clima.toLowerCase().includes("encoberto")
  ) {
    classeClima = "cloudy";
  } else if (
    clima.toLowerCase().includes("tempest")
  ) {
    classeClima = "storm";
  } else if (
    clima.toLowerCase().includes("neve")
  ) {
    classeClima = "snow";
  }

  // Função executada quando o usuário clicar no botão Consultar
  async function consultarClima() {

    // Verifica se o campo está vazio
    if (cidade === "") {
      alert("Digite uma cidade!");
      return;
    }

    try {

      // Faz a requisição para a API
      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=2629ab0b65c6a1225e9596d1450f03d1&units=metric&lang=pt_br`
      );

      // Converte a resposta para JSON
      const dados = await resposta.json();

      // Verifica se a cidade foi encontrada
      if (dados.cod !== 200) {
        alert("Cidade não encontrada!");
        return;
      }

      // Atualiza a temperatura
      setTemperatura(dados.main.temp + "°C");

      // Atualiza a condição climática
      setClima(dados.weather[0].description);

      // Atualiza a umidade
      setUmidade(dados.main.humidity + "%");

    } catch (erro) {

      console.log(erro);

      alert("Erro ao consultar a API.");

    }
  }

  // Retorna a interface visual do sistema
  return (

    // Container principal da aplicação
    <div className={`app ${classeClima}`}>

      {/* Título principal */}
      <h1 className="titulo">
        Sistema de Previsão do Tempo
      </h1>

      <div className="conteudo">

        {/* Campo para digitação da cidade */}
        <div className="consulta">

          <input

            // Tipo do campo
            type="text"

            // Texto exibido dentro da caixa
            placeholder="Digite uma cidade"

            // Valor vinculado ao estado cidade
            value={cidade}

            // Atualiza o estado quando o usuário digita
            onChange={(e) => setCidade(e.target.value)}
          />

          {/* Botão de consulta */}
          <button

            // Executa a função consultarClima
            onClick={consultarClima}

          >

            {/* Texto exibido no botão */}
            Consultar

          </button>

        </div>

        {/* Área de exibição dos dados */}
        <div className="info">

          {/* Exibe a cidade informada */}
          <h2>Cidade: {cidade}</h2>

          {/* Exibe a temperatura */}
          <h2>Temperatura: {temperatura}</h2>

          {/* Exibe a condição climática */}
          <h2>Clima: {clima}</h2>

          {/* Exibe a umidade */}
          <h2>Umidade: {umidade}</h2>

        </div>

      </div>

    </div>
  );
}

// Exporta o componente App para ser utilizado pelo React
export default App;