      function toggleTheme() {
            const html = document.documentElement;
            const isDark = html.classList.contains('dark');
            
            if (isDark) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
            
            const desktopToggle = document.getElementById('themeToggle');
            const mobileToggle = document.getElementById('themeToggleMobile');
            if (desktopToggle && mobileToggle) {
                desktopToggle.checked = !isDark;
                mobileToggle.checked = !isDark;
            }
        }
        
        // Inicializar tema basado en preferencias del usuario
        function initializeTheme() {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.documentElement.classList.add('dark');
                document.getElementById('themeToggle').checked = true;
                document.getElementById('themeToggleMobile').checked = true;
            }
        }

        // Función para verificar el estado de la sesión
        async function checkSession() {
            try {
                const response = await fetch('check_session.php');
                const data = await response.json();
                
                const userSection = document.getElementById('userSection');
                const loginSection = document.getElementById('loginSection');
                const mobileUserSection = document.getElementById('mobileUserSection');
                const mobileLoginSection = document.getElementById('mobileLoginSection');
                const userName = document.getElementById('userName');
                const mobileUserName = document.getElementById('mobileUserName');
                
                if (data.logged_in) {
                    // Usuario logueado
                    userSection.classList.remove('hidden');
                    loginSection.classList.add('hidden');
                    mobileUserSection.classList.remove('hidden');
                    mobileLoginSection.classList.add('hidden');
                    userName.textContent = data.user_name;
                    mobileUserName.textContent = data.user_name;
                } else {
                    // Usuario no logueado
                    userSection.classList.add('hidden');
                    loginSection.classList.remove('hidden');
                    mobileUserSection.classList.add('hidden');
                    mobileLoginSection.classList.remove('hidden');
                }
            } catch (error) {
                console.error('Error al verificar la sesión:', error);
                // En caso de error, mostrar botón de login
                document.getElementById('userSection').classList.add('hidden');
                document.getElementById('loginSection').classList.remove('hidden');
                document.getElementById('mobileUserSection').classList.add('hidden');
                document.getElementById('mobileLoginSection').classList.remove('hidden');
            }
        }

        // Función para mostrar modal de confirmación de logout
        function confirmLogout() {
            document.getElementById('logoutModal').classList.remove('hidden');
        }

        // Función para cerrar modal de logout
        function closeLogoutModal() {
            document.getElementById('logoutModal').classList.add('hidden');
        }

        // Función para cerrar sesión
        async function logout() {
            try {
                const response = await fetch('logout.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                const data = await response.json();
                
                if (data.success) {
                    window.location.href = '../conexión/login.php';
                } else {
                    alert('Error al cerrar sesión');
                }
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
                alert('Error al cerrar sesión');
            }
        }

        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.toggle('hidden');
        }
     
        document.addEventListener('DOMContentLoaded', function() {
            initializeTheme();
            checkSession();
            const desktopToggle = document.getElementById('themeToggle');
            const mobileToggle = document.getElementById('themeToggleMobile');
            
            if (desktopToggle) {
                desktopToggle.addEventListener('change', toggleTheme);
            }
            
            if (mobileToggle) {
                mobileToggle.addEventListener('change', toggleTheme);
            }
            
            // Crear partículas dinámicas
            const hero = document.querySelector('section.hero-bg');
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle dark:particle-dark';
                particle.style.width = Math.random() * 10 + 5 + 'px';
                particle.style.height = particle.style.width;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
                hero.appendChild(particle);
            }
        });
        
        function scrollToNext() {
            document.getElementById('next-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }