<?php
// register.php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $nombre = trim($_POST['firstName']);
        $apellido = trim($_POST['lastName']);
        $email = trim($_POST['email']);
        $username = trim($_POST['username']);
        $password = $_POST['password'];
        $confirmPassword = $_POST['confirmPassword'];
        $terms = isset($_POST['terms']) ? true : false;

        // Validaciones
        if (empty($nombre) || empty($apellido) || empty($email) || empty($username) || empty($password)) {
            echo json_encode([
                'success' => false, 
                'message' => 'Todos los campos son obligatorios'
            ]);
            exit;
        }

        if (!$terms) {
            echo json_encode([
                'success' => false, 
                'message' => 'Debes aceptar los términos y condiciones'
            ]);
            exit;
        }

        if ($password !== $confirmPassword) {
            echo json_encode([
                'success' => false, 
                'message' => 'Las contraseñas no coinciden'
            ]);
            exit;
        }

        if (strlen($password) < 8) {
            echo json_encode([
                'success' => false, 
                'message' => 'La contraseña debe tener al menos 8 caracteres'
            ]);
            exit;
        }

        // Verificar si el usuario ya existe
        $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ? OR username = ?");
        $stmt->execute([$email, $username]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => false, 
                'message' => 'El email o nombre de usuario ya está registrado'
            ]);
            exit;
        }

        // Hash de la contraseña
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        
        // Insertar usuario
        $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, apellido, email, username, password) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$nombre, $apellido, $email, $username, $passwordHash]);
        
        echo json_encode([
            'success' => true, 
            'message' => '¡Registro exitoso! Ahora puedes iniciar sesión'
        ]);
        
    } catch(PDOException $e) {
        echo json_encode([
            'success' => false, 
            'message' => 'Error en el registro: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Método no permitido'
    ]);
}
?>