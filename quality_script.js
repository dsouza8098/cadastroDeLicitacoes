//-----------------------------------------------------------
// Função para pegar os valores inseridos no formulário
function valoresDosInputs() {
  return {
    operador: document.getElementById("operador").value,
    localEstado: document.getElementById("localEstado").value,
    localCidade: document.getElementById("localCidade").value,
    objeto: document.getElementById("objeto").value,
    dia: document.getElementById("dia").value,
    horario: document.getElementById("horario").value,
    empresa: document.getElementById("empresa").value,
    statusLicitacao: document.getElementById("status").value, // Corrigido para 'status'
  };
}

//-----------------------------------------------------------
// Função para validar o formulário
function validaFormulario() {
  const elementosDoFormulario = valoresDosInputs(); // Chama a função com os valores dos inputs

  // Validação do campo Operador
  if (elementosDoFormulario.operador.trim() === "") {
    alert("Insira um nome válido para o operador");
    return false;
  }

  // Validação do campo Local
  if (elementosDoFormulario.localEstado.trim() === "") {
    alert("Insira o nome do local");
    return false;
  }

  // Validação do campo LocalCidade
  if (elementosDoFormulario.localCidade.trim() === "") {
    alert("Insira o nome da cidade");
    return false;
  }

  // Validação do campo Objeto
  if (elementosDoFormulario.objeto.trim() === "") {
    alert("Insira o nome do objeto");
    return false;
  }

  // Validação do campo Dia (verifica se a data foi inserida e se é uma data futura)
  if (elementosDoFormulario.dia === "") {
    alert("Insira uma data válida");
    return false;
  } else {
    const dataInserida = new Date(elementosDoFormulario.dia);
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0); // Zera horas para comparar apenas as datas

    if (dataInserida < dataAtual) {
      alert("A data deve ser no futuro ou no presente");
      return false;
    }
  }

  // Validação do campo Horário
  if (elementosDoFormulario.horario.trim() === "") {
    alert("Insira um horário válido");
    return false;
  }

  // Validação do campo Empresa
  if (elementosDoFormulario.empresa.trim() === "") {
    alert("Insira o nome da empresa");
    return false;
  }

  // Validação do campo Status
  if (elementosDoFormulario.statusLicitacao.trim() === "") {
    alert("Informe o status");
    return false;
  }

  // Se todas as validações forem bem-sucedidas
  return true;
}

