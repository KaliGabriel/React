// Hook é uma ferramenta específica que existe dentro da biblioteca do react
// useState, serve para armazenar dados que podem mudar durante a execução do programa 
// useEffect, serve para executar tarefas automáticas 
import { useState, useEffect } from "react";

// função principal do componente app
function App() {
  const tamanhoTabuleiro = 20
  const [cobra, setCobra] = useState({
    x: 5,
    y: 5
  });
}