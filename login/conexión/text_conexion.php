<?php
// test_conexion.php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Probando conexión...</h1>";

$host = 'localhost';
$dbname = 'biodiversidad_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "<p style='color: green;'>✅ Conexión a la base de datos EXITOSA</p>";
    
    // Verificar si la tabla existe
    $stmt = $pdo->query("SHOW TABLES LIKE 'usuarios'");
    if ($stmt->rowCount() > 0) {
        echo "<p style='color: green;'>✅ Tabla 'usuarios' encontrada</p>";
    } else {
        echo "<p style='color: red;'>❌ Tabla 'usuarios' NO existe</p>";
    }
    
} catch(PDOException $e) {
    echo "<p style='color: red;'>❌ Error de conexión: " . $e->getMessage() . "</p>";
}

// Verificar si hay datos en la tabla
try {
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM usuarios");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "<p>Usuarios en la base de datos: " . $result['total'] . "</p>";
} catch(Exception $e) {
    echo "<p>Error al contar usuarios: " . $e->getMessage() . "</p>";
}
?>