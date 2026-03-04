<?php
include 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "No autenticado"]);
  exit;
}

$usuario_id = $_SESSION['user_id'];
$sql = "SELECT dias_disponibles FROM usuarios WHERE id = '$usuario_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  echo json_encode(["success" => true, "dias_disponibles" => $row['dias_disponibles']]);
} else {
  echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
}

$conn->close();
?>
