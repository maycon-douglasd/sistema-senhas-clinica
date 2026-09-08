// ======================
// CONFIGURAÇÕES
// ======================

// Guarda qual setor foi escolhido pelo usuário.
let setorSelecionado = "";

// ======================
// INTERFACE
// ======================

// Salva o setor escolhido pelo usuário
// e abre a tela de escolha do tipo de senha.
function selecionarSetor(codigo, nome) {

    // Guarda o código do setor selecionado.
    setorSelecionado = codigo;

    // Mostra o nome do setor na tela.
    document.getElementById("nomeSetor").innerText = nome;

    // Esconde tela de setores.
    document.getElementById("telaSetores").style.display = "none";

    document.getElementById("telaTipoSenha").style.display = "flex";
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

// ======================
// REGRAS DE NEGÓCIO
// ======================

// Gera uma nova senha para o setor informado.
function gerarSenha(tipo) {
    carregarSistema();

    const dataGeracao = obterDataAtual();

    const horarioGeracao = obterHorarioAtual();

    // Obtém o próximo número disponível do setor.
    let numero = sistema.contadores[tipo];

    // Gera a senha final.

    let senha =
        tipo +
        numero.toString().padStart(3, "0");

    // Cria objeto completo da senha.
    // AQUI entra o histórico
    const novaSenha = {
        // Identificação
        senha,
        nomePaciente: null,
        tipo,
        setor: setores[tipo],

        //Geração da senha
        dataGeracao,
        horarioGeracao,
        timestampGeracao: Date.now(),

        // Situação atual
        status: STATUS.AGUARDANDO_RECEPCAO,

        // Recepção
        horarioChamadaRecepcao: null,
        timestampChamadaRecepcao: null,

        horarioFimRecepcao: null,
        timestampFimRecepcao: null,

        // Profissional
        horarioChamadaProfissional: null,
        timestampChamadaProfissional: null,

        horarioFimAtendimento: null,
        timestampFimAtendimento: null,
    };

    sistema.historico.push(novaSenha);

    // Atualizar contador
    sistema.contadores[tipo]++;
    salvarSistema();
    exibirHistorico();


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

        <p>Data: ${dataGeracao}</p>

        <p>Horário: ${horarioGeracao}</p>

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

    Data: ${dataGeracao}

    Horário: ${horarioGeracao}
`;

    console.log(comprovante);
}

function senhaNormal() {
    gerarSenha(setorSelecionado);
}

function senhaPreferencial() {
    gerarSenha(setorSelecionado + "P");
}

// ======================
// EXIBIÇÃO
// ======================

// Exibe todas as senhas armazenadas no histórico.
function exibirHistorico() {
    // Variável que irá montar o HTML.
    let lista = "";

    // Percorre todo o histórico.
    for (
        let i = 0;
        i < sistema.historico.length;
        i++
    ) {
        // Acrescenta cada senha encontrada.
        lista += sistema.historico[i].senha + "<br>";
    }
    // Exibe o histórico na tela.
    document.getElementById("historico").innerHTML = lista;
}

// ======================
// INICIALIZAÇÃO
// ======================

carregarSistema();

exibirHistorico();