let noteId = sessionStorage.getItem("editNoteId");
let userId = sessionStorage.getItem("UserId");
let editType = document.querySelector(`#editType`);
let editContent = document.querySelector(`#editContent`);
let editDate = document.querySelector(`#editDate`);
let editForm = document.querySelector(`#EditForm`);

window.onload = EditNote();

function EditNote(){
    fetch(`https://localhost:7171/api/ToDo/${noteId}`)
    .then((result) => {
        if(result.ok) {
            return result.json();
        } else {
            alert("Error");
        }
    })
    .then((json) => {
        if(json.id == noteId) {
            editType.disabled = false;
            editContent.disabled = false;
            editDate.disabled = false;

            editType.defaultValue = json.type;
            editContent.innerHTML = json.content;
            editDate.defaultValue = json.endDate.slice(0, 10);
        }
    });
}   

function SaveChanges() {
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        editedType = document.querySelector(`#editType`).value;
        editedContent = document.querySelector(`#editContent`).value;
        editedDate = document.querySelector(`#editDate`).value.slice(0, 10);
    
        if(editedType != '' && editedContent !='' && editedDate != '') {
            fetch(`https://localhost:7171/api/ToDo/${noteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    type: editedType,
                    content: editedContent,
                    endDate: editedDate,
                    id: noteId, 
                }),
            })
            .then ((result) => {
                if(result.ok) {
                    alert('Note edited');
                    location.href="Todo.html";

                } else {
                    alert("Error");
                }
            });
        }    
    })
};

function BackToMain(){
    location.href="Todo.html";
}