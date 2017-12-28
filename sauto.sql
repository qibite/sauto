-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.7.19 - MySQL Community Server (GPL)
-- Операционная система:         Win32
-- HeidiSQL Версия:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных sauto
CREATE DATABASE IF NOT EXISTS `sauto` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sauto`;

-- Дамп структуры для таблица sauto.cars
CREATE TABLE IF NOT EXISTS `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firm` char(50) NOT NULL,
  `model` char(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `model` (`model`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы sauto.cars: ~12 rows (приблизительно)
DELETE FROM `cars`;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` (`id`, `firm`, `model`) VALUES
	(1, 'Acura', 'CL'),
	(2, 'Acura', 'CSX'),
	(3, 'Acura', 'EL'),
	(4, 'Acura', 'ILX'),
	(5, 'Acura', 'Integra'),
	(6, 'Toyota', 'MR2'),
	(7, 'Toyota', 'Corolla'),
	(8, 'Honda', 'Partner'),
	(9, 'Honda', 'Integra'),
	(10, 'Toyota', 'Airwave'),
	(11, 'Nissan', 'Cedric'),
	(13, 'Honda', 'Accord');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;

-- Дамп структуры для таблица sauto.car_work_price
CREATE TABLE IF NOT EXISTS `car_work_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `work` char(50) NOT NULL,
  `car` char(50) NOT NULL,
  `price` mediumint(9) NOT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `FK_car_work_price_cars` (`car`),
  KEY `FK_car_work_price_services` (`work`),
  CONSTRAINT `FK_car_work_price_cars` FOREIGN KEY (`car`) REFERENCES `cars` (`model`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_car_work_price_services` FOREIGN KEY (`work`) REFERENCES `services` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы sauto.car_work_price: ~0 rows (приблизительно)
DELETE FROM `car_work_price`;
/*!40000 ALTER TABLE `car_work_price` DISABLE KEYS */;
/*!40000 ALTER TABLE `car_work_price` ENABLE KEYS */;

-- Дамп структуры для таблица sauto.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `family` char(50) NOT NULL,
  `name` char(50) NOT NULL,
  `surname` char(50) DEFAULT NULL,
  `phone` char(50) NOT NULL,
  `avto_id` smallint(6) NOT NULL,
  `mail` char(50) DEFAULT NULL,
  `gosno` char(50) NOT NULL,
  `sor` char(50) NOT NULL,
  `year` smallint(6) NOT NULL,
  `summ` int(11) DEFAULT NULL,
  `descont` int(11) DEFAULT NULL,
  `history` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы sauto.clients: ~5 rows (приблизительно)
DELETE FROM `clients`;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` (`id`, `family`, `name`, `surname`, `phone`, `avto_id`, `mail`, `gosno`, `sor`, `year`, `summ`, `descont`, `history`) VALUES
	(1, 'Древолазов', 'Василий', 'Петрович', '7 914 987-23-23', 2, 'test@test.ru', 'x777xx28rus', '2846159753', 2007, 19850, 10, NULL),
	(2, 'Никакущих', 'Томара', 'Батоевна', '7 924 159-85-85', 1, 'test2@test.ru', 'a777aa75rus', '6598753159', 2009, 5620, 5, NULL),
	(3, 'Федоров', 'Геннадий', 'Алексеевч', '7 914 555-45-65', 11, 'fedorov@mail.rus', 'x777xx75rus', '75AB745698', 2003, NULL, NULL, NULL),
	(5, 'Иванчук', 'Мария', 'Сергеевна', '7 914 521-54-54', 1, '', 'a333aa75rus', '75AC546213', 2005, NULL, NULL, NULL),
	(6, 'Чупин', 'Григорий', 'Лепс', '79144236666', 4, 'last@mail.com', 'e111ee75rus', '48AC654125', 2012, NULL, NULL, NULL);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;

-- Дамп структуры для таблица sauto.incident
CREATE TABLE IF NOT EXISTS `incident` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client` smallint(6) NOT NULL,
  `car` smallint(6) NOT NULL,
  `troubles` varchar(50) NOT NULL,
  `begin` datetime NOT NULL,
  `end` datetime DEFAULT NULL,
  `total_price` mediumint(9) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы sauto.incident: ~0 rows (приблизительно)
DELETE FROM `incident`;
/*!40000 ALTER TABLE `incident` DISABLE KEYS */;
/*!40000 ALTER TABLE `incident` ENABLE KEYS */;

-- Дамп структуры для таблица sauto.migration
CREATE TABLE IF NOT EXISTS `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы sauto.migration: ~2 rows (приблизительно)
DELETE FROM `migration`;
/*!40000 ALTER TABLE `migration` DISABLE KEYS */;
INSERT INTO `migration` (`version`, `apply_time`) VALUES
	('m000000_000000_base', 1507783346),
	('m130524_201442_init', 1507783355);
/*!40000 ALTER TABLE `migration` ENABLE KEYS */;

-- Дамп структуры для таблица sauto.services
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(99) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `code` tinyint(4) NOT NULL,
  `raiting` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы sauto.services: ~0 rows (приблизительно)
DELETE FROM `services`;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` (`id`, `name`, `code`, `raiting`) VALUES
	(1, 'Снятие/установка колеса', 3, 100);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;

-- Дамп структуры для таблица sauto.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `auth_key` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password_reset_token` (`password_reset_token`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Дамп данных таблицы sauto.user: ~0 rows (приблизительно)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `auth_key`, `password_hash`, `password_reset_token`, `email`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'admin', 'Uegz6okjEWQEY2U6Alxi1QRxq31aQAWN', '$2y$13$GOE..kj1iL.Tfp/V85PEweoLN5xyRUFPMHYMk/Fds.bbnLAZorLAS', NULL, 'qibite@mail.ru', 10, 1507785585, 1507785585);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
