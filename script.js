async function Ceps() {
  const cep = document.getElementById("cep").value;
  const lugar = document.getElementById("resul");

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      lugar.innerHTML = "CEP não encontrado.";
    } else {
      lugar.innerHTML = `${data.logradouro}, ${data.bairro} <br/>Estado: ${data.estado}, ${data.uf} </br> Região: ${data.regiao}`;
    }
  } catch (error) {
    lugar.innerHTML = "Erro ao buscar o CEP. Tente novamente.";
    console.error("Falha na requisição:", error);
  }
}
