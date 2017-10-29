-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: americahotel
-- ------------------------------------------------------
-- Server version	5.7.18-log

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
-- Table structure for table `tbl_userworks`
--

DROP TABLE IF EXISTS `tbl_userworks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_userworks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `supervisor` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `zipCode` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `hours` varchar(45) DEFAULT NULL,
  `jobTitle` varchar(45) DEFAULT NULL,
  `startDate` varchar(45) DEFAULT NULL,
  `endDate` varchar(45) DEFAULT NULL,
  `startSalary` varchar(45) DEFAULT NULL,
  `endSalary` varchar(45) DEFAULT NULL,
  `reasonLeaving` varchar(255) DEFAULT NULL,
  `selfSummary` varchar(255) DEFAULT NULL,
  `couldContact` varchar(45) DEFAULT NULL,
  `userIdCode` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_userworks`
--

LOCK TABLES `tbl_userworks` WRITE;
/*!40000 ALTER TABLE `tbl_userworks` DISABLE KEYS */;
INSERT INTO `tbl_userworks` VALUES (28,'四川有乐信息技术有限公司','张国良','成都市高新区益州大道移动互联创业大厦1011','658741','18281865044','40','前端工程师','01-12-2015','19-09-2017','3000','7000','技术提升不够','在公司学到了很多东西','1','6FE1873C262319A0'),(29,'绵竹同城电子商务','郭康康','绵竹经济开发区','618200','13778287235','30','司机','01-12-2012','01-8-2013','1000','2000','工资太低','开车好耍','1','6FE1873C262319A0'),(30,'四川有乐信息技术有限公司','张国良','成都市高新区益州大道移动互联创业大厦1011','658741','18281865044','8','前端工程师','01-12-2015','19-09-2017','3000','7000','技术提升不够','在公司学到了很多东西','0','1');
/*!40000 ALTER TABLE `tbl_userworks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-30  3:34:31
