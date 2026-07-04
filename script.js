async function Ceps() {
  const cep = document.getElementById("cep").value;
  const lugar = document.getElementById("resul");
  const tempo = document.getElementById("tempo");

  tempo.style.display = "none";

  try {

    // ViaCEP
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      lugar.innerHTML = "CEP não encontrado.";
      return;
    }

    lugar.innerHTML = `
        <strong>${data.logradouro}</strong><br>
        ${data.bairro}<br>
        ${data.localidade} - ${data.uf}
    `;

    // Geolocalização da cidade
    const geo = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${data.localidade}&count=1`
    );

    const geoData = await geo.json();

    const { latitude, longitude } = geoData.results[0];

    // Previsão do tempo
    const clima = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    const climaData = await clima.json();

    // Ícones
    const icones = {
      0: "☀️",
      1: "🌤️",
      2: "⛅",
      3: "☁️",
      45: "🌫️",
      48: "🌫️",
      51: "🌦️",
      61: "🌧️",
      63: "🌧️",
      65: "🌧️",
      71: "❄️",
      80: "🌦️",
      95: "⛈️"
    };

    const icone = icones[climaData.current.weather_code] || "🌍";

    tempo.style.display = "block";

    tempo.innerHTML = `
    <h2>Previsão do Tempo</h2>

    <div class="topo-clima">
        <div class="temp">${climaData.current.temperature_2m}°C</div>
        <div class="icone">${icone}</div>
    </div>

    <div class="local-clima">
        <strong>${data.bairro}</strong><br>
        <span>${data.localidade} - ${data.uf}</span>
    </div>

    <div class="info">
        <div>🌡️ Máx.<br>${climaData.daily.temperature_2m_max[0]}°C</div>
        <div>❄️ Mín.<br>${climaData.daily.temperature_2m_min[0]}°C</div>
        <div>💧 Umidade<br>${climaData.current.relative_humidity_2m}%</div>
        <div>💨 Vento<br>${climaData.current.wind_speed_10m} km/h</div>
    </div>
`;

  } catch (erro) {
    lugar.innerHTML = "Erro ao buscar o CEP.";
    console.log(erro);
  }
}