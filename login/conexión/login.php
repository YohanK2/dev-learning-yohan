<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $username = trim($_POST['username']);
        $password = $_POST['password'];

        if (empty($username) || empty($password)) {
            echo json_encode([
                'success' => false, 
                'message' => 'Por favor, completa todos los campos'
            ]);
            exit;
        }

        $stmt = $pdo->prepare("SELECT id, username, password, nombre, apellido FROM usuarios WHERE username = ? OR email = ?");
        $stmt->execute([$username, $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['nombre'] = $user['nombre'];
            $_SESSION['apellido'] = $user['apellido'];
            
            echo json_encode([
                'success' => true, 
                'message' => '¡Bienvenido ' . $user['nombre'] . '!'
            ]);
        } else {
            echo json_encode([
                'success' => false, 
                'message' => 'Usuario o contraseña incorrectos'
            ]);
        }
    } catch(PDOException $e) {
        echo json_encode([
            'success' => false, 
            'message' => 'Error en el servidor: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Método no permitido'
    ]);
}
?>