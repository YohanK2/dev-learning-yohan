<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST['email'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM usuarios WHERE email = '$email'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
      session_start();
      $_SESSION['user_id'] = $row['id'];
      $_SESSION['nombre'] = $row['nombre'];
      $_SESSION['tipo_empleado'] = $row['tipo_empleado'];
      echo json_encode(["success" => true, "message" => "Inicio de sesión correcto."]);
    } else {
      echo json_encode(["success" => false, "message" => "Contraseña incorrecta."]);
    }
  } else {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
  }
}
$conn->close();
?>
