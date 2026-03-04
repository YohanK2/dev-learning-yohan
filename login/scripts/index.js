        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        const icon = darkModeToggle.querySelector('i');

        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            icon.classList.remove('bi-moon');
            icon.classList.add('bi-sun');
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('bi-moon');
                icon.classList.add('bi-sun');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.classList.remove('bi-sun');
                icon.classList.add('bi-moon');
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        const passwordIcon = togglePassword.querySelector('i');

        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            if (type === 'text') {
                passwordIcon.classList.remove('bi-eye');
                passwordIcon.classList.add('bi-eye-slash');
            } else {
                passwordIcon.classList.remove('bi-eye-slash');
                passwordIcon.classList.add('bi-eye');
            }
        });

        const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos',
            confirmButtonColor: '#3b82f6'
        });
        return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    fetch('../conexión/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: data.message,
                confirmButtonColor: '#10b981',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = '../index/como.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
                confirmButtonColor: '#ef4444'
            });
        }
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor',
            confirmButtonColor: '#ef4444'
        });
    });
});