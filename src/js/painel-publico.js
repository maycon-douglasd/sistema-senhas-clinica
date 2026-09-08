/* =====================================================
   SISTEMA
===================================================== */

carregarSistema();

/* =====================================================
   ÚLTIMAS CHAMADAS
===================================================== */

let ultimasChamadas = [];

function obterUltimasChamadas() {

    return sistema.historico
        .filter(senha => {

            // Não mostra em "Últimas Chamadas"
            // a senha que está atualmente em atendimento.
            if (
                senha.status === STATUS.EM_ATENDIMENTO_RECEPCAO ||
                senha.status === STATUS.EM_ATENDIMENTO_PROFISSIONAL
            ) {
                return false;
            }

            return (
                senha.timestampChamadaRecepcao !== null ||
                senha.timestampChamadaProfissional !== null
            );

        })
        .map(senha => {

            // Se já passou pelo profissional,
            // essa é a chamada que será exibida.
            if (senha.timestampChamadaProfissional !== null) {

                return {

                    senha: senha.senha,

                    paciente: senha.nomePaciente,

                    setor: senha.setor,

                    dataHora: senha.horarioChamadaProfissional,

                    timestamp: senha.timestampChamadaProfissional

                };

            }

            // Caso tenha sido chamada somente na recepção.
            return {

                senha: senha.senha,

                paciente: "",

                setor: "RECEPÇÃO",

                dataHora: senha.horarioChamadaRecepcao,

                timestamp: senha.timestampChamadaRecepcao

            };

        })
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5);
}

function atualizarUltimasChamadas() {

    const container = document.getElementById("lastCalls");

    container.innerHTML = "";

    ultimasChamadas = obterUltimasChamadas();

    ultimasChamadas
        .sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora))
        .slice(0, 5)
        .forEach(chamada => {

            const card = document.createElement("article");

            card.classList.add("lastCallCard");

            card.innerHTML = `
        
        <span class="lastCallPassword">
            ${chamada.senha}
        </span>

        <div class="lastCallInfo">

            <span class="lastCallPatient">
                ${chamada.paciente}
            </span>

            <span class="lastCallSector">
                ${chamada.setor}
            </span>

        </div>

    `;

            container.appendChild(card);

        });

}

/* =====================================================
   CHAMADA ATUAL
===================================================== */

let chamadaAtual = null;


function atualizarChamadaAtual() {

    const waitingState = document.getElementById("waitingState");

    const callState = document.getElementById("callState");

    const senhaAtual = document.getElementById("senhaAtual");

    const nomePaciente = document.getElementById("nomePaciente");

    const setorAtual = document.getElementById("setorAtual");

    if (!chamadaAtual) {

        waitingState.style.display = "flex";

        callState.style.display = "none";

        senhaAtual.textContent = "";

        nomePaciente.textContent = "";

        setorAtual.textContent = "";

    } else {
        waitingState.style.display = "none";
        callState.style.display = "flex";

        senhaAtual.textContent = chamadaAtual.senha;
        nomePaciente.textContent = chamadaAtual.paciente;
        setorAtual.textContent = chamadaAtual.setor;
    }

}
function registrarChamada(chamada) {

    chamada.dataHora = new Date().toISOString();

    const chamadaExiste = ultimasChamadas.some(
        item => item.senha === chamada.senha
    );

    chamadaAtual = chamada;

    if (!chamadaExiste) {

        ultimasChamadas.unshift(chamada);

    }

    atualizarChamadaAtual();

    atualizarUltimasChamadas();

}

function obterChamadaAtual() {

    const chamadas = sistema.historico.filter(senha => {

        return (
            senha.status === STATUS.EM_ATENDIMENTO_RECEPCAO ||
            senha.status === STATUS.EM_ATENDIMENTO_PROFISSIONAL
        );

    });

    if (chamadas.length === 0) {

        return null;

    }

    const chamada = chamadas.reduce((maisRecente, atual) => {

        const timestampAtual =
            atual.timestampChamadaProfissional ||
            atual.timestampChamadaRecepcao;

        const timestampMaisRecente =
            maisRecente.timestampChamadaProfissional ||
            maisRecente.timestampChamadaRecepcao;

        return timestampAtual > timestampMaisRecente
            ? atual
            : maisRecente;

    });

    // ==============================
    // CHAMADA DA RECEPÇÃO
    // ==============================

    if (
        chamada.status === STATUS.EM_ATENDIMENTO_RECEPCAO
    ) {

        return {

            senha: chamada.senha,

            paciente: "",

            setor: "RECEPÇÃO",

            dataHora: chamada.horarioChamadaRecepcao

        };

    }

    // ==============================
    // CHAMADA DO PROFISSIONAL
    // ==============================

    return {

        senha: chamada.senha,

        paciente: chamada.nomePaciente,

        setor: chamada.setor,

        dataHora: chamada.horarioChamadaProfissional,

    };

}

console.log(obterChamadaAtual());

atualizarUltimasChamadas();
atualizarChamadaAtual();

window.addEventListener("storage", () => {

    carregarSistema();

    chamadaAtual = obterChamadaAtual();

    atualizarChamadaAtual();

    atualizarUltimasChamadas();

});