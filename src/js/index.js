const contadoresPadrao = {
    DEN: 1,
    DENP: 1,
    ENF: 1,
    ENFP: 1,
    FAR: 1,
    FARP: 1,
    MED: 1,
    MEDP: 1,
    VAC: 1,
    VACP: 1
};

let sistema;

let setorSelecionado = "";

function carregarSistema() {
    const sistemaSalvo = localStorage.getItem("sistema");

    if (sistemaSalvo !== null) {
        sistema = JSON.parse(sistemaSalvo);
    } else {
        sistema = {
            data: new Date().toISOString().split("T")[0],
            contadores: { ...contadoresPadrao }
        };

        salvarSistema();
    }
}
function salvarSistema() {
    const sistemaString = JSON.stringify(sistema);
    localStorage.setItem("sistema", sistemaString);
}

function verificarMudancaDeData() {
    const dataAtual = new Date().toISOString().split("T")[0];

    if (sistema.data !== dataAtual) {
        sistema.data = dataAtual;
        sistema.contadores = { ...contadoresPadrao };

        salvarSistema();
    }
}

function selecionarSetor(codigo, nome) {

    setorSelecionado = codigo;

    document.getElementById("nomeSetor").innerText = nome;

    document.getElementById("telaSetores").style.display = "none";

    document.getElementById("telaTipoSenha").style.display = "flex";
}

function gerarSenha(tipo) {

    // Data e hora atual
    const agora = new Date();

    const dia = agora.getDate().toString().padStart(2, "0");
    const mes = (agora.getMonth() + 1).toString().padStart(2, "0");
    const ano = agora.getFullYear();

    const hora = agora.getHours().toString().padStart(2, "0");
    const minuto = agora.getMinutes().toString().padStart(2, "0");
    const segundo = agora.getSeconds().toString().padStart(2, "0");

    const data = `${dia}/${mes}/${ano}`;
    const horario = `${hora}:${minuto}:${segundo}`;

    // Gerar senha
    let numero = sistema.contadores[tipo];

    let senha =
        tipo +
        numero.toString().padStart(3, "0");

    sistema.contadores[tipo]++;
    salvarSistema();

    // Esconder botões de geração
    document.getElementById("btnNormal").style.display = "none";
    document.getElementById("btnPreferencial").style.display = "none";

    // Exibir comprovante
    document.getElementById("senha").innerHTML =
        `
    <div class="senha-gerada">

        <h3>🏥 UBS MUNICIPAL</h3>

        <p class="titulo-comprovante">
            COMPROVANTE DE ATENDIMENTO
        </p>

        <h2>${senha}</h2>

        <p>Data: ${data}</p>

        <p>Horário: ${horario}</p>

        <hr>

        <p>Aguarde ser chamado</p>

    </div>

    <div class="acoes-comprovante">

    <button class="btn-imprimir" onclick="imprimirComprovante()">
        Imprimir Comprovante
    </button>

    <button class="btn-voltar" onclick="voltar()">
        Voltar
    </button>

</div>
    `;

    const comprovante = `
    UBS - Unidade Básica de Saúde

    Senha: ${senha}

    Data: ${data}

    Horário: ${horario}
    `;

    console.log(comprovante);
}

function senhaNormal() {
    gerarSenha(setorSelecionado);
}

function senhaPreferencial() {
    gerarSenha(setorSelecionado + "P");
}

function voltar() {

    // limpa comprovante
    document.getElementById("senha").innerHTML = "";

    // mostra tela de setores (profissionais)
    document.getElementById("telaSetores").style.display = "";

    // esconde tela de tipo de senha
    document.getElementById("telaTipoSenha").style.display = "none";

    // reseta botões (caso precise reutilizar)
    document.getElementById("btnNormal").style.display = "block";

    document.getElementById("btnPreferencial").style.display = "block";

    // opcional: resetar setor selecionado
    setorSelecionado = "";
}

function imprimirComprovante() {
    window.print();
}

carregarSistema();
verificarMudancaDeData();