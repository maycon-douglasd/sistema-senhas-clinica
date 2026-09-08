// ======================================
// CONFIGURAÇÕES
// ======================================

const SETOR_PROFISSIONAL = "Médico";

// ======================================
// REFERÊNCIAS DA INTERFACE
// ======================================

const nomeSetor = document.getElementById("nomeSetor");
const filaSetor = document.getElementById("filaSetor");

const nomePacienteAtual = document.getElementById("nomePacienteAtual");
const senhaAtual = document.getElementById("senhaAtual");

const btnChamar = document.getElementById("btnChamar");
const btnRechamar = document.getElementById("btnRechamar");
const btnFinalizar = document.getElementById("btnFinalizar");

const mensagemSistema = document.getElementById("mensagemSistema");

// ======================================
// INICIALIZAÇÃO
// ======================================

carregarSistema();

nomeSetor.textContent = SETOR_PROFISSIONAL;

atualizarFila();

atualizarAtendimentoAtual();

// ======================================
// EVENTOS
// ======================================

window.addEventListener("storage", () => {

    carregarSistema();

    atualizarFila();

    atualizarAtendimentoAtual();

});

btnChamar.addEventListener("click", chamarProximaSenha);

btnRechamar.addEventListener("click", rechamarSenha);

btnFinalizar.addEventListener("click", finalizarAtendimento);

// ======================================
// FUNÇÕES
// ======================================

function atualizarFila() {

    const fila = (sistema.historico || []).filter((senha) => {

        return (
            senha.status === STATUS.AGUARDANDO_PROFISSIONAL &&
            senha.setor === SETOR_PROFISSIONAL
        );

    });

    if (fila.length === 0) {

        filaSetor.innerHTML = `
            <p id="mensagemFila">
                Nenhuma senha aguardando.
            </p>
        `;

        return;
    }

    filaSetor.innerHTML = "";

    fila.forEach((senha) => {

        filaSetor.innerHTML += `
            <div class="item-fila">
                <p>${senha.nomePaciente}</p>

                <strong>${senha.senha}</strong>
            </div>
        `;

    });

}

function atualizarAtendimentoAtual() {

    const atendimentoAtual = (sistema.historico || []).find((senha) => {

        return (
            senha.status === STATUS.EM_ATENDIMENTO_PROFISSIONAL &&
            senha.setor === SETOR_PROFISSIONAL
        );

    });

    if (!atendimentoAtual) {

        nomePacienteAtual.textContent = "Aguardando chamada";
        senhaAtual.textContent = "---";

        return;

    }

    nomePacienteAtual.textContent = atendimentoAtual.nomePaciente;

    senhaAtual.textContent = atendimentoAtual.senha;

}

function chamarProximaSenha() {

    const atendimentoAtivo = (sistema.historico || []).find((senha) => {

        return (
            senha.status === STATUS.EM_ATENDIMENTO_PROFISSIONAL &&
            senha.setor === SETOR_PROFISSIONAL
        );

    });

    if (atendimentoAtivo) {

        mensagemSistema.textContent = "Finalize o atendimento atual antes de chamar outro paciente.";

        return;

    }

    const proximaSenha = (sistema.historico || []).find((senha) => {

        return (
            senha.status === STATUS.AGUARDANDO_PROFISSIONAL &&
            senha.setor === SETOR_PROFISSIONAL
        );

    });

    if (!proximaSenha) {

        mensagemSistema.textContent = "Não há pacientes aguardando atendimento.";

        return;

    }

    proximaSenha.status = STATUS.EM_ATENDIMENTO_PROFISSIONAL;

    proximaSenha.horarioChamadaProfissional = new Date().toLocaleTimeString("pt-BR");

    proximaSenha.timestampChamadaProfissional = Date.now();

    salvarSistema();

    atualizarFila();

    atualizarAtendimentoAtual();

    mensagemSistema.textContent = "";

}

function rechamarSenha() {

    const atendimentoAtual = (sistema.historico || []).find((senha) => {

        return (
            senha.status === STATUS.EM_ATENDIMENTO_PROFISSIONAL &&
            senha.setor === SETOR_PROFISSIONAL
        );

    });

    if (!atendimentoAtual) {

        mensagemSistema.textContent = "Não há paciente em atendimento para rechamar.";

        return;

    }

    atendimentoAtual.horarioRechamada = new Date().toLocaleTimeString("pt-BR");

    atendimentoAtual.timestampRechamada = Date.now();

    salvarSistema();

    atualizarAtendimentoAtual();

    mensagemSistema.textContent = "";

}

function finalizarAtendimento() {

    const atendimentoAtual = (sistema.historico || []).find((senha) => {

        return (
            senha.status === STATUS.EM_ATENDIMENTO_PROFISSIONAL &&
            senha.setor === SETOR_PROFISSIONAL
        );

    });

    if (!atendimentoAtual) {

        mensagemSistema.textContent = "Não há atendimento para finalizar.";

        return;

    }

    atendimentoAtual.status = STATUS.FINALIZADO;

    atendimentoAtual.horarioFimAtendimento = obterHorarioAtual();

    atendimentoAtual.timestampFimAtendimento = Date.now();

    salvarSistema();

    atualizarFila();

    atualizarAtendimentoAtual();

    mensagemSistema.textContent = "";

}