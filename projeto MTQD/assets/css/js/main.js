document.addEventListener("DOMContentLoaded", () => {
  // Inicialização
  configurarAbas();
  configurarTema();
  iniciarSimulacao();
});

// --- Função: Alternar entre abas ---
function configurarAbas() {
  const botoes = document.querySelectorAll("#sidebar nav button[data-tab]");
  const abas = document.querySelectorAll(".aba");

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      const nomeAba = btn.dataset.tab;

      // Desativa todas as abas
      abas.forEach(aba => aba.classList.remove("ativa"));
      botoes.forEach(b => b.classList.remove("ativo"));

      // Ativa a aba clicada e o botão correspondente
      const abaAlvo = document.getElementById(nomeAba);
      if (abaAlvo) abaAlvo.classList.add("ativa");
      btn.classList.add("ativo");
    });
  });
}

// --- Função: Alternar tema claro/escuro ---
function configurarTema() {
  const botaoTema = document.getElementById("toggle-tema");
  const temaSalvo = localStorage.getItem("tema") || "claro";
  document.body.setAttribute("data-tema", temaSalvo);

  botaoTema.addEventListener("click", () => {
    const temaAtual = document.body.getAttribute("data-tema");
    const novoTema = temaAtual === "escuro" ? "claro" : "escuro";
    document.body.setAttribute("data-tema", novoTema);
    localStorage.setItem("tema", novoTema);
  });
}

// --- Funções de simulação de dados ---
function iniciarSimulacao() {
  atualizarDados();
  setInterval(atualizarDados, 5000);
}

function atualizarDados() {
  const temp = (Math.random() * 10 + 28).toFixed(1);
  const umidade = (Math.random() * 30 + 50).toFixed(0);
  const focos = Math.floor(Math.random() * 5);
  const sensores = 8 + Math.floor(Math.random() * 3);

  document.getElementById("tempAtual").innerText = `${temp} °C`;
  document.getElementById("umidadeAtual").innerText = `${umidade} %`;
  document.getElementById("focosCalor").innerText = focos;
  document.getElementById("sensoresOnline").innerText = sensores;
  document.getElementById("timestamp").innerText = new Date().toLocaleTimeString();
}

// --- Função: Inicializar o mapa (Google Maps) ---
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -23.5505, lng: -46.6333 }, // mapa de sp, trocar para o do amazonas
    zoom: 12
  });
}
