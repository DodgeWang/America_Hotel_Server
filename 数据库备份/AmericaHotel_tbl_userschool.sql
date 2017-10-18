-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: AmericaHotel
-- ------------------------------------------------------
-- Server version	5.7.18

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
-- Table structure for table `tbl_userschool`
--

DROP TABLE IF EXISTS `tbl_userschool`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_userschool` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `yearCompleted` varchar(45) DEFAULT NULL,
  `major` varchar(45) DEFAULT NULL,
  `degreeDiploma` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `userIdCode` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_userschool`
--

LOCK TABLES `tbl_userschool` WRITE;
/*!40000 ALTER TABLE `tbl_userschool` DISABLE KEYS */;
INSERT INTO `tbl_userschool` VALUES (79,'绵竹实验中学','绵竹滨河路东段','20-06-2009','无','初中','1','6FE1873C262319A0'),(80,'mianzhu','fdfas','ddd','sss','fdsfsadf','1','6FE1873C262319A0'),(81,'四川文理学院','达州南坝街','20-06-2016','计算机科学与技术','本科','2','6FE1873C262319A0'),(82,'绵竹实验中学','绵竹滨河路东段','20-06-2009','无','初中','1','1'),(83,'绵竹中学','绵竹新城','20-06-2012','理科','高中','1','1'),(84,'四川文理学院','达州南坝街','20-06-2016','计算机科学与技术','本科','2','1'),(85,'清华大学','北京','20-06-2019','计算机','硕士','2','1');
/*!40000 ALTER TABLE `tbl_userschool` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-18 17:29:41
