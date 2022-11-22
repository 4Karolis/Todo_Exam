let allNotes = document.querySelector('#existingTodos');

function goToNotes(){
    location.href = "Todo.html";
}

function GoToAdd() {
    location.href="AddNote.html";
}
let greeting = document.querySelector(`#hello`);
greeting.innerHTML = `Hello ${sessionStorage.getItem('UserName')}, (${sessionStorage.getItem('Email')})`;

fetch("https://localhost:7171/api/ToDo")
.then((result) => {
    if(result.ok) {
        return result.json();
    } else {
        alert("Error");
    }
})
.then((json) => {
    filteredItems = json.filter((x) => x.userId == sessionStorage.getItem('UserId'));

    filteredItems.map(function (filteredItems){
        let noteBox = document.createElement("div");
        let itemId = document.createElement("p", (id="itemId"));
        let itemType = document.createElement("p", (id="itemType"));
        let itemContent = document.createElement("p", (id="itemContent"));
        let itemEndDate = document.createElement("p", (id="itemDate"));
        let deleteButton = document.createElement("button", (id = "deleteNoteButton"));
        let editButton = document.createElement("button", (id = "editNoteButton"));
        noteBox.className = "noteBox";
        itemContent.style.overflow = "auto";
        itemContent.style.maxHeight = "200px";

        deleteButton.classList.add("button");
        editButton.classList.add("button");
        itemId.innerHTML = `<b>Id </b> <span style="color:#D6CBC9">${filteredItems.id}</span>`;
        itemType.innerHTML = `<b>Task </b><br> <span style="color:#D6CBC9">${filteredItems.type}</span>`;
        itemContent.innerHTML = `<b>Content </b><br> <span style="color:#D6CBC9">${filteredItems.content}<span>`;
        itemEndDate.innerHTML = `<b>End date </b><br> <span style="color:#D6CBC9">${filteredItems.endDate.slice(
            0, 
            10,
            localStorage.setItem("noteId", filteredItems.id) 
        )} </span>`;

        noteBox.appendChild(itemId);
        noteBox.appendChild(itemType);
        noteBox.appendChild(itemContent);
        noteBox.appendChild(itemEndDate);
        noteBox.appendChild(deleteButton);
        deleteButton.innerHTML = "Delete";
        noteBox.appendChild(editButton);
        editButton.innerHTML = "Edit";

        allNotes.append(noteBox);
        
        editButton.addEventListener('click', (event) => {
            event.preventDefault();
            let editId = filteredItems.id;
            sessionStorage.setItem(`editNoteId`, `${editId}`);
            location.href="editNote.html";
        });

        deleteButton.addEventListener('click', (event) => {
            event.preventDefault();
            let deleteId = filteredItems.id;
            fetch(`https://localhost:7171/api/ToDo/${deleteId}`, {
            method: "DELETE",           
        })
        .then ((result) => {
            if(result.ok) {
                alert(`Note #${deleteId} deleted!`)
                location.reload();
            } else {
                alert("Error");
            }
        });
        })
    });
});

document.querySelector(`#logoutBtn`).addEventListener('click', (event) =>{
    event.preventDefault();
    sessionStorage.clear();
    location.href = 'Index.html';
});
document.querySelector(`#addBtn`).addEventListener('click', (event) =>{
    event.preventDefault();  
    location.href="AddNote.html";
});

let addForm = document.querySelector(`#FormTodo`);
let addSubmitButton = document.querySelector(`#submitBtn`);

function AddTodoItem (){

    addForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    let userId = sessionStorage.getItem('UserId');
    let inType = event.target.inputType.value;
    let inContent = event.target.inputContent.value;
    let inEndDate = event.target.endDate.value;
    console.log(inType);
    console.log(inContent);
    console.log(inEndDate);
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
