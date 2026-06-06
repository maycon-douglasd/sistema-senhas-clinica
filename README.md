# 🏥 Sistema de Senhas para Clínica / UBS

Sistema web desenvolvido para gerenciamento de filas de atendimento em Clínicas e Unidades Básicas de Saúde (UBS), permitindo a emissão de senhas normais e preferenciais por setor de atendimento.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido com o objetivo de simular um sistema real de gerenciamento de filas utilizado em unidades de saúde.

O sistema permite a emissão de senhas para diferentes setores, controle de senhas preferenciais, impressão de comprovantes e persistência dos dados mesmo após o fechamento ou atualização da página.

## 🚀 Funcionalidades

* ✅ Emissão de senhas normais
* ✅ Emissão de senhas preferenciais
* ✅ Controle por setor de atendimento
* ✅ Impressão de comprovantes
* ✅ Persistência de dados com Local Storage
* ✅ Continuidade da numeração após atualização da página
* ✅ Reinicialização automática dos contadores diariamente
* ✅ Interface responsiva para desktop, tablet e smartphone

### Setores Disponíveis

* 🦷 Dentista (DEN)
* 👩‍⚕️ Enfermagem (ENF)
* 💊 Farmácia (FAR)
* 🩺 Médico (MED)
* 💉 Vacinação (VAC)

## 📸 Demonstração

### Tela Inicial

![Tela Inicial](images/preview)

### Seleção de Senha

![Seleção de Senha](images/tela-setor.png)

### Comprovante Gerado

![Comprovante](images/comprovante.png)

### Versão Mobile

![Versão Mobile](images/mobile.png)

> Substitua os nomes das imagens pelos arquivos reais que você adicionar na pasta `images`.

## 🛠️ Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Local Storage
* Git
* GitHub

## 📂 Estrutura do Projeto

```text
src/
├── css/
│   ├── style.css
│   ├── responsivo.css
│   └── print.css
│
├── js/
│   └── index.js
│
└── img/
```

## 💡 Conceitos Aplicados

Durante o desenvolvimento deste projeto foram praticados conceitos importantes de desenvolvimento Front-end:

* Manipulação do DOM
* Organização de funções JavaScript
* Objetos e propriedades
* Persistência de dados
* JSON.stringify()
* JSON.parse()
* Local Storage
* Responsividade
* Controle de estado da aplicação
* Impressão via navegador

## 🔄 Próximas Implementações

* 📊 Dashboard administrativo
* 📜 Histórico de senhas emitidas
* 🔐 Área administrativa protegida por senha
* 📢 Painel de chamada de senhas
* 🔊 Som de chamada
* 🌐 Backend com Node.js
* 🗄️ Banco de dados

## 👨‍💻 Autor

Maycon Douglas

📧 [maycon_douglasds@hotmail.com](mailto:maycon_douglasds@hotmail.com)

💼 GitHub: https://github.com/maycon-douglasd

🚀 Desenvolvedor Front-end em transição de carreira, focado em JavaScript, React e Node.js.
