document.querySelector(`#hpLogin`).addEventListener('click', (event) =>{
    event.preventDefault();
    location.href = "Index.html";
});

document.querySelector(`#loginForm`).addEventListener('submit', (event) =>{
    event.preventDefault();    

    const loginName = event.target.logName.value;
    const loginPSw = event.target.logPsw.value;

    if(loginName !=="" && loginPSw !==""){
        fetch(`https://localhost:7171/api/Auth?username=${loginName}&password=${loginPSw}`)
        .then((result) => {
            if(result.ok){
                return result.json();
            } else {
                document.querySelector(`#loginError`).hidden = false;
                document.querySelector(`#loginError`).innerHTML = "User doesn't exist or password is incorrect!";                
            }
        })
        .then((res) => {
            sessionStorage.setItem('UserId', res.id);
            sessionStorage.setItem('UserName', res.userName);
            sessionStorage.setItem('Email', res.email);

            location.href = "Todo.html";
        });
    } else {
        document.querySelector(`#loginError`).hidden = false;
        document.querySelector(`#loginError`).innerHTML = "User doesn't exist or password is incorrect!";
    }
});