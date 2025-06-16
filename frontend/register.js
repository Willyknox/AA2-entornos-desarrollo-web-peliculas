document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nuevo = {
        primaryTitle: document.getElementById('primaryTitle').value,
        startYear: document.getElementById('startYear').value,
        titleType: document.getElementById('titleType').value,
        genres: document.getElementById('genres').value,
        runtimeMinutes: document.getElementById('runtimeMinutes').value,
        endYear: null 
    };
    axios.post('http://localhost:8082/api/movies', nuevo)
        .then(() => {
            document.getElementById('msg').innerHTML = '<div class="alert alert-success">¡Título registrado!</div>';
            setTimeout(() => window.location.href = 'index.html', 1200);
        })
        .catch(() => {
            document.getElementById('msg').innerHTML = '<div class="alert alert-danger">Error al registrar el título.</div>';
        });
});