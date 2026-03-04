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

        const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const confirmPasswordIcon = toggleConfirmPassword.querySelector('i');

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

        toggleConfirmPassword.addEventListener('click', () => {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            
            if (type === 'text') {
                confirmPasswordIcon.classList.remove('bi-eye');
                confirmPasswordIcon.classList.add('bi-eye-slash');
            } else {
                confirmPasswordIcon.classList.remove('bi-eye-slash');
                confirmPasswordIcon.classList.add('bi-eye');
            }
        });

        function validatePassword(password) {
            const minLength = 8;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /\d/.test(password);
            
            return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
        }

        const registerForm = document.getElementById('registerForm');

        registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(registerForm);
    
    fetch('../conexión/register.php', {
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
                confirmButtonColor: '#10b981'
            }).then(() => {
                window.location.href = '../index/login.html';
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