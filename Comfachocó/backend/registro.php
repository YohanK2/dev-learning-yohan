<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombre = $_POST['nombre'];
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  $tipo = $_POST['tipo_empleado'];

  $sql = "INSERT INTO usuarios (nombre, email, password, tipo_empleado) VALUES ('$nombre', '$email', '$password', '$tipo')";

  if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Usuario registrado exitosamente."]);
  } else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
  }

  $conn->close();
}
?>
