document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search_form");
    const searchInput = document.getElementById("search_input");

    function validateSearch(input) {
        if (!input || input.trim() === "") {
            throw new Error("O campo de pesquisa está vazio. Por favor, insira um termo.");
        }
        if (input.length < 3) {
            throw new Error("O termo de pesquisa é muito curto. Insira pelo menos 3 caracteres.");
        }
        return input.trim();
    }

    function showSuccessMessage(input) {
        alert(`Você pesquisou por: ${input}. Infelizmente, a busca está temporariamente desativada.`);
    }

    function showErrorMessage(error) {
        alert(`Erro: ${error.message}`);
    }

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        try {
            // Validação do input de pesquisa
            const validatedInput = validateSearch(searchInput.value);
            // Exibir mensagem de sucesso
            showSuccessMessage(validatedInput);
        } catch (error) {
            // Exibir mensagem de erro caso a validação falhe
            showErrorMessage(error);
        }
    });
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/livrosdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//ROTA DE API
const livrosRouter = require('./routes/livros');
app.use('/api', livrosRouter);
