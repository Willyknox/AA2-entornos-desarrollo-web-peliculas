//import axios from 'axios';
function el(id) {
    return document.getElementById(id);
}

function notifyOk(msg) {
    el('msg').innerHTML = `<div class="alert alert-success">${msg}</div>`;
}
function notifyError(msg) {
    el('msg').innerHTML = `<div class="alert alert-danger">${msg}</div>`;
}

window.addMovie = function() {
    const primaryTitle = el('primaryTitle').value;
    const year = el('year').value;
    const titleType = el('titleType').value;
    const genres = el('genres').value;
    const runtimeMinutes = el('runtimeMinutes').value;

    // Validación básica
    if (primaryTitle === '') {
        notifyError('El título es obligatorio');
        return;
    }
    if (year === '' || isNaN(year)) {
        notifyError('El año de inicio es obligatorio y debe ser numérico');
        return;
    }

    axios.post('http://localhost:8082/api/movies', {
        primaryTitle,
        year,
        titleType,
        genres,
        runtimeMinutes,
    })
    .then(() => {
        notifyOk('¡Título registrado!');
        setTimeout(() => window.location.href = 'index.html', 1200);
    })
    .catch(() => {
        notifyError('Error al registrar el título.');
    });

    // Limpiar formulario
    el('primaryTitle').value = '';
    el('year').value = '';
    el('titleType').value = '';
    el('genres').value = '';
    el('runtimeMinutes').value = '';
};

el('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    window.addMovie();
});
