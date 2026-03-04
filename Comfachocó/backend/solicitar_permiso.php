<?php
include 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
  echo json_encode(["success" => false, "message" => "No autenticado"]);
  exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $usuario_id = $_SESSION['user_id'];
  $tipo = $_POST['tipo'];
  $fecha_inicio = $_POST['fecha_inicio'];
  $fecha_fin = $_POST['fecha_fin'];

  $sql = "INSERT INTO solicitudes (usuario_id, tipo, fecha_inicio, fecha_fin) 
          VALUES ('$usuario_id', '$tipo', '$fecha_inicio', '$fecha_fin')";

  if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Solicitud enviada correctamente."]);
  } else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
  }
}
$conn->close();
?>
