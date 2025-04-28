const toggleButton = document.getElementById("toggleTheme");

// Alternância de tema
toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    // Alterna o caractere do botão
    if (document.body.classList.contains("dark-theme")) {
        toggleButton.textContent = "☀️"; // Tema claro
    } else {
        toggleButton.textContent = "🌙"; // Tema escuro
    }

    // Salva a preferência do tema no armazenamento local
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
});

document.addEventListener("DOMContentLoaded", function () {
    // Verifica a preferência do tema no armazenamento local
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        toggleButton.textContent = "☀️"; // Tema claro
    } else {
        document.body.classList.remove("dark-theme");
        toggleButton.textContent = "🌙"; // Tema escuro
    }

    // Recupera os dados do formulário do localStorage
    const campos = ["cep", "Logradouro", "Bairro", "cidade", "Estado", "Número"];
    campos.forEach(campo => {
        const valor = localStorage.getItem(campo);
        if (valor) {
            document.getElementById(campo).value = valor; // Preenche o campo com o valor salvo
        }
    });
});

// Salvar os dados do formulário no localStorage
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", (evento) => {
        const elemento = evento.target;
        localStorage.setItem(elemento.id, elemento.value); // Salva o valor no localStorage usando o ID do campo como chave
    });
});

// Ouvir o evento de quando o usuário sair do input de CEP
document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;

    // Verifica se o CEP informado é válido
    if (!(cepInformado.length === 8)) {
        alert("CEP inválido. Certifique-se de que contém 8 dígitos.");
        return;
    }

    // Faz a requisição para a API
    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            // Processamento da Página
            if (!data.erro) {
                document.getElementById('Logradouro').value = data.logradouro;
                document.getElementById('Bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('Estado').value = data.uf;

                // Salva os dados preenchidos automaticamente no localStorage
                localStorage.setItem("Logradouro", data.logradouro);
                localStorage.setItem("Bairro", data.bairro);
                localStorage.setItem("cidade", data.localidade);
                localStorage.setItem("Estado", data.uf);
            } else {
                alert("CEP não encontrado.");
            }
        })
        .catch(error => console.error("Erro ao buscar o CEP: ", error));
});