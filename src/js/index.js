let contadores = {
    D: 1,
    E: 1,
    F: 1,
    M: 1,
    V: 1
};

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
    let numero = contadores[tipo];

    let senha =
        tipo +
        numero.toString().padStart(3, "0");

    contadores[tipo]++;

    // Exibir
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