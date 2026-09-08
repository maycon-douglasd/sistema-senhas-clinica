const senhaAtual = document.getElementById("senhaAtual");

const mensagemSistema = document.getElementById("mensagemSistema");

// ======================================
// INTERFACE
// ======================================

function atualizarPainelRecepcao() {

    let encontrouSenha = false;

    for (
        let i = sistema.historico.
            length - 1;

        i >= 0;

        i--

    ) {
        if
            (sistema.historico[i].status === STATUS.EM_ATENDIMENTO_RECEPCAO) {

            encontrouSenha = true;

            senhaAtual.innerText = sistema.historico[i].senha;

            break;
        }

    }

    if (!encontrouSenha) {
        senhaAtual.innerText = "Nenhuma senha em atendimento.";
    }

}

// ======================================
// REGRAS DE NEGÓCIO
// ======================================

function chamarProximaSenha() {

    carregarSistema();

    let encontrouSenha = false;

    let existeSenhaEmAtendimento = false;

    // Verifica se já existe alguma senha em atendimento na recepção.
    for (let i = 0; i < sistema.historico.length; i++) {
        if (sistema.historico[i].status === STATUS.EM_ATENDIMENTO_RECEPCAO) {
            existeSenhaEmAtendimento = true;

            break;
        }
    }

    // Se já existe uma senha em atendimento, não permite chamar outra.
    if (existeSenhaEmAtendimento) {
        mensagemSistema.innerText = "Finalize o cadastro atual antes de chamar outra senha.";

        return;
    }

    // Procura a próxima senha aguardando recepção.

    for (
        let i = 0;

        i < sistema.historico.length;

        i++) {

        if (
            sistema.historico[i].status === STATUS.AGUARDANDO_RECEPCAO) {

            sistema.historico[i].status = STATUS.EM_ATENDIMENTO_RECEPCAO;

            sistema.historico[i].horarioChamadaRecepcao = obterHorarioAtual();

            sistema.historico[i].timestampChamadaRecepcao = Date.now();

            encontrouSenha = true;

            salvarSistema();

            atualizarPainelRecepcao();

            mensagemSistema.innerText = "";

            break;
        }
    }

    if (!encontrouSenha) {

        mensagemSistema.innerText = "Nenhuma senha aguardando na recepção.";
    }
}

carregarSistema();

verificarMudancaDeData();

atualizarPainelRecepcao();

window.addEventListener("storage", function () {

    carregarSistema();

    atualizarPainelRecepcao();
});

function finalizarCadastroRecepcao() {
    carregarSistema();

    // ==========================
    // Captura o nome digitado pela recepção.
    // ==========================

    const campoNome = document.getElementById("nomePaciente");

    const nomePaciente = campoNome.value.trim();

    // ==========================
    // Validação do nome.
    // ==========================

    if (nomePaciente.length < 3) {

        mensagemsistema.innerText = "Digite o nome do paciente.";

        campoNome.focus();

        return;
    }

    let encontrouSenha = false;

    for (let i = 0; i < sistema.historico.length; i++) {

        if (
            sistema.historico[i].status === STATUS.EM_ATENDIMENTO_RECEPCAO
        ) {
            encontrouSenha = true;

            // ==========================
            // Salva o nome do paciente.
            // ==========================
            sistema.historico[i].nomePaciente = nomePaciente;

            sistema.historico[i].horarioFimRecepcao = obterHorarioAtual();

            sistema.historico[i].timestampFimRecepcao = Date.now();

            sistema.historico[i].status = STATUS.AGUARDANDO_PROFISSIONAL;

            salvarSistema();

            campoNome.value = "";

            campoNome.focus();

            atualizarPainelRecepcao();

            mensagemSistema.innerText = "";

            break;

        }

    }

    if (!encontrouSenha) {
        mensagemSistema.innerText = "Nenhuma senha em atendimento.";
    }
}