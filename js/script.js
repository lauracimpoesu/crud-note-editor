document.addEventListener('DOMContentLoaded', function(){
    
    document.querySelector('#myInput button')
        .addEventListener('click', addPost);
    document.querySelector('#mySearch button')
        .addEventListener('click', findFile);
    document.querySelector('#btnNew')
        .addEventListener('click', emptyFields);
    printFiles(filesList);
})

function MyEditor(title, textarea){
    this.title = title;
    this.textarea = textarea;
}

let filesList = [];

emptyFields = () => {
    let title = document.querySelector('#myInput input[name=title]').style.display = '';
    let textarea = document.querySelector('textarea').style.display = ''; 
    let obj = new MyEditor(title, textarea);
    filesList.push(obj);

    document.querySelector('#myInput input[name=title]').value = '';
    document.querySelector('textarea').value = '';

}

let addPost = () => {
    let title = document.querySelector('#myInput input[name=title]').value;
    let textarea = document.querySelector('textarea').style.display = '';
    
    let obj = new MyEditor(title, textarea);
    filesList.push(obj);

    document.querySelector('#myInput input[name=title]').value = '';
    document.querySelector('textarea').value = '';

    printFiles(filesList);
    
}

let printFiles = (myList) => {
    let tbody = document.querySelector('.table tbody');
    tbody.innerHTML = ``;
    myList.forEach(editor => {
        ({title, textarea} = editor)
        tbody.innerHTML += `
            <tr>
                <td>${myList.indexOf(editor)+1}</td>
                <td>${title}</td>
                <td>${textarea}</td>
                <td>
                    <button id="btnRemove" type="button" class="btn btn-sm" onclick="removeFile(${myList.indexOf(editor)})">Remove</button>
                    <button id="btnChange" type="button" class="btn btn-sm" onclick="modifyFile(${myList.indexOf(editor)})">Change</button>
                </td>
            </tr>
        `
    })
}

let removeFile = (index) => {
    filesList.splice(index, 1);
    printFiles(filesList);
}

let findFile = () => {
    let search = document.querySelector('#mySearch input[name=search]').value;


    let filteredFilesList = filesList.filter(editor => 
        editor.title === search || 
        editor.textarea === search)

    if(search){  
        document.querySelector('#mySearch input[name=search]').value = '';
        printFiles(filteredFilesList);
    } else {
        printFiles(filesList);
    }
}

let modifyFile = (index) => {
    let editor = filesList[index];
    document.querySelector('#myInput input[name=title]').value = editor.title;
    document.querySelector('textarea').value = editor  .textarea;
    
    document.querySelector('#addButton').style.display = 'none';
    document.querySelector('#btnModifica').style.display = 'block';

    document.querySelector('#btnModifica').addEventListener('click', saveChanges);
}

let saveChanges = () => {
    let index = document.querySelector('#myInput input[name=index]').value;
    let obj = new MyEditor(
            document.querySelector('#myInput input[name=title]').value, 
            document.querySelector('textarea').value);
    
            filesList.splice(index, 1, obj);

    document.querySelector('#myInput input[name=title]').value = '';
    document.querySelector('textarea').value = '';

    document.querySelector('#addButton').style.display = 'block';
    document.querySelector('#btnModifica').style.display = 'none';

    printFiles(filesList);
}
































////////////////////////////////////////////////////////////////////////////////////////////////////////////