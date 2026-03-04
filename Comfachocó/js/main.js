// Registro real con PHP
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);

    const response = await fetch("backend/register.php", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      alert("Registro exitoso, ahora puedes iniciar sesión");
      window.location.href = "login.html";
    } else {
      alert(data.message);
    }
  });
}
