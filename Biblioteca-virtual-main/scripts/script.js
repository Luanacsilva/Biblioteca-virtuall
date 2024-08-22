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