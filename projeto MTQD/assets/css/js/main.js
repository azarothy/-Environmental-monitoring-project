document.addEventListener("DOMContentLoaded", () => {
  // Inicialização
  configurarAbas();
  configurarTema();
  iniciarSimulacao();
});

// Variáveis globais para o mapa
let mapa = null;
let marcadores = [];

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

      // Se for a aba do mapa, inicializa o mapa
      if (nomeAba === 'mapa') {
        setTimeout(inicializarMapa, 100);
      }
    });
  });
}

  // --- Função: Inicializar Mapa ---
function inicializarMapa() {
  // Se o mapa já foi inicializado, apenas retorna
  if (mapa) {
    mapa.invalidateSize();
    return;
  }

  // Coordenadas centrais da Amazônia Brasileira
  const centroAmazonia = [-3.4653, -62.2159]; // Região central da Amazônia
  const zoomInicial = 6; // Zoom para mostrar boa parte da Amazônia

  // Inicializa o mapa focado na Amazônia
  mapa = L.map('mapa-interativo').setView(centroAmazonia, zoomInicial);

  // Adiciona a camada do mapa
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 13, // Reduz um pouco o zoom máximo para focar na região
    minZoom: 5   // Zoom mínimo para não sair da região
  }).addTo(mapa);

  // Limita a visualização à região da Amazônia (opcional)
  mapa.setMaxBounds([
    [-12.0, -75.0], // sudoeste
    [5.0, -45.0]    // nordeste
  ]);

  // Adiciona sensores de exemplo na Amazônia
  adicionarSensoresAmazonia();

  // Evento para adicionar marcador ao clicar no mapa
  mapa.on('click', function(e) {
    adicionarMarcador(e.latlng.lat, e.latlng.lng, 'Novo Ponto de Monitoramento');
  });

  // Configura botões de controle
  document.getElementById('localizar-usuario').addEventListener('click', localizarUsuario);
  document.getElementById('limpar-marcadores').addEventListener('click', limparMarcadores);

  // Ajusta o tamanho do mapa
  setTimeout(() => {
    mapa.invalidateSize();
  }, 300);
}

// --- Função: Adicionar Marcador ---
function adicionarMarcador(lat, lng, titulo = 'Sensor Ambiental') {
  const marcador = L.marker([lat, lng]).addTo(mapa);
  
  // Simula dados ambientais para a região
  const temperatura = (Math.random() * 8 + 24).toFixed(1); // 24-32°C típico da Amazônia
  const umidade = (Math.random() * 20 + 75).toFixed(0); // 75-95% umidade alta
  const qualidadeAr = Math.random() > 0.7 ? 'Alerta' : 'Normal';
  
  marcador.bindPopup(`
    <div class="popup-mapa">
      <h4>${titulo}</h4>
      <p><strong>Coordenadas:</strong><br>
      Lat: ${lat.toFixed(4)}<br>
      Lng: ${lng.toFixed(4)}</p>
      <p><strong>Dados Ambientais:</strong><br>
      🌡 ${temperatura}°C | 💧 ${umidade}%<br>
      🌀 Qualidade do Ar: ${qualidadeAr}</p>
      <button onclick="removerMarcador(${marcadores.length})" class="btn-remover">
        <i class="fa-solid fa-trash"></i> Remover
      </button>
    </div>
  `);

  marcadores.push(marcador);
  atualizarContadorMarcadores();
  return marcador;
}

// --- Função: Remover Marcador ---
function removerMarcador(index) {
  if (marcadores[index]) {
    mapa.removeLayer(marcadores[index]);
    marcadores.splice(index, 1);
    atualizarContadorMarcadores();
  }
}

// --- Função: Limpar Todos os Marcadores ---
function limparMarcadores() {
  marcadores.forEach(marcador => mapa.removeLayer(marcador));
  marcadores = [];
  atualizarContadorMarcadores();
}

