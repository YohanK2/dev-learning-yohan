-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-11-2025 a las 19:34:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biodiversidad_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `username`, `password`, `fecha_registro`, `activo`) VALUES
(1, 'Admin', 'Test', 'admin@test.com', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '2025-11-02 03:59:55', 1),
(2, 'Yohan Andrés', 'Yohan', 'yohanandresbecerracordoba@gmail.com', 'admin1', '$2y$10$8pr7FQLv2BXjdmrVyVwuDOokH5GrEIgxBIZhw9/RLO6NUCAhEhbem', '2025-11-02 04:16:43', 1),
(3, 'Arley', 'Hurtado', 'hurtado@gmail.com', 'Yosuar', '$2y$10$2dO4OiO7ZAqKKRksP1ycU.3z9bIh8/Vs/9td88wGUwl1NtYW28rIu', '2025-11-02 23:11:45', 1),
(4, 'Willington', 'Yohan', 'ahvwhjc@gmail.com', 'wilin123', '$2y$10$jKquY9Qaq3uo6m6xrtCPVuQtAVWLHQxer4FLthAm7Xm7kdeuBu.n2', '2025-11-10 02:45:34', 1),
(5, 'Yosuar', 'Jarara', 'hurtadosh@gmail.com', 'Wepa', '$2y$10$XesUmzDWPx8pKKd6pqksueRLfj.WHwwMGGbziNjRTUtgDQ6a3ZcEK', '2025-11-10 02:59:11', 1),
(6, 'eliana', 'valencia', 'billetico@gmail.com', 'Billetico1', '$2y$10$N/YTW/cH50ZmkkPfUrbJv.VGARt1BuoRo7YODzuglezx8VUVXbw82', '2025-11-10 07:32:43', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
