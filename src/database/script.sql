-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2023 a las 11:47:13
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `asistente2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuidador`
--

CREATE asistente2;

USE asistente2;


CREATE TABLE `cuidador` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuidador`
--

INSERT INTO `cuidador` (`id`, `nombre`, `correo`, `password`) VALUES
(1, 'andresCuidador', 'andres@gmail.com', 'andres123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formula`
--

CREATE TABLE `formula` (
  `id` int(10) UNSIGNED NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `formula`
--

INSERT INTO `formula` (`id`, `data`) VALUES
(1, '{\r\n    \"data\":{\r\n        \"edad\":20,\r\n        \"observacion\":\"Paciente adulto edad 33 años con problemas pulmonares, fumador compulsivo\",\r\n        \"antecendes\":[\r\n            {\r\n                \"tipo\":\"Farmacologicos\",\r\n                \"observaciones\":\"Acetaminofen 1000 mg...\",\r\n                \"fecha\":\"28:04:2023 00:00:00\"\r\n            },{\r\n                \"tipo\":\"Quirurgico\",\r\n                \"observaciones\":\"herniografia inguial derecha...\",\r\n                \"fecha\":\"28:04:2023 00:00:00\"       \r\n            },{\r\n                \"tipo\":\"Patologicos\",\r\n                \"observaciones\":\"hipertension arterial/infarto\",\r\n                \"fecha\":\"28:04:2023 00:00:00\"  \r\n            }\r\n        ],\r\n        \"tratamiento\": [\r\n            {\r\n              \"tipo\": \"Pastillas\",\r\n              \"Dosis\": \"3  dosis diaria\",\r\n              \"cantidad\": \"21\",\r\n              \"duracion\": \"7 dias\",\r\n              \"indicacion\": \"despues de cada comida\",\r\n              \"description\": \"Dolex\"\r\n            },\r\n            {\r\n              \"tipo\": \"Gotas\",\r\n              \"dosis\": \"2 dosis diaria\",\r\n              \"cantidad\": \"10\",\r\n              \"duracion\": \"5 dias\",\r\n              \"indicacion\": \"al levantarse y antes de acostarse\",\r\n              \"description\": \"nn\"\r\n            }\r\n          ]\r\n\r\n    }\r\n}'),
(2, '{\r\n    \"data\":{\r\n        \"edad\":20,\r\n        \"observacion\":\"Paciente adulto edad 33 años con problemas pulmonares, fumador compulsivo\",\r\n        \"antecendes\":[\r\n            {\r\n                \"tipo\":\"Farmacologicos\",\r\n                \"observaciones\":\"Acetaminofen 1000 mg...\",\r\n                \"fecha\":\"28:04:2023 00:00:00\"\r\n            },{\r\n                \"tipo\":\"Quirurgico\",\r\n                \"observaciones\":\"herniografia inguial derecha...\",\r\n                \"fecha\":\"28:04:2023 00:00:00\"       \r\n            },{\r\n                \"tipo\":\"Patologicos\",\r\n                \"observaciones\":\"hipertension arterial/infarto\",\r\n                \"fecha\":\"28:04:2023 00:00:00\"  \r\n            }\r\n        ],\r\n        \"tratamiento\": [\r\n            {\r\n              \"tipo\": \"Pastillas\",\r\n              \"Dosis\": \"3  dosis diaria\",\r\n              \"cantidad\": \"21\",\r\n              \"duracion\": \"7 dias\",\r\n              \"indicacion\": \"despues de cada comida\",\r\n              \"description\": \"Dolex\"\r\n            },\r\n            {\r\n              \"tipo\": \"Gotas\",\r\n              \"dosis\": \"2 dosis diaria\",\r\n              \"cantidad\": \"10\",\r\n              \"duracion\": \"5 dias\",\r\n              \"indicacion\": \"al levantarse y antes de acostarse\",\r\n              \"description\": \"nn\"\r\n            }\r\n          ]\r\n\r\n    }\r\n}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `formula_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `nombre`, `correo`, `password`, `formula_id`) VALUES
(1, 'ivan', 'iivaan437@gmail.com', 'ivan123', 1),
(8, 'juan', 'juan@gmail.com', 'juan123', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_cuidador`
--

CREATE TABLE `paciente_cuidador` (
  `paciente_id` int(10) UNSIGNED NOT NULL,
  `cuidador_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_cuidador`
--

INSERT INTO `paciente_cuidador` (`paciente_id`, `cuidador_id`) VALUES
(8, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cuidador`
--
ALTER TABLE `cuidador`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `formula`
--
ALTER TABLE `formula`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_formula_id` (`formula_id`);

--
-- Indices de la tabla `paciente_cuidador`
--
ALTER TABLE `paciente_cuidador`
  ADD PRIMARY KEY (`paciente_id`,`cuidador_id`),
  ADD KEY `cuidador_id` (`cuidador_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cuidador`
--
ALTER TABLE `cuidador`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `formula`
--
ALTER TABLE `formula`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`formula_id`) REFERENCES `formula` (`id`);

--
-- Filtros para la tabla `paciente_cuidador`
--
ALTER TABLE `paciente_cuidador`
  ADD CONSTRAINT `paciente_cuidador_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`id`),
  ADD CONSTRAINT `paciente_cuidador_ibfk_2` FOREIGN KEY (`cuidador_id`) REFERENCES `cuidador` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;