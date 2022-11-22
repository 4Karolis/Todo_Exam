document.querySelector(`#hpReg`).addEventListener('click', (event) =>{
    event.preventDefault();
    location.href = "Index.html";
});

let regForm = document.querySelector(`#regForm`).addEventListener('submit', (event) =>{
    event.preventDefault();
    const regName = document.querySelector(`#regName`);
    const regPsw = document.querySelector(`#regPsw`);
    const regEmail = document.querySelector(`#regEmail`);
    if(regName != "" && regPsw != "" && regEmail != ""){
        fetch('https://localhost:7171/api/Auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: event.target.regName.value,
                password: event.target.regPsw.value,
                email: event.target.regEmail.value,
            }),
        }).then((result) =>{
            if(result.ok){
                alert('Registration successful!');
                location.href = "Index.html";                
            } else {
                event.preventDefault();
                alert('Could not register account, try again');
            }
        });
    }
});