const senhaCorreta = "edson";
let intervaloContagem;

window.onload = function() {
    carregarDadosSalvos();
};

function validarSenha(acao) {
    let senha = document.getElementById('senha-funcionario').value;

    if (senha === senhaCorreta) {
        if (acao === 'status') {
            mudarStatusPao();
            alert("Status do pão alterado com sucesso!");
        } else if (acao === 'fornada') {
            definirProximaFornada();
        }
    } else {
        alert("Senha incorreta. Acesso negado.");
    }
}

function mudarStatusPao() {
    let statusPao = document.getElementById('disponibilidade-pao');
    statusPao.textContent = statusPao.textContent === "Sim" ? "Não" : "Sim";
    localStorage.setItem('statusPao', statusPao.textContent);
}

function definirProximaFornada() {
    let minutos = parseInt(document.getElementById('minutos-fornada').value);

    if (minutos > 0) {
        clearInterval(intervaloContagem);

        let agora = new Date().getTime();
        let tempoFornada = minutos * 60 * 1000;
        let horaFornada = agora + tempoFornada;

        localStorage.setItem('horaFornada', horaFornada);
        localStorage.setItem('minutosFornada', minutos);

        iniciarContagemRegressiva(Math.floor(tempoFornada / 1000));
    } else {
        alert("Por favor, insira um valor válido de minutos.");
    }
}

function iniciarContagemRegressiva(tempoRestante) {
    intervaloContagem = setInterval(function() {
        if (tempoRestante <= 0) {
            clearInterval(intervaloContagem);
            document.getElementById('horario-fornada').textContent = "Fornada pronta!";
            alert("Nova fornada pronta!");
        } else {
            let minutosRestantes = Math.floor(tempoRestante / 60);
            let segundosRestantes = Math.floor(tempoRestante % 60);

            minutosRestantes = minutosRestantes.toString().padStart(2, '0');
            segundosRestantes = segundosRestantes.toString().padStart(2, '0');

            document.getElementById('horario-fornada').textContent = `${minutosRestantes}:${segundosRestantes}`;
            tempoRestante--;
        }
    }, 1000);
}

function carregarDadosSalvos() {
    let statusPao = localStorage.getItem('statusPao');
    let horaFornadaSalva = localStorage.getItem('horaFornada');

    if (statusPao) {
        document.getElementById('disponibilidade-pao').textContent = statusPao;
    }

    if (horaFornadaSalva) {
        let agora = new Date().getTime();
        let tempoRestante = Math.floor((horaFornadaSalva - agora) / 1000);

        if (tempoRestante > 0) {
            iniciarContagemRegressiva(tempoRestante);
        } else {
            document.getElementById('horario-fornada').textContent = "Fornada pronta!";
        }
    }
}