// --- Função: Atualizar Contador de Marcadores ---
function atualizarContadorMarcadores() {
  const contador = document.getElementById('contador-marcadores');
  if (contador) {
    contador.textContent = `Marcadores: ${marcadores.length}`;
  }
}

// --- Função: Localizar Usuário ---
function localizarUsuario() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        mapa.setView([lat, lng], 15);
        adicionarMarcador(lat, lng, 'Minha Localização');
      },
      function(error) {
        alert('Erro ao obter localização: ' + error.message);
      }
    );
  } else {
    alert('Geolocalização não é suportada por este navegador.');
  }
}

// --- Função: Adicionar Sensores na Amazônia ---
function adicionarSensoresAmazonia() {
  // Principais cidades e locais estratégicos da Amazônia
  const sensores = [
    { lat: -3.1190, lng: -60.0217, nome: 'Sensor Manaus', tipo: 'Urbano' },
    { lat: -2.4410, lng: -54.7080, nome: 'Sensor Santarém', tipo: 'Fluvial' },
    { lat: -9.9747, lng: -67.8100, nome: 'Sensor Rio Branco', tipo: 'Fronteira' },
    { lat: -4.2628, lng: -55.9920, nome: 'Sensor Itaituba', tipo: 'Mineração' },
    { lat: -7.1550, lng: -55.7830, nome: 'Sensor Altamira', tipo: 'Hidrelétrica' },
    { lat: -0.6135, lng: -47.3580, nome: 'Sensor Macapá', tipo: 'Costeiro' },
    { lat: -2.5290, lng: -65.9580, nome: 'Sensor Tefé', tipo: 'Reserva' },
    { lat: -5.5190, lng: -61.1760, nome: 'Sensor Humaitá', tipo: 'Monitoramento' },
    { lat: -1.4558, lng: -48.4902, nome: 'Sensor Belém', tipo: 'Metropolitano' },
    { lat: -8.7612, lng: -63.9040, nome: 'Sensor Porto Velho', tipo: 'Fronteira' }
  ];

  sensores.forEach(sensor => {
    adicionarMarcador(sensor.lat, sensor.lng, `${sensor.nome} (${sensor.tipo})`);
  });
}

// --- Função: Alternar tema claro/escuro ---
function configurarTema() {
  const botaoTema = document.getElementById("toggle-tema");
  const temaSalvo = localStorage.getItem("tema") || "claro";
  document.body.setAttribute("data-tema", temaSalvo);
  atualizarIconeTema(temaSalvo);

  botaoTema.addEventListener("click", () => {
    const temaAtual = document.body.getAttribute("data-tema");
    const novoTema = temaAtual === "escuro" ? "claro" : "escuro";
    document.body.setAttribute("data-tema", novoTema);
    localStorage.setItem("tema", novoTema);
    atualizarIconeTema(novoTema);
  });
}

// --- Função: Atualizar Ícone do Tema ---
function atualizarIconeTema(tema) {
  const botaoTema = document.getElementById("toggle-tema");
  const icone = botaoTema.querySelector('i');
  icone.className = tema === 'escuro' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
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

// --- Função: Destacar Áreas de Preservação (Opcional) ---
function destacarAreasPreservacao() {
  // Exemplo de áreas de preservação (coordenadas aproximadas)
  const areasPreservacao = [
    {
      nome: "Reserva Extrativista Chico Mendes",
      coords: [[-10.5, -68.5], [-10.0, -67.5], [-9.5, -68.0]]
    },
    {
      nome: "Parque Nacional do Jaú",
      coords: [[-2.0, -62.5], [-2.5, -63.5], [-3.0, -62.0]]
    }
  ];

  areasPreservacao.forEach(area => {
    const poligono = L.polygon(area.coords, {
      color: 'green',
      fillColor: '#22c55e',
      fillOpacity: 0.1,
      weight: 2
    }).addTo(mapa);

    poligono.bindPopup(`<b>${area.nome}</b><br>Área de Preservação Ambiental`);
  });
}