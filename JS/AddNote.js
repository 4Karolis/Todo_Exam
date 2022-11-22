let addForm = document.querySelector(`#AddNoteForm`);

function AddTodoItem (){

    addForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    let userId = sessionStorage.getItem('UserId');
    let inType = event.target.AddType.value;
    let inContent = event.target.AddContent.value;
    let inEndDate = event.target.AddDate.value;
   
    if(inType !=="" && inContent !=="" && inEndDate !==""){
        fetch('https://localhost:7171/api/ToDo', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'userId': userId,
                'type': inType,
                'content': inContent,
                'endDate': inEndDate
            })
        })
        .then(result =>{
            if(result.ok){
                alert('Note posted!')
            }
            return result.json();
        })
        .then(res =>{
            if(res.error){
                alert(res.error);
                return;
            }
            location.href = "ToDo.html";
            return res;
        })
    }
})};

function BackToMain(){
    location.href="Todo.html";
}