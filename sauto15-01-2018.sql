-- MySQL dump 10.14  Distrib 5.5.50-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: sauto
-- ------------------------------------------------------
-- Server version	5.5.50-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `car_work_price`
--

DROP TABLE IF EXISTS `car_work_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car_work_price` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_work_price`
--

LOCK TABLES `car_work_price` WRITE;
/*!40000 ALTER TABLE `car_work_price` DISABLE KEYS */;
/*!40000 ALTER TABLE `car_work_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firm` char(50) NOT NULL,
  `model` char(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `model` (`model`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,'Acura','CL'),(2,'Acura','CSX'),(3,'Acura','EL'),(4,'Acura','ILX'),(5,'Acura','Integra'),(6,'Toyota','MR2'),(7,'Toyota','Corolla'),(8,'Honda','Partner'),(9,'Honda','Integra'),(10,'Toyota','Airwave'),(11,'Nissan','Cedric'),(12,'Honda','Accord'),(13,'Lamborgini','Diablo'),(14,'ГАЗ','3110'),(15,'ГАЗ','3110'),(16,'Nissan','March'),(17,'Nissan','GTR'),(18,'Nissan','Avenir'),(19,'Ford','Focus'),(20,'Toyota','Corona'),(21,'ГАЗ','21'),(22,'Toyota','Cresta'),(23,'Toyota','Allion'),(24,'Toyota','Land Cruiser');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Сизиков','Александр','123123','864',19,'684','9547','4684',2012,NULL,NULL,NULL),(2,'ggg','ttt','ttt','5665',20,'','585758','5656',566,NULL,NULL,NULL),(3,'Долженко','Алексей','Сергеевич','79144567272',23,'test@test.du','x777xx75rus','75AB462154',2009,NULL,NULL,NULL),(4,'Иванов','Иван','Иванович','89144700000',24,'1@1.com','с845уа75','774455845',2012,NULL,NULL,NULL),(5,'Альпенгольд','Владимир','Петрович','ывыв',3,'ывыв','вввы','ывыв',2003,NULL,NULL,NULL),(6,'Альпенгольд','Владимир','Петрович','ывыв',3,'ывыв','вввы','ывыв',2003,NULL,NULL,NULL),(7,'Альпенгольд','Владимир','Петрович','ывыв',3,'ывыв','вввы','ывыв',2003,NULL,NULL,NULL),(8,'Альпенгольд','Владимир','Петрович','ывыв',3,'ывыв','вввы','ывыв',2003,NULL,NULL,NULL),(9,'Альпенгольд','Владимир','Петрович','ывыв',3,'ывыв','вввы','ывыв',2003,NULL,NULL,NULL),(10,'Альпенгольд','Владимир','Петрович','ывыв',3,'ывыв','вввы','ывыв',2003,NULL,NULL,NULL),(11,'test','test','test','dfd',3,'','df','dfd',2003,NULL,NULL,NULL);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incident`
--

DROP TABLE IF EXISTS `incident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `incident` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incident`
--

LOCK TABLES `incident` WRITE;
/*!40000 ALTER TABLE `incident` DISABLE KEYS */;
/*!40000 ALTER TABLE `incident` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migration`
--

DROP TABLE IF EXISTS `migration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration`
--

LOCK TABLES `migration` WRITE;
/*!40000 ALTER TABLE `migration` DISABLE KEYS */;
INSERT INTO `migration` VALUES ('m000000_000000_base',1507783346),('m130524_201442_init',1507783355);
/*!40000 ALTER TABLE `migration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal`
--

DROP TABLE IF EXISTS `personal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fio` varchar(50) NOT NULL,
  `busy` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal`
--

LOCK TABLES `personal` WRITE;
/*!40000 ALTER TABLE `personal` DISABLE KEYS */;
INSERT INTO `personal` VALUES (1,'Попов Василий Михайлович',0),(2,'Петухов Владимир Владимирович',0),(3,'Чистохин Евгений Петрович',1),(4,'Мальцев Михаил Сергеевич',0);
/*!40000 ALTER TABLE `personal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` int(99) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `code` tinyint(4) NOT NULL,
  `raiting` int(11) NOT NULL DEFAULT '0',
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Снятие/установка колеса',3,100,100),(2,'Замена ступичного подшипника',7,100,1200),(3,'Замена масла',15,100,300),(4,'Заправка кондиционера',26,100,1200),(5,'Замена лобового стекла',28,100,1500),(6,'Компьютерная диагностика',8,100,800),(7,'Покраска двери FL',36,100,5500),(8,'Замена лампочки',12,100,300),(9,'Замена масла в МКПП',6,100,500),(10,'Диагностика подвески',8,100,300),(11,'Замена АКБ',6,100,250),(12,'Чистка дроссельной заслонки',12,100,1000),(13,'Шумоизоляция моторного отсека',14,100,8000),(14,'тест',14,100,100),(15,'тест',14,100,100),(16,'тест',14,100,100),(17,'тест',14,100,100),(18,'тест',2,100,14),(19,'тест',2,100,14),(20,'тест',2,100,14),(21,'тест2',2,100,12),(22,'тест2',2,100,12),(23,'тест2',2,100,12),(24,'ааааа',3,100,56),(25,'пррпррпр',2,100,766),(26,'пррпррпр',2,100,766),(27,'3раза',7,100,130),(28,'3раза',7,100,130),(29,'3раза',7,100,130),(30,'3раза',7,100,130),(31,'4раза',10,100,125),(32,'4раза',10,100,125),(33,'1раз',3,100,100),(34,'1раз',3,100,100),(35,'1раз',3,100,100),(36,'1раз',3,100,100),(37,'1раз',3,100,100),(38,'1раз',3,100,100),(39,'1раз',8,100,12),(40,'7раз',4,100,17),(41,'7раз',4,100,17),(42,'7раз',4,100,17),(43,'7раз',4,100,17),(44,'7раз',4,100,17),(45,'7раз',4,100,17),(46,'7раз',4,100,17),(47,'16hfp',4,100,16),(48,'Новая услуга',8,100,19),(49,'Новая услуга',2,100,14),(50,'Новая услуга',8,100,16),(51,'Новая услуга',8,100,16),(52,'Новая услуга6',4,100,6),(53,'Замена стойки',12,100,800),(54,'авава',12,100,17),(55,'аппап',12,100,47),(56,'Замена шаровой нижней левой',12,100,800),(57,'Замена шаровой нижней левой',12,100,800),(58,'Замена шаровой нижней правой',12,100,800),(59,'Замена шаровой нижней правой',12,100,800),(60,'Замена шаровой нижней правой',12,100,800),(61,'Замена шаровой нижней правой',12,100,800),(62,'Замена шаровой нижней правой',12,100,800),(63,'Замена шаровой нижней правой',12,100,800),(64,'Замена шаровой нижней правой',12,100,800),(65,'Замена шаровой нижней правой',12,100,800),(66,'Замена шаровой нижней правой',12,100,800),(67,'Замена шаровой нижней правой',12,100,800);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','Uegz6okjEWQEY2U6Alxi1QRxq31aQAWN','$2y$13$GOE..kj1iL.Tfp/V85PEweoLN5xyRUFPMHYMk/Fds.bbnLAZorLAS',NULL,'qibite@mail.ru',10,1507785585,1507785585);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zapchasti`
--

DROP TABLE IF EXISTS `zapchasti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zapchasti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `code` varchar(50) DEFAULT '0',
  `price` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zapchasti`
--

LOCK TABLES `zapchasti` WRITE;
/*!40000 ALTER TABLE `zapchasti` DISABLE KEYS */;
/*!40000 ALTER TABLE `zapchasti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-15 17:03:51
