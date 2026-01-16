const form = document.getElementById("form-rotina");
const input = document.getElementById("addrotina");
const lista = document.getElementById("lista-rotinas");

let tarefas = [];

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {
  lista.innerHTML = "";

  tarefas.forEach(function (tarefa, index) {
    const li = document.createElement("li");
    li.textContent = tarefa.texto;

    if (tarefa.concluida) {
      li.classList.add("concluida");
    }

    li.addEventListener("click", function () {
      tarefa.concluida = !tarefa.concluida;
      salvarTarefas();
      renderizarTarefas();
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "❌";
    btnExcluir.style.marginLeft = "10px";

    btnExcluir.addEventListener("click", function (event) {
      event.stopPropagation();
      tarefas.splice(index, 1);
      salvarTarefas();
      renderizarTarefas();
    });

    li.appendChild(btnExcluir);
    lista.appendChild(li);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const textoRotina = input.value;

  if (textoRotina === "") {
    return;
  }

  tarefas.push({
    texto: textoRotina,
    concluida: false,
  });

  salvarTarefas();
  renderizarTarefas();
  input.value = "";
});

const tarefasSalvas = localStorage.getItem("tarefas");

if (tarefasSalvas) {
  tarefas = JSON.parse(tarefasSalvas);
  renderizarTarefas();
}
