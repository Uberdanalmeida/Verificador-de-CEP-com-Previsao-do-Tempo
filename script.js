async function Ceps() {
  const cep = document.getElementById("cep").value;
  const lugar = document.getElementById("resul");

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
  } catch (erro) {
    lugar.innerHTML = "Erro ao buscar o CEP.";
    console.log(erro);
  }

  const inputCep = document.getElementById("cep");
  inputCep.value = "";
  inputCep.focus();
}

document.getElementById("cep").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    Ceps();
  }
});
