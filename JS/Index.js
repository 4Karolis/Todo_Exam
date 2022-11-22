function goToLogin(){
    window.location.href = "l";
};

function LoadLoginPage(){
    location.href = "Login.html";
};

document.querySelector(`#goToLogin`).addEventListener('click', (event) =>{
    window.location.href = "Login.html";
});

document.querySelector(`#goToRegister`).addEventListener('click', (event) =>{
    event.preventDefault();
    location.href = "Register.html";
});