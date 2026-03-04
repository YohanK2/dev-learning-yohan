<?php
session_start();

// Si el usuario no está logueado, redirigir al login
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
?>