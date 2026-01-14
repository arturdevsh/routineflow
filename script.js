const form = document.getElementById("form-rotina");
const input = document.getElementById("addrotina");
const lista = document.getElementById("lista-rotinas");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const textoRotina = input.value;

  if (textoRotina === "") {
    return;
  }
  const li = document.createElement("li");
  li.textContent = textoRotina;
  lista.appendChild(li);
  input.value = "";
});
