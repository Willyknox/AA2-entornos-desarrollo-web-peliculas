//import axios from 'axios';there is only one import axios needed, what is the global object?
const el = function(elementId) {
    return document.getElementById(elementId);
};
const td = function(text) {
    return '<td>' + text + '</td>';
};
const actionButtons = function(id) {
    return `<td>
        <button class="btn btn-warning btn-sm" onclick="editTitle('${id}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTitle('${id}')">Delete</button>
    </td>`;
};
// Anonymous function that gathers info from the GET request and displays a list on the front end.
window.titlesRecieved = function() {
    axios.get('http://localhost:8082/api/movies').then((response)=>{
        const titleList = response.data;
        const titleTable = el('tableBody');
        titleList.forEach(function(contentTitle) {
            const row = document.createElement('tr');
            row.id = 'contentTitle' + contentTitle.id;
            row.innerHTML = td(contentTitle.primaryTitle) + td(contentTitle.year) + td(contentTitle.titleType) + td(contentTitle.genres) + td(contentTitle.runtimeMinutes) + actionButtons(contentTitle.id);
            titleTable.append(row);
            console.log(contentTitle);
        });
    });
};
window.deleteTitle = function(primaryTitle) {
    if (confirm("Are you sure you want to delete this title?")) axios.delete('http://localhost:8082/api/movies/' + primaryTitle).then(()=>{
        window.titlesRecieved(); // Refresh table we recall the function.
    }).catch((err)=>alert("Error deleting: " + err));
};
window.editTitle = function(id) {
    const row = document.getElementById('contentTitle' + id);
    const cells = row.getElementsByTagName('td');
    // Save the current values
    const current = {
        primaryTitle: cells[0].innerText,
        year: cells[1].innerText,
        titleType: cells[2].innerText,
        genres: cells[3].innerText,
        runtimeMinutes: cells[4].innerText
    };
    //Here the values are replaced by inputs
    row.innerHTML = `<td><input type="text" value="${current.primaryTitle}" id="edit-title-${id}" class="form-control form-control-sm"></td>` + `<td><input type="number" value="${current.year}" id="edit-year-${id}" class="form-control form-control-sm"></td>` + `<td><input type="text" value="${current.titleType}" id="edit-type-${id}" class="form-control form-control-sm"></td>` + `<td><input type="text" value="${current.genres}" id="edit-genres-${id}" class="form-control form-control-sm"></td>` + `<td><input type="number" value="${current.runtimeMinutes}" id="edit-runtime-${id}" class="form-control form-control-sm"></td>` + `<td>
            <button class="btn btn-success btn-sm" onclick="saveTitle('${id}')">Guardar</button>
            <button class="btn btn-secondary btn-sm" onclick="window.titlesRecieved()">Cancelar</button>
        </td>`;
};
window.saveTitle = function(id) {
    // Input the values that you desired
    const updated = {
        primaryTitle: document.getElementById(`edit-title-${id}`).value,
        year: document.getElementById(`edit-year-${id}`).value,
        titleType: document.getElementById(`edit-type-${id}`).value,
        genres: document.getElementById(`edit-genres-${id}`).value,
        runtimeMinutes: document.getElementById(`edit-runtime-${id}`).value
    };
    axios.put('http://localhost:8082/api/movies/' + id, updated).then(()=>{
        window.titlesRecieved(); // Refresca la tabla
    }).catch((err)=>alert("Error al guardar: " + err));
};
window.titlesRecieved();

//# sourceMappingURL=frontend.c36f364e.js.map