//--------------------------------------------------------------------
// Função para pegar os dados do local storage
function showData() {
  let itensDaLicitacao = verificaLocalStorage();

  let html = "";

  itensDaLicitacao.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.operador + "</td>";
    html += "<td>" + element.localEstado + "</td>";
    html += "<td>" + element.localCidade + "</td>";
    html += "<td>" + element.objeto + "</td>";
    html += "<td>" + element.dia + "</td>";
    html += "<td>" + element.horario + "</td>";
    html += "<td>" + element.empresa + "</td>";
    html += "<td>" + element.statusLicitacao + "</td>";
    html +=
      '<td><button onclick="deletaDados(' +
      index +
      ')" class="btn btn-danger">Deletar</button><button onclick="atualizarDados(' +
      index +
      ')" class="btn btn-warning m-2">Editar</button></td>'; // Corrigido para 'atualizarDados'
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

//--------------------------------------------------------------------
// Função para adicionar dados ao local storage
function addData() {
  if (validaFormulario() == true) {
    const elementosDoFormulario = valoresDosInputs(); // Pega os valores do formulário

    // Verifica se já existe algo no localStorage
    let itensDaLicitacao = verificaLocalStorage();

    // Aqui criamos um novo objeto 'licitacao'
    const licitacao = {
      operador: elementosDoFormulario.operador,
      localEstado: elementosDoFormulario.localEstado,
      localCidade: elementosDoFormulario.localCidade,
      objeto: elementosDoFormulario.objeto,
      dia: elementosDoFormulario.dia,
      horario: elementosDoFormulario.horario,
      empresa: elementosDoFormulario.empresa,
      statusLicitacao: elementosDoFormulario.statusLicitacao,
    };

    // Adiciona esse objeto 'licitacao' ao array 'itensDaLicitacao'
    itensDaLicitacao.push(licitacao);
    // Salva o array atualizado no localStorage
    localStorage.setItem("itensDaLicitacao", JSON.stringify(itensDaLicitacao));

    // Atualiza a exibição dos dados
    showData();

    // Limpa os campos do formulário
    limpaCamposFormulario();
  }
}

//--------------------------------------------------------------------
// Carrega todos os dados do local storage quando a página é carregada
window.onload = showData;

//--------------------------------------------------------------------
// Função para deletar dados
function deletaDados(index) {
  let itensDaLicitacao = verificaLocalStorage();

  itensDaLicitacao.splice(index, 1);
  localStorage.setItem("itensDaLicitacao", JSON.stringify(itensDaLicitacao));
  showData();
}

//--------------------------------------------------------------------
// Função para atualizar/editar dados no localStorage
function atualizarDados(index) {
  // O botão foi atualizarDados/Editar foi criado na função show data() mais acima
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  let itensDaLicitacao = verificaLocalStorage();

  // Preenche os campos com os dados a serem editados
  document.getElementById("operador").value = itensDaLicitacao[index].operador;
  document.getElementById("localEstado").value =
    itensDaLicitacao[index].localEstado;
  document.getElementById("localCidade").value =
    itensDaLicitacao[index].localCidade;
  document.getElementById("objeto").value = itensDaLicitacao[index].objeto;
  document.getElementById("dia").value = itensDaLicitacao[index].dia;
  document.getElementById("horario").value = itensDaLicitacao[index].horario;
  document.getElementById("empresa").value = itensDaLicitacao[index].empresa;
  document.getElementById("status").value =
    itensDaLicitacao[index].statusLicitacao; // Corrigido para 'status'

  // Atualiza os dados ao clicar no botão "update"
  document.querySelector("#update").onclick = function () {
    if (validaFormulario() == true) {
      itensDaLicitacao[index].operador =
        document.getElementById("operador").value;
      itensDaLicitacao[index].localEstado =
        document.getElementById("localEstado").value;
      itensDaLicitacao[index].localCidade =
        document.getElementById("localCidade").value;
      itensDaLicitacao[index].objeto = document.getElementById("objeto").value;
      itensDaLicitacao[index].dia = document.getElementById("dia").value;
      itensDaLicitacao[index].horario =
        document.getElementById("horario").value;
      itensDaLicitacao[index].empresa =
        document.getElementById("empresa").value;
      itensDaLicitacao[index].statusLicitacao =
        document.getElementById("status").value; // Corrigido para 'status'

      // Salva os dados atualizados no localStorage
      localStorage.setItem(
        "itensDaLicitacao",
        JSON.stringify(itensDaLicitacao)
      );
      showData();

      // Limpa o formulário após a edição
      limpaCamposFormulario();

      // Exibe novamente o botão "Adicionar"
      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }
  };
}

//--------------------------------------------------------------------
// Função para verificar se o local storage está vazio, função chamada várias vezes no código
function verificaLocalStorage() {
  let itensDaLicitacao;
  if (localStorage.getItem("itensDaLicitacao") == null) {
    itensDaLicitacao = [];
  } else {
    itensDaLicitacao = JSON.parse(localStorage.getItem("itensDaLicitacao"));
  }
  return itensDaLicitacao; // Retorna o array, vazio ou com os dados do localStorage
}

//--------------------------------------------------------------------
// Função para limpar os dados do formulário, função chamado duas vezes no código
function limpaCamposFormulario() {
  document.getElementById("operador").value = "";
  document.getElementById("localEstado").value = "";
  document.getElementById("localCidade").value = "";
  document.getElementById("objeto").value = "";
  document.getElementById("dia").value = "";
  document.getElementById("horario").value = "";
  document.getElementById("empresa").value = "";
  document.getElementById("status").value = "";
}
