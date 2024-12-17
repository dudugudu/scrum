//redireciona para a tela de cadastro de usuario
function abrirCadastro() {
    window.location.href = "cadastro.html";
}

//volta para a tela de login
function voltarLogin() {
    window.location.href = "index.html";
}

//simula o login e redireciona para a pagina de prospects
function realizarLogin(event) {
    event.preventDefault(); // evita o envio padrao do formulario
    alert("Login efetuado com sucesso! (backend)");
    window.location.href = "prospects.html"; // redireciona para a página de prospects
}

//alerta para a tela de prospects
function cadastrarProspect() {
    alert("funcao de cadastro de prospect backend.");
}

//simula o cadastro de um usuario
function cadastrarUsuario(event) {
    event.preventDefault();
    alert("Usuário cadastrado com sucesso! (backend)");
    window.location.href = "index.html";
}

);
