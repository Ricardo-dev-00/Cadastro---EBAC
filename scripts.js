const toggleButton = document.getElementById("toggleTheme");

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
});