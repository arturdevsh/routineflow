const form = document.getElementById("form-rotina");
const input = document.getElementById("addrotina");
const lista = document.getElementById("lista-rotinas");
const inputHorario = document.getElementById("horario");
const selectDia = document.getElementById("dia");
const filtroDia = document.getElementById("filtro-dia");

let tarefas = [];

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {
  lista.innerHTML = "";

  const dias = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const diaSelecionado = filtroDia.value;

  dias.forEach(function (dia) {
    if (diaSelecionado !== "Todos" && dia !== diaSelecionado) {
      return;
    }

    const tituloDia = document.createElement("h2");
    tituloDia.textContent = dia;

    const ul = document.createElement("ul");

    tarefas
      .filter(function (tarefa) {
        return tarefa.dia === dia;
      })
      .forEach(function (tarefa, index) {
        const li = document.createElement("li");
        li.textContent = `${tarefa.horario} - ${tarefa.texto}`;

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
        ul.appendChild(li);
      });

    if (ul.children.length > 0) {
      lista.appendChild(tituloDia);
      lista.appendChild(ul);
    }
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
    horario: inputHorario.value,
    dia: selectDia.value,
    concluida: false,
  });

  salvarTarefas();
  renderizarTarefas();
  input.value = "";
  inputHorario.value = "";
  selectDia.value = "Segunda";
});

const tarefasSalvas = localStorage.getItem("tarefas");

if (tarefasSalvas) {
  tarefas = JSON.parse(tarefasSalvas);
  renderizarTarefas();
}

filtroDia.addEventListener("change", function () {
  renderizarTarefas();
});
