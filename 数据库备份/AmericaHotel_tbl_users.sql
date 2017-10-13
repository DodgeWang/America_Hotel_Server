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
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCode` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `SSN` varchar(100) DEFAULT NULL,
  `mailAddress` varchar(255) DEFAULT NULL,
  `zipCode` varchar(45) DEFAULT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `daysWork` varchar(45) DEFAULT NULL,
  `workNature` varchar(45) DEFAULT NULL,
  `workHours` varchar(45) DEFAULT NULL,
  `workAtNight` varchar(45) DEFAULT NULL,
  `workAvailableDate` varchar(45) DEFAULT NULL,
  `isLegalStatus` varchar(45) DEFAULT NULL,
  `haveCriminalRecord` varchar(45) DEFAULT NULL,
  `criminalRecord` varchar(255) DEFAULT NULL,
  `haveDL` varchar(45) DEFAULT NULL,
  `DLNumber` varchar(45) DEFAULT NULL,
  `DLIssuedState` varchar(45) DEFAULT NULL,
  `IsJionedArmy` varchar(45) DEFAULT NULL,
  `isMemberNG` varchar(45) DEFAULT NULL,
  `militarySpecialty` varchar(45) DEFAULT NULL,
  `createTime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'1','test1','670b14728ad9902aecba32e22fa4f6bd','wangdaiqiang','510622199308152716','四川省绵竹市','618200','18281865016','25','453831794@qq.com','1,2,3,0','0','13','0','19-9-2017','0','0','抢劫','0','9859598','华盛顿','0','0','狙击手','2017-09-20'),(26,'6FE1873C262319A0','001@qq.com&','670b14728ad9902aecba32e22fa4f6bd','王代强','510622199308152716','四川省绵竹市天池乡楠木沟村一组','618200&','18281865016&','25&','453831794@qq.com&','1,2,3,4,5,6,7','1','40&','1','21-9-2017','1','0','无','0','999666333&','中国&','1','1','狙击&','2017-09-21 13:12:50');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-13 18:16:21
