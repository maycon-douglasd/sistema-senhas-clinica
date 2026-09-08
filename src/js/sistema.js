// =====================
// CONFIGURAÇÕES
// =====================

// contadoresPadrao

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

const setores = {
    DEN: "Dentista",
    DENP: "Dentista",
    ENF: "Enfermagem",
    ENFP: "Enfermagem",
    FAR: "Farmácia",
    FARP: "Farmácia",
    MED: "Médico",
    MEDP: "Médico",
    VAC: "Vacina",
    VACP: "Vacina"
};
// Objeto principal do sistema.
let sistema;

// ======================================
// CARREGAMENTO DO SISTEMA
// ======================================
function carregarSistema() {

    const sistemaSalvo = localStorage.getItem("sistema");

    if (sistemaSalvo !== null) {
        sistema = JSON.parse(sistemaSalvo);

        if (sistema.historico === undefined) {
            sistema.historico = [];
        }
    } else {
        criarSistemaInicial();
    }

    // Verifica se o dia mudou
    verificarMudancaDeData();
}

// ======================================
// CRIAÇÃO DO SISTEMA
// ======================================
function criarSistemaInicial() {

    sistema = {
        data: obterDataSistema(),

        contadores: { ...contadoresPadrao },

        historico: []
    };
    salvarSistema();
}

// ======================================
// PERSISTÊNCIA
// ======================================
function salvarSistema() {
    localStorage.setItem("sistema", JSON.stringify(sistema));
}

// ======================================
// REGRAS DE NEGÓCIO
// ======================================

function verificarMudancaDeData() {

    const dataAtual = obterDataSistema();

    if (sistema.data !== dataAtual) {

        sistema.data = dataAtual;

        sistema.contadores = {
            ...contadoresPadrao
        };

        sistema.historico = [];

        salvarSistema();
    }
}

// ======================================
// UTILITÁRIOS
// ======================================

function obterDataSistema() {

    const agora = new Date();

    const ano = agora.getFullYear();

    const mes = String(agora.getMonth() + 1).padStart(2, "0");

    const dia = String(agora.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

function obterDataAtual() {
    const agora = new Date();

    const mes = (agora.getMonth() + 1)
        .toString()
        .padStart(2, "0");

    const dia = agora.getDate()
        .toString()
        .padStart(2, "0");

    const ano = agora.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

function obterHorarioAtual() {

    const agora = new Date();

    const hora = agora.getHours()
        .toString()
        .padStart(2, "0");

    const minuto = agora.getMinutes()
        .toString()
        .padStart(2, "0");

    const segundo = agora.getSeconds()
        .toString()
        .padStart(2, "0");

    return `${hora}:${minuto}:${segundo}`;

}