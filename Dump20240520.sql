CREATE DATABASE  IF NOT EXISTS `db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add site',7,'add_site'),(26,'Can change site',7,'change_site'),(27,'Can delete site',7,'delete_site'),(28,'Can view site',7,'view_site'),(29,'Can add customer',8,'add_customer'),(30,'Can change customer',8,'change_customer'),(31,'Can delete customer',8,'delete_customer'),(32,'Can view customer',8,'view_customer'),(33,'Can add product1',9,'add_product1'),(34,'Can change product1',9,'change_product1'),(35,'Can delete product1',9,'delete_product1'),(36,'Can view product1',9,'view_product1'),(37,'Can add categories',10,'add_categories'),(38,'Can change categories',10,'change_categories'),(39,'Can delete categories',10,'delete_categories'),(40,'Can view categories',10,'view_categories'),(41,'Can add order',11,'add_order'),(42,'Can change order',11,'change_order'),(43,'Can delete order',11,'delete_order'),(44,'Can view order',11,'view_order'),(45,'Can add payments',12,'add_payments'),(46,'Can change payments',12,'change_payments'),(47,'Can delete payments',12,'delete_payments'),(48,'Can view payments',12,'view_payments'),(49,'Can add Cart',13,'add_cart'),(50,'Can change Cart',13,'change_cart'),(51,'Can delete Cart',13,'delete_cart'),(52,'Can view Cart',13,'view_cart'),(53,'Can add account',14,'add_account'),(54,'Can change account',14,'change_account'),(55,'Can delete account',14,'delete_account'),(56,'Can view account',14,'view_account'),(57,'Can add access attempt',15,'add_accessattempt'),(58,'Can change access attempt',15,'change_accessattempt'),(59,'Can delete access attempt',15,'delete_accessattempt'),(60,'Can view access attempt',15,'view_accessattempt'),(61,'Can add access log',16,'add_accesslog'),(62,'Can change access log',16,'change_accesslog'),(63,'Can delete access log',16,'delete_accesslog'),(64,'Can view access log',16,'view_accesslog'),(65,'Can add access failure',17,'add_accessfailurelog'),(66,'Can change access failure',17,'change_accessfailurelog'),(67,'Can delete access failure',17,'delete_accessfailurelog'),(68,'Can view access failure',17,'view_accessfailurelog'),(69,'Can add blacklisted token',18,'add_blacklistedtoken'),(70,'Can change blacklisted token',18,'change_blacklistedtoken'),(71,'Can delete blacklisted token',18,'delete_blacklistedtoken'),(72,'Can view blacklisted token',18,'view_blacklistedtoken'),(73,'Can add outstanding token',19,'add_outstandingtoken'),(74,'Can change outstanding token',19,'change_outstandingtoken'),(75,'Can delete outstanding token',19,'delete_outstandingtoken'),(76,'Can view outstanding token',19,'view_outstandingtoken'),(77,'Can add contactdetails',20,'add_contactdetails'),(78,'Can change contactdetails',20,'change_contactdetails'),(79,'Can delete contactdetails',20,'delete_contactdetails'),(80,'Can view contactdetails',20,'view_contactdetails'),(81,'Can add customers',21,'add_customers'),(82,'Can change customers',21,'change_customers'),(83,'Can delete customers',21,'delete_customers'),(84,'Can view customers',21,'view_customers'),(85,'Can add orderproducts',22,'add_orderproducts'),(86,'Can change orderproducts',22,'change_orderproducts'),(87,'Can delete orderproducts',22,'delete_orderproducts'),(88,'Can view orderproducts',22,'view_orderproducts'),(89,'Can add orders',23,'add_orders'),(90,'Can change orders',23,'change_orders'),(91,'Can delete orders',23,'delete_orders'),(92,'Can view orders',23,'view_orders'),(93,'Can add productimages',24,'add_productimages'),(94,'Can change productimages',24,'change_productimages'),(95,'Can delete productimages',24,'delete_productimages'),(96,'Can view productimages',24,'view_productimages'),(97,'Can add products',25,'add_products'),(98,'Can change products',25,'change_products'),(99,'Can delete products',25,'delete_products'),(100,'Can view products',25,'view_products'),(101,'Can add reviewimages',26,'add_reviewimages'),(102,'Can change reviewimages',26,'change_reviewimages'),(103,'Can delete reviewimages',26,'delete_reviewimages'),(104,'Can view reviewimages',26,'view_reviewimages'),(105,'Can add reviews',27,'add_reviews'),(106,'Can change reviews',27,'change_reviews'),(107,'Can delete reviews',27,'delete_reviews'),(108,'Can view reviews',27,'view_reviews'),(109,'Can add roles',28,'add_roles'),(110,'Can change roles',28,'change_roles'),(111,'Can delete roles',28,'delete_roles'),(112,'Can view roles',28,'view_roles'),(113,'Can add tickets',29,'add_tickets'),(114,'Can change tickets',29,'change_tickets'),(115,'Can delete tickets',29,'delete_tickets'),(116,'Can view tickets',29,'view_tickets'),(117,'Can add trips',30,'add_trips'),(118,'Can change trips',30,'change_trips'),(119,'Can delete trips',30,'delete_trips'),(120,'Can view trips',30,'view_trips'),(121,'Can add users',31,'add_users'),(122,'Can change users',31,'change_users'),(123,'Can delete users',31,'delete_users'),(124,'Can view users',31,'view_users'),(125,'Can add wishlist',32,'add_wishlist'),(126,'Can change wishlist',32,'change_wishlist'),(127,'Can delete wishlist',32,'delete_wishlist'),(128,'Can view wishlist',32,'view_wishlist');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `axes_accessattempt`
--

DROP TABLE IF EXISTS `axes_accessattempt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `axes_accessattempt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_agent` varchar(255) NOT NULL,
  `ip_address` char(39) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `http_accept` varchar(1025) NOT NULL,
  `path_info` varchar(255) NOT NULL,
  `attempt_time` datetime(6) NOT NULL,
  `get_data` longtext NOT NULL,
  `post_data` longtext NOT NULL,
  `failures_since_start` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `axes_accessattempt_username_ip_address_user_agent_8ea22282_uniq` (`username`,`ip_address`,`user_agent`),
  KEY `axes_accessattempt_ip_address_10922d9c` (`ip_address`),
  KEY `axes_accessattempt_user_agent_ad89678b` (`user_agent`),
  KEY `axes_accessattempt_username_3f2d4ca0` (`username`),
  CONSTRAINT `axes_accessattempt_chk_1` CHECK ((`failures_since_start` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `axes_accessattempt`
--

LOCK TABLES `axes_accessattempt` WRITE;
/*!40000 ALTER TABLE `axes_accessattempt` DISABLE KEYS */;
/*!40000 ALTER TABLE `axes_accessattempt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `axes_accessfailurelog`
--

DROP TABLE IF EXISTS `axes_accessfailurelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `axes_accessfailurelog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_agent` varchar(255) NOT NULL,
  `ip_address` char(39) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `http_accept` varchar(1025) NOT NULL,
  `path_info` varchar(255) NOT NULL,
  `attempt_time` datetime(6) NOT NULL,
  `locked_out` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `axes_accessfailurelog_user_agent_ea145dda` (`user_agent`),
  KEY `axes_accessfailurelog_ip_address_2e9f5a7f` (`ip_address`),
  KEY `axes_accessfailurelog_username_a8b7e8a4` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `axes_accessfailurelog`
--

LOCK TABLES `axes_accessfailurelog` WRITE;
/*!40000 ALTER TABLE `axes_accessfailurelog` DISABLE KEYS */;
/*!40000 ALTER TABLE `axes_accessfailurelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `axes_accesslog`
--

DROP TABLE IF EXISTS `axes_accesslog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `axes_accesslog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_agent` varchar(255) NOT NULL,
  `ip_address` char(39) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `http_accept` varchar(1025) NOT NULL,
  `path_info` varchar(255) NOT NULL,
  `attempt_time` datetime(6) NOT NULL,
  `logout_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `axes_accesslog_ip_address_86b417e5` (`ip_address`),
  KEY `axes_accesslog_user_agent_0e659004` (`user_agent`),
  KEY `axes_accesslog_username_df93064b` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `axes_accesslog`
--

LOCK TABLES `axes_accesslog` WRITE;
/*!40000 ALTER TABLE `axes_accesslog` DISABLE KEYS */;
/*!40000 ALTER TABLE `axes_accesslog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `customerId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `date_added` datetime NOT NULL,
  PRIMARY KEY (`customerId`,`productId`),
  KEY `cart_product_id_fk` (`productId`),
  CONSTRAINT `cart_customer_id_fk` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customer_Id`) ON DELETE CASCADE,
  CONSTRAINT `cart_product_id_fk` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,1,'2024-05-18 21:05:24'),(2,2,2,'2024-05-18 21:05:24'),(3,3,3,'2024-05-18 21:05:24'),(4,4,4,'2024-05-18 21:05:24');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `catId` int NOT NULL AUTO_INCREMENT,
  `catName` varchar(120) NOT NULL,
  PRIMARY KEY (`catId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electronics'),(2,'Clothing'),(3,'Books'),(4,'Home & Kitchen'),(5,'Ball'),(6,'Jersey'),(7,'Gloves'),(8,'Shoes');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactdetails`
--

DROP TABLE IF EXISTS `contactdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactdetails` (
  `user_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `district` varchar(45) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `street` text,
  PRIMARY KEY (`id`),
  KEY `contact_detail_user_id_fk_idx` (`user_id`),
  CONSTRAINT `contact_detail_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactdetails`
--

LOCK TABLES `contactdetails` WRITE;
/*!40000 ALTER TABLE `contactdetails` DISABLE KEYS */;
INSERT INTO `contactdetails` VALUES (1,1,'District 1','City A','Country X','1234','1234','Street 1'),(2,2,'District 2','City B','Country Y','2345','0987','Street 2'),(3,3,'District 3','City C','Country Z','3456','1112','Street 3'),(4,4,'District 4','City D','Country W','4567','4445','Street 4'),(5,5,'Central','New York','USA','10001','555-123-4567','123 Main St'),(6,6,'Westside','Los Angeles','USA','90001','555-234-5678','456 Elm St'),(7,7,'Downtown','Chicago','USA','60601','555-345-6789','789 Oak St'),(8,8,'Uptown','Houston','USA','77001','555-456-7890','101 Pine St'),(9,9,'Midtown','Miami','USA','33101','555-567-8901','202 Maple St'),(10,10,'East End','Boston','USA','02101','555-678-9012','303 Cedar St'),(11,11,'Southside','San Francisco','USA','94101','555-789-0123','404 Walnut St'),(12,12,'North End','Seattle','USA','98101','555-890-1234','505 Birch St'),(13,13,'West End','Denver','USA','80201','555-901-2345','606 Spruce St'),(14,14,'Downtown','Dallas','USA','75201','555-012-3456','707 Pineapple St'),(15,15,'Midtown','Atlanta','USA','30301','555-123-4567','808 Orange St'),(16,16,'Eastside','Philadelphia','USA','19101','555-234-5678','909 Lemon St'),(17,17,'Uptown','Detroit','USA','48201','555-345-6789','1010 Peach St'),(18,18,'Southside','Phoenix','USA','85001','555-456-7890','1111 Cherry St'),(19,19,'Northside','Minneapolis','USA','55401','555-567-8901','1212 Plum St'),(20,20,'Westside','Portland','USA','97201','555-678-9012','1313 Banana St'),(21,21,'Downtown','Las Vegas','USA','89101','555-789-0123','1414 Grape St'),(22,22,'Midtown','Salt Lake City','USA','84101','555-890-1234','1515 Mango St'),(23,23,'East End','New Orleans','USA','70112','555-901-2345','1616 Kiwi St'),(24,24,'South End','Charlotte','USA','28201','555-012-3456','1717 Papaya St');
/*!40000 ALTER TABLE `contactdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_Id` int NOT NULL AUTO_INCREMENT,
  `customer_fname` varchar(60) NOT NULL,
  `customer_lname` varchar(60) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`customer_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'John','Doe','1234567890'),(2,'Jane','Smith','0987654321'),(3,'Alice','Johnson','1112223333'),(4,'Bob','Brown','4445556666'),(5,'John','Doe','1234567890'),(6,'Jane','Smith','0987654321'),(7,'Alice','Johnson','1112223333'),(8,'Bob','Brown','4445556666'),(9,'Emily','Johnson','555-123-4567'),(10,'Michael','Williams','987-234-5678'),(11,'Sophia','Brown','333-345-6789'),(12,'Matthew','Jones','222-456-7890'),(13,'Olivia','Miller','777-567-8901'),(14,'William','Taylor','111-678-9012'),(15,'Emma','Anderson','444-789-0123'),(16,'Daniel','Martinez','666-890-1234'),(17,'Isabella','Garcia','888-901-2345'),(18,'Alexander','Hernandez','123-012-3456'),(19,'Mia','Lopez','987-123-4567'),(20,'James','Gonzalez','555-234-5678'),(21,'Ava','Wilson','777-345-6789'),(22,'Benjamin','Perez','888-456-7890'),(23,'Charlotte','Rodriguez','999-567-8901'),(24,'Ethan','Lee','666-678-9012'),(25,'Amelia','Lewis','444-789-0123'),(26,'Liam','Walker','222-890-1234'),(27,'Sophia','Wright','111-901-2345'),(28,'Jacob','Hall','333-012-3456');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(15,'axes','accessattempt'),(17,'axes','accessfailurelog'),(16,'axes','accesslog'),(14,'base','account'),(13,'base','cart'),(10,'base','categories'),(20,'base','contactdetails'),(8,'base','customer'),(21,'base','customers'),(11,'base','order'),(22,'base','orderproducts'),(23,'base','orders'),(12,'base','payments'),(9,'base','product1'),(24,'base','productimages'),(25,'base','products'),(26,'base','reviewimages'),(27,'base','reviews'),(28,'base','roles'),(29,'base','tickets'),(30,'base','trips'),(31,'base','users'),(32,'base','wishlist'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(7,'sites','site'),(18,'token_blacklist','blacklistedtoken'),(19,'token_blacklist','outstandingtoken');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-05-17 04:13:40.424258'),(2,'auth','0001_initial','2024-05-17 04:13:40.915960'),(3,'admin','0001_initial','2024-05-17 04:13:41.016692'),(4,'admin','0002_logentry_remove_auto_add','2024-05-17 04:13:41.025573'),(5,'admin','0003_logentry_add_action_flag_choices','2024-05-17 04:13:41.033161'),(6,'contenttypes','0002_remove_content_type_name','2024-05-17 04:13:41.108598'),(7,'auth','0002_alter_permission_name_max_length','2024-05-17 04:13:41.168339'),(8,'auth','0003_alter_user_email_max_length','2024-05-17 04:13:41.182853'),(9,'auth','0004_alter_user_username_opts','2024-05-17 04:13:41.187081'),(10,'auth','0005_alter_user_last_login_null','2024-05-17 04:13:41.229093'),(11,'auth','0006_require_contenttypes_0002','2024-05-17 04:13:41.232403'),(12,'auth','0007_alter_validators_add_error_messages','2024-05-17 04:13:41.234088'),(13,'auth','0008_alter_user_username_max_length','2024-05-17 04:13:41.283002'),(14,'auth','0009_alter_user_last_name_max_length','2024-05-17 04:13:41.325653'),(15,'auth','0010_alter_group_name_max_length','2024-05-17 04:13:41.340503'),(16,'auth','0011_update_proxy_permissions','2024-05-17 04:13:41.347940'),(17,'auth','0012_alter_user_first_name_max_length','2024-05-17 04:13:41.392103'),(18,'axes','0001_initial','2024-05-17 04:13:41.410458'),(19,'axes','0002_auto_20151217_2044','2024-05-17 04:13:41.571824'),(20,'axes','0003_auto_20160322_0929','2024-05-17 04:13:41.571824'),(21,'axes','0004_auto_20181024_1538','2024-05-17 04:13:41.595916'),(22,'axes','0005_remove_accessattempt_trusted','2024-05-17 04:13:41.663513'),(23,'axes','0006_remove_accesslog_trusted','2024-05-17 04:13:41.722627'),(24,'axes','0007_alter_accessattempt_unique_together','2024-05-17 04:13:41.739656'),(25,'axes','0008_accessfailurelog','2024-05-17 04:13:41.820371'),(26,'base','0001_initial','2024-05-17 04:13:42.076001'),(27,'base','0002_account_alter_cart_user_delete_user','2024-05-17 04:13:42.249378'),(28,'base','0003_remove_account_email_remove_account_first_name_and_more','2024-05-17 04:13:42.333035'),(29,'sessions','0001_initial','2024-05-17 04:13:42.375286'),(30,'sites','0001_initial','2024-05-17 04:13:42.386042'),(31,'sites','0002_alter_domain_unique','2024-05-17 04:13:42.425231'),(32,'token_blacklist','0001_initial','2024-05-17 04:13:42.569264'),(33,'token_blacklist','0002_outstandingtoken_jti_hex','2024-05-17 04:13:42.581796'),(34,'token_blacklist','0003_auto_20171017_2007','2024-05-17 04:13:42.593138'),(35,'token_blacklist','0004_auto_20171017_2013','2024-05-17 04:13:42.722297'),(36,'token_blacklist','0005_remove_outstandingtoken_jti','2024-05-17 04:13:42.779907'),(37,'token_blacklist','0006_auto_20171017_2113','2024-05-17 04:13:42.794147'),(38,'token_blacklist','0007_auto_20171017_2214','2024-05-17 04:13:42.945133'),(39,'token_blacklist','0008_migrate_to_bigautofield','2024-05-17 04:13:43.097013'),(40,'token_blacklist','0010_fix_migrate_to_bigautofield','2024-05-17 04:13:43.097013'),(41,'token_blacklist','0011_linearizes_history','2024-05-17 04:13:43.108020'),(42,'token_blacklist','0012_alter_outstandingtoken_user','2024-05-17 04:13:43.114204');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_site` (
  `id` int NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderproducts`
--

DROP TABLE IF EXISTS `orderproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderproducts` (
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  `quantity` int NOT NULL,
  PRIMARY KEY (`orderId`,`productId`),
  KEY `order_product_product_fk_idx` (`productId`),
  CONSTRAINT `order_product_order_fk` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON UPDATE CASCADE,
  CONSTRAINT `order_product_product_fk` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderproducts`
--

LOCK TABLES `orderproducts` WRITE;
/*!40000 ALTER TABLE `orderproducts` DISABLE KEYS */;
INSERT INTO `orderproducts` VALUES (1,1,1000,1),(1,2,2400,3),(2,2,800,1),(2,12,300,5),(3,3,20,2),(4,4,15,1);
/*!40000 ALTER TABLE `orderproducts` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_available_stocks` BEFORE INSERT ON `orderproducts` FOR EACH ROW BEGIN
  DECLARE product_id_var INTEGER;
  DECLARE available_quantity_var INTEGER;

  -- Retrieve product id from the inserted orderproducts row
  SET product_id_var = NEW.productId;

  -- Retrieve available quantity from the products table
  SELECT stock_quantity 
  INTO available_quantity_var
  FROM products
  WHERE id = product_id_var;

  -- Update available units for the product based on order quantity
  UPDATE products
  SET stock_quantity = CASE
                         WHEN stock_quantity >= NEW.quantity THEN stock_quantity - NEW.quantity
                         ELSE 0
                       END
  WHERE id = product_id_var;
  END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `calculate_orderproduct_price` BEFORE INSERT ON `orderproducts` FOR EACH ROW BEGIN
    SET NEW.price = NEW.quantity * (SELECT price FROM products WHERE Id = NEW.productId);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_payments_quantity` AFTER INSERT ON `orderproducts` FOR EACH ROW BEGIN
    DECLARE total_price DECIMAL(10, 2);
    
    -- Calculate the total price for the orderId
    SELECT SUM(price) INTO total_price
    FROM orderproducts
    WHERE orderId = NEW.orderId;

    -- Update the quantity in the payments table
    UPDATE payments
    SET amount = total_price
    WHERE orderId = NEW.orderId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `customerId` int DEFAULT NULL,
  `orderDate` date NOT NULL,
  `shippingAddressId` int NOT NULL,
  `status` enum('placed','processing','shipping','delivered','failed') NOT NULL DEFAULT 'placed',
  `deliveryDate` date DEFAULT NULL,
  PRIMARY KEY (`orderId`,`orderDate`),
  KEY `status` (`status`),
  KEY `order_contact_fk_idx` (`shippingAddressId`),
  KEY `order_customer_fk_idx` (`customerId`),
  CONSTRAINT `order_contact_details_fk` FOREIGN KEY (`shippingAddressId`) REFERENCES `contactdetails` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `order_customer_fk` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customer_Id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'2024-01-01',1,'placed','2024-01-10'),(2,2,'2024-02-01',2,'processing','2024-02-10'),(3,3,'2024-03-01',3,'shipping','2024-03-10'),(4,4,'2024-04-01',4,'delivered','2024-04-10'),(163,18,'2024-05-01',18,'delivered','2024-05-05'),(164,12,'2024-05-02',12,'placed','2024-05-10'),(165,3,'2024-05-03',3,'processing','2024-05-12'),(166,4,'2024-05-04',4,'shipping','2024-05-15'),(167,5,'2024-05-05',5,'failed',NULL),(168,2,'2024-05-06',2,'delivered','2024-05-20'),(169,9,'2024-05-07',9,'placed','2024-05-22'),(170,15,'2024-05-08',15,'processing','2024-05-25'),(171,7,'2024-05-09',7,'shipping',NULL),(172,10,'2024-05-10',10,'failed',NULL),(173,23,'2024-05-11',23,'delivered','2024-05-30'),(174,1,'2024-05-12',1,'placed','2024-06-02'),(175,19,'2024-05-13',19,'processing','2024-06-05'),(176,20,'2024-05-14',20,'shipping','2024-06-08'),(177,8,'2024-05-15',8,'failed',NULL),(178,16,'2024-05-16',16,'delivered','2024-06-15'),(179,11,'2024-05-17',11,'placed','2024-06-17'),(180,14,'2024-05-18',14,'processing','2024-06-20'),(181,6,'2024-05-19',6,'shipping','2024-06-22'),(182,17,'2024-05-20',17,'failed',NULL),(183,24,'2024-05-21',24,'delivered','2024-06-25'),(184,22,'2024-05-22',22,'placed','2024-06-28'),(185,13,'2024-05-23',13,'processing','2024-06-30'),(186,21,'2024-05-24',21,'shipping','2024-07-05'),(187,5,'2024-05-25',5,'failed',NULL),(188,2,'2024-06-30',5,'failed','2024-01-02');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `orderId` int DEFAULT NULL,
  `paymentDate` date DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `paymentMethod` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`paymentId`),
  KEY `payment_order_fk_idx` (`orderId`),
  CONSTRAINT `payment_order_fk` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,'2024-01-02',3400.00,'Credit Card'),(2,2,'2024-02-02',2300.00,'PayPal'),(3,3,'2024-03-02',40.00,'Debit Card'),(4,4,'2024-04-02',15.00,'Cash');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `productcatalog`
--

DROP TABLE IF EXISTS `productcatalog`;
/*!50001 DROP VIEW IF EXISTS `productcatalog`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `productcatalog` AS SELECT 
 1 AS `id`,
 1 AS `productName`,
 1 AS `description`,
 1 AS `catname`,
 1 AS `price`,
 1 AS `imageUrl`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `productimages`
--

DROP TABLE IF EXISTS `productimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productimages` (
  `productId` int NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`productId`,`imageUrl`),
  CONSTRAINT `product_image_product_id_fk` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimages`
--

LOCK TABLES `productimages` WRITE;
/*!40000 ALTER TABLE `productimages` DISABLE KEYS */;
INSERT INTO `productimages` VALUES (1,'laptop.jpg'),(2,'smartphone.jpg'),(3,'tshirt.jpg'),(4,'novel.jpg'),(9,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/8f7e3d851c754da19aa122cddc1a01e5_9366/predator-match-fingersave-goalkeeper-gloves.jpg'),(10,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/e76a9a7b972e467bb4486a46418a3718_9366/predator-pro-goalkeeper-gloves-kids.jpg'),(11,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/257b18c3cc5949fbbad6232f57b01021_9366/copa-pro-goalkeeper-gloves-kids.jpg'),(12,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/d075e88eff86443496a22f02ffed8375_9366/predator-match-fingersave-goalkeeper-gloves.jpg'),(13,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/adf137bfcea14b54bcbabac122b78417_9366/copa-club-goalkeeper-gloves.jpg'),(14,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/0835cbe920094811b1acd5e3566bee6a_9366/x-crazyfast-plus-firm-ground-cleats.jpg'),(15,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/c3523dd33a45420e950461fc6802cfe4_9366/predator-24-elite-low-firm-ground-cleats.jpg'),(16,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/8756149152064957b81c3b4d695f53e1_9366/predator-24-elite-turf-cleats.jpg'),(17,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/9e53d2365dba4f5b87281b5a644da3b0_9366/x-crazyfast-elite-turf-cleats.jpg'),(18,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/15a6f7b63771432db7b1cd291baef3bb_9366/copa-pure-ii-pro-firm-ground-cleats.jpg'),(19,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/96ee28c6c99045b284b5b71eefd7a33a_9366/spain-24-home-jersey.jpg'),(20,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/c1c09f47d4fb4cf58043efe54835f892_9366/argentina-2024-messi-home-authentic-jersey.jpg'),(21,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/e2a2dff383594eb494125caf5035e6c3_9366/germany-2024-away-authentic-jersey.jpg'),(22,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/74e037685abe4c9a96d788641f40d937_9366/belgium-2024-home-authentic-jersey.jpg'),(23,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/9dc51be9fc404868b31f3c55ae57cf95_9366/italy-2024-home-authentic-jersey.jpg'),(24,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/6ee0430a558c4d9f9fc82b17b96bf514_9366/mls-24-competition-nfhs-ball.jpg'),(25,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/d43c39edcbdd42c3a61eab089e961ec7_9366/mls-24-pro-ball.jpg'),(26,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/7cf3a06bda9641f69d0041a792921212_9366/messi-club-ball.jpg'),(27,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/92ba21852fc0438d9b0a47b20d6241bd_9366/ucl-pro-23-24-knockout-ball.jpg'),(28,'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/02503be230664055b61e6c4e2da5745c_9366/fussballliebe-mini-ball.jpg'),(29,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/df845283-36ad-4bd0-9741-8599b410fb69/vapor-grip3-goalkeeper-gloves-Cng0Lk.png'),(30,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7f83c04e-20aa-4e50-b3e0-a04e19799e37/vapor-dynamic-fit-goalkeeper-gloves-TvZX1r.png'),(31,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/85f1bc59-40aa-4a83-a81a-6ad7d4c91bae/match-soccer-goalkeeper-gloves-Dp8dL9.png'),(32,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bd666d16-61b2-4943-815d-2d088d01c950/match-jr-goal-keeper-gloves-qzsH8V.png'),(33,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e067cc64-f963-4450-a859-14602be64c85/paris-saint-germain-hyperwarm-soccer-gloves-HwZj7P.png'),(34,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/48883de6-ae3c-4704-8284-36fb64009852/maestro-futsal-ball-bpBb0H.png'),(35,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/5721696f-ba3c-455c-8749-e3b871c4c759/premier-league-academy-soccer-ball-sBDX7B.png'),(36,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/aa181a67-b427-4fb5-9923-f6d99b6a1af9/cr7-academy-soccer-ball-VrQqfG.png'),(37,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/11a688cd-3e14-48f7-a165-ee2ab191da53/skills-soccer-ball-vZJPW2.png'),(38,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bd032e5e-ebcd-43c1-af42-82eddd69c156/premier-league-flight-soccer-ball-dM9sq5.png'),(39,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/945ed1ea-d1c4-43e9-8403-c2f93c7f4d39/brazil-essential-football-t-shirt-MHMs62.png'),(40,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/881192d8-5318-4467-b1cb-070a2acf02bf/chelsea-fc-2023-24-stadium-away-dri-fit-football-shirt-HzkDbt.png'),(41,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/364ce512-9a9f-43ba-abab-c9a0a7510f07/brazil-2024-stadium-away-dri-fit-football-replica-shirt-Lxzpkh.png'),(42,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/454ce833-b2c8-437f-913c-2fc1337fa34f/lebron-liverpool-fc-max90-football-t-shirt-MjP49j.png'),(43,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/72272ec1-93a2-4050-ab18-dd17ee930e8c/liverpool-fc-strike-dri-fit-football-knit-top-z3N5lc.png'),(44,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bb40352b-540b-4437-b32f-fa0525626bd6/superfly-9-elite-mercurial-dream-speed-fg-high-top-football-boot-0hlF4x.png'),(45,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/50abae12-6f8a-42f2-a1bc-6f661cc44aee/vapor-15-elite-mercurial-dream-speed-fg-low-top-football-boot-wQXmK7.png'),(46,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/912e6e0e-3bfc-439a-b130-91ce6af86629/vapor-15-academy-mercurial-dream-speed-mg-low-top-football-boot-PgL0Dz.png'),(47,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/b4fb59c7-903e-4af2-bfb9-9ec7e42f7e30/superfly-9-academy-mercurial-dream-speed-mg-high-top-football-boot-1trJtC.png'),(48,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f32e169d-aeb9-450e-9eec-415e7626c888/vapor-15-academy-mercurial-dream-speed-tf-low-top-football-shoes-Tg5mK9.png');
/*!40000 ALTER TABLE `productimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(120) NOT NULL,
  `catId` int DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int DEFAULT NULL,
  `inStock` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `PRODUCT_TITLE` (`productName`),
  KEY `products_ibfk_1` (`catId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`catId`) REFERENCES `categories` (`catId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Laptop',1,'High-performance laptop',1000.00,49,1),(2,'Smartphone',1,'Latest model smartphone',800.00,96,1),(3,'T-Shirt',2,'Cotton T-shirt',20.00,198,1),(4,'Novel',3,'Best-selling novel',15.00,149,1),(5,'Laptop',1,'High-performance laptop',1000.00,50,1),(6,'Smartphone',1,'Latest model smartphone',800.00,100,1),(7,'T-Shirt',2,'Cotton T-shirt',20.00,200,1),(8,'Novel',3,'Best-selling novel',15.00,150,1),(9,'Predator Match Fingersave Goalkeeper Gloves',7,'EXCEL IN TRAINING AND MATCHES IN THESE REINFORCED GOALIE GLOVES. Stop shots in their tracks in adidas goalkeeper gloves designed to dominate. These Predator Match soccer gloves fit securely with a half-wrap wrist strap. Soft Grip Pro latex in the palm offers cushioning, grip and durability in all weathers. Fingersave spines reinforce the fingers, adding security to every catch and throw.',60.00,504,1),(10,'Predator Pro Goalkeeper Gloves Kids',7,'CUSHIONED SOCCER GLOVES FOR CONFIDENT PERFORMANCES BETWEEN THE STICKS. Stop shots in their tracks in juniors\' adidas goalkeeper gloves designed to dominate. Made for matches, these Predator Pro gloves have an elastic wrist strap for a customizable fit. On their flexible Mechano backhand, silicone elements help with punching precision. In the palm, URG 2.0 latex grips and cushions for confident keeping until the final whistle.',75.00,213,1),(11,'Copa Pro Goalkeeper Gloves Kids',7,'GRIPPY SOCCER GOALIE GLOVES WITH A CLASSIC FIT AND FEEL. Keep goal in total comfort. These juniors\' adidas Copa Pro goalkeeper gloves come with a classic latex backhand and stretchy wrist strap for a perfect fit. On the palm, URG 2.0 provides superior grip for confident claims. The negative cut ensures a snug fit around the fingers so your handling is always on point.',75.00,542,1),(12,'Predator Match Fingersave Goalkeeper Gloves',7,'EXCEL IN TRAINING AND MATCHES IN THESE REINFORCED GOALIE GLOVES. Stop shots in their tracks in adidas goalkeeper gloves designed to dominate. These Predator Match soccer gloves fit securely with a half-wrap wrist strap. Soft Grip Pro latex in the palm offers cushioning, grip and durability in all weathers. Fingersave spines reinforce the fingers, adding security to every catch and throw.',60.00,68,1),(13,'Copa Club Goalkeeper Gloves',7,'FOOTBALL GLOVES WITH A POSITIVE FINGER CUT AND A CLASSIC FIT AND FEEL. Keep goal in total comfort. These adidas Copa Club goalkeeper gloves come with a flexible backhand for a traditional feel and an elastic half-wrap wrist strap for a perfect fit. Durable Soft Grip latex in the palm helps with every spectacular parry and confident catch. The fingers have a roomy positive cut for no-distraction keeping.',25.00,714,1),(14,'X Crazyfast+ Firm Ground Cleats',8,'FEATHERWEIGHT CLEATS FOR LIGHTNING MOVEMENT, MADE IN PART WITH RECYCLED MATERIALS. Engineered for speed, the X isn\'t just fast. It\'s Crazyfast. Built with all the specifications needed to gain that peak acceleration, quick just got quicker.',300.00,367,1),(15,'Predator 24 Elite Low Firm Ground Cleats',8,'GRIPPY CLEATS FOR ACCURACY IN FRONT OF GOAL, MADE IN PART WITH RECYCLED MATERIALS. Predator is crafted for one thing: goals. Packed with the latest goal-scoring technology, get ready to send your swerve, power, and control off the charts.',260.00,673,1),(16,'Predator 24 Elite Turf Cleats',8,'GRIPPY CLEATS FOR ACCURACY IN FRONT OF GOAL, MADE IN PART WITH RECYCLED MATERIALS. The game\'s all about goals, and these soccer cleats are crafted to find the net. Every. Time. Target perfection in all-new adidas Predator. A HybridTouch 2.0 upper delivers supreme flexibility. Strategically placed onto it, rubber Strikeskin fins add biting grip for precision shooting. The low-profile Lightstrike midsole and lug rubber outsole ensure you\'re always ready to strike on artificial turf. This product features at least 20% recycled materials. By reusing materials that have already been created, we help to reduce waste and our reliance on finite resources and reduce the footprint of the products we make.',140.00,275,1),(17,'X Crazyfast Elite Turf Cleats',8,'SUPER-LIGHT CLEATS FOR RAPID SPEEDS, MADE IN PART WITH RECYCLED MATERIALS. Nothing beats the rush of pure speed. Change the game in an instant and leave defenders trailing with lightweight adidas X Crazyfast. Looking slick with a semi-translucent Aeropacity Speedskin upper, these artificial turf soccer cleats include reinforcements only where they\'re needed. A low-profile Lightstrike midsole keeps you acting on instinct. This product features at least 20% recycled materials. By reusing materials that have already been created, we help to reduce waste and our reliance on finite resources and reduce the footprint of the products we make.',140.00,338,1),(18,'Copa Pure II Pro Firm Ground Cleats',8,'LEATHER CLEATS FOR ASSURED SOCCER, MADE IN PART WITH RECYCLED MATERIALS. To truly run a game, you need to keep your teammates close and the ball closer. Find the freedom to conduct play in comfortable, classy adidas Copa Pure II. Built for soccer purists, these cleats deliver a classic feel and modern performance. The Fusionskin leather forefoot offers a cushioned touch. A specialist outsole adds solid traction on firm ground. This product features at least 20% recycled materials. By reusing materials that have already been created, we help to reduce waste and our reliance on finite resources and reduce the footprint of the products we make.',140.00,856,1),(19,'Spain 24 Home Jersey',6,'A JERSEY IN SPAIN\'S HOME COLORS, MADE WITH RECYCLED MATERIALS. Their soccer roots run deep. Inspired by the beauty of Spain\'s national flower and the rhythmical movement of ocean waves, this adidas Spain home jersey displays an eye-catching tonal graphic. Built for supporter comfort and pride, it teams moisture-managing AEROREADY with a woven badge and carnation sign-off. This product is made with 100% recycled materials. By reusing materials that have already been created, we help to reduce waste and our reliance on finite resources and reduce the footprint of the products we make.',100.00,282,1),(20,'Argentina 2024 Messi Home Authentic Jersey',6,'OFFICIAL SOCCER JERSEY WITH ARGENTINEAN CREST AND 3-STRIPES. Strike a fresh new look to celebrate an epic legacy. Designed for pro players, the Authentic collection fuses high-tech features and bold design to bring a vibrant twist to the game. Introducing the iconic national symbols in a modern silhouette, the Argentina 2024 Home Authentic Jersey cheers the fiery enthusiasm that distinguishes La Albiceleste\'s fans. With the unmistakable white and blue setting the tone, this slim-fit jersey is crafted from a lightweight fabric that sits comfortably on your skin. Using advanced materials, adidas HEAT.RDY maximizes air flow so you can feel cool and fresh while embracing the energy of the crowds. This product is made with at least 70% recycled materials. By reusing materials that have already been created, we help to reduce waste and our reliance on finite resources.',180.00,814,1),(21,'Germany 2024 Away Authentic Jersey',6,'OFFICIAL SCOOER JERSEY WITH GERMAN CREST AND 3-STRIPES. Strike a fresh new look to celebrate an epic legacy. Designed for pro players, the Authentic collection fuses high-tech features and bold design to bring a vibrant twist to the game. Bridging the gap between tradition and the future, the Germany 2024 Away Authentic Jersey draws inspiration from Germany\'s national symbols, infusing them with a modern flair to reflect heritage and style. Step on the field like a champion, knowing that this professional jersey has you covered. Crafted from a lightweight fabric with quick-dry capability, the HEAT.RDY construction maximizes airflow and makes you feel cool, ensuring comfort as you score that last-minute goal and take back the game. This product is made with at least 60% recycled materials. By reusing materials that have already been created, we help to reduce waste and our reliance on finite resources.',150.00,241,1),(22,'Belgium 2024 Home Authentic Jersey',6,'OFFICIAL SOCCER JERSEY WITH BELGIUM CREST AND 3-STRIPES. Strike a fresh new look to celebrate an epic legacy. Designed for pro players, the Authentic collection fuses high-tech features and bold design to bring a vibrant twist to the game. With an aesthetic inspired by Belgium\'s architecture and fashion, this modern jersey recreates soccer\'s narrative while nodding to tradition. Enjoy the lively energy of a color-block tee that suits you any day. The Belgium 2024 Home Authentic Jersey lends geometric patterns from the Royal Belgian Football Association to build a premium, unexpected look. A blend of functionality and style, this piece has HEAT.RDY to keep you feeling dry and comfortable as you score another victory. By choosing recycled, we are able to reuse materials that have already been created, which helps to reduce waste and our reliance on finite resources.',150.00,735,1),(23,'Italy 2024 Home Authentic Jersey',6,'OFFICIAL SOCCER JERSEY WITH ITALIAN CREST AND 3-STRIPES. Strike a fresh new look to celebrate an epic legacy. Designed for pro players, the Authentic collection fuses high-tech features and bold design to bring a vibrant twist to the game. Soccer pride meets sophistication in the Italy 2024 Home Authentic Jersey, a premium creation embodied in Italian glory. Cut in a slim fit for a defined silhouette; the jersey carries the famous Italian crest as a symbol of proud soccer history. Its soft, breathable fabric ensures maximum comfort as your day goes by, and HEAT.RDY keeps you feeling dry whether you\'re in the stadium or on the pitch. By choosing recycled, we are able to reuse materials that have already been created, which helps to reduce waste and our reliance on finite resources.',150.00,962,1),(24,'MLS 24 Competition NFHS Ball',5,'A QUALITY MATCH BALL THAT MARKS A HISTORIC MOMENT IN US SOCCER HISTORY. Celebrate the 30th anniversary of the USA\'s most prestigious soccer event. This adidas Competition ball takes its design inspiration from the MLS official match ball. From its thermally bonded seamless construction to its resilient butyl bladder, it\'s designed to bring high performance to the biggest matches.',150.00,615,1),(25,'MLS 24 Pro Ball',5,'MARK A HISTORIC SOCCER MOMENT WITH THE OFFICIAL MATCH BALL OF MLS. Celebrate the 30th anniversary of the USA\'s most prestigious soccer event. The official match ball of Major League Soccer, this adidas Pro ball displays a bold design inspired by the colors of the beautiful game. Built for performance, it has a thermally bonded seamless construction and butyl bladder. It meets FIFA\'s highest standards so you can unleash your skills with confidence.',150.00,178,1),(26,'Messi Club Ball',5,'A DURABLE ADIDAS BALL FOR SHOWING MAGICAL SKILLS DURING RECREATIONAL PLAY. Your beautiful game will shine when this Messi Club soccer is at your feet. Created for the Argentina number 10\'s biggest fans, it shows off Lionel Messi details and the colors of his world champion side. Behind those eye-catching graphics, a machine-stitched TPU surface and resilient butyl bladder ensure it always comes back for more.',40.00,25,1),(27,'UCL Pro 23/24 Knockout Ball',5,'THE OFFICIAL MATCH BALL USED IN THE UCL 23/24 KNOCKOUT STAGES. The pride of London. The vibrant lion-inspired graphics on this adidas UCL Pro soccer ball highlight the powerful, courageous and majestic symbol of the competition hosts. The ball used during the knockout stages of the 23/24 UEFA Champions League, it\'s made for big match moments with a thermally bonded seamless construction and high-grade butyl bladder. Take it onto the pitch and show your champion credentials.',150.00,573,1),(28,'Fussballliebe Mini Ball',5,'A SCALED-DOWN BALL INSPIRED BY THE BIG TOURNAMENT IN GERMANY. When you\'re honing your soccer skills, this adidas Fussballliebe mini ball is your perfect sidekick. Made for pinpoint play, its smooth TPU surface withstands powerful strikes and the foam core means there\'s no need for a pump. Emblazoned with a design inspired by the official match ball of Europe\'s biggest international tournament, this diminutive ball lets you celebrate the beautiful game wherever you go.',30.00,798,1),(29,'Nike Vapor Grip3',7,'Rain or shine, the game goes on. A weather-resistant outer texture helps to make the catch in both wet and dry days. Grip3 technology helps to keep your fingers shielded with wrap-around foam. Shown: Black/White/Metallic Gold Coin Style: FB2999-011',132.00,281,1),(30,'Nike Vapor',7,'Your eyes stay on the ball as it races towards you, and with a quick kick it\'s flying your way. Make the grab with gloves designed to protect your handsâ€”and the win. Grip3 technology adds protective foam around your fingers to help shield your hands during the game. All Conditions Control technology provides gripping action in any weather condition. Shown: Black/White/Metallic Gold Coin Style: FD5766-011',160.00,984,1),(31,'Nike Match',7,'Get ready for whatever comes your way on the pitch. Latex foam helps to absorb impact every time you snag the ball, and a wide wrist strap helps keep you comfortable and secure through each match. Shown: White/Pure Platinum/Black Style: FJ4862-100',32.00,102,1),(32,'Nike Match Jr.',7,'Your rival team is running toward you with the ball. Are you ready? With foam padding for cushioning where you need it most, these gloves have a smooth palm that helps you perform your best in various conditions. Pull \'em on and stay ready for whatever the next game has in store. Shown: Black/Dark Grey/White Style: FJ4864-011',27.00,522,1),(33,'Paris Saint-Germain HyperWarm',7,'The Paris Saint-Germain HyperWarm Gloves are made with a warm material so you can stay focused on cold game days. Textured areas help you grip the ball better for quick restarts and throw-ins. Shown: Black/Black/White Style: DC4182-010',24.97,311,1),(34,'Nike Maestro',5,'It\'s game time. Easy to see, high-contrast graphics pair with a premium textured casing and a smaller, heavier design than outdoor versions to create the optimal ball for futsal play. Shown: Coconut Milk/Multi-Color/White Style: FJ5547-113',27.00,969,1),(35,'Premier League Academy',5,'You never stop improving your skills, so use the ball that works as hard as you do. The bright graphic features are easy to see on the pitch while you\'re practicing your footwork, and its innovative grooves create a consistent spin for that airborne shot towards the goal. Shown: White/Metallic Gold Star/Black Style: FB2985-106',37.00,933,1),(36,'CR7\'s academy soccer ball',5,'Take your play to the next level with the CR7 Soccer Ball. Molded grooves help disrupt airflow for less drag and a more stable flight as it soars through the air toward your next goal. Shown: Green Strike/Stadium Green/Black Style: FN4327-398',32.00,757,1),(37,'Nike Skills',5,'Take your game to the next level with the Nike Skills Soccer Ball. It\'s smaller in size, making it ideal for practicing and developing your footwork. Shown: White/Bright Crimson/Black Style: DC2391-100',14.97,978,1),(38,'Premier League Flight',5,'Meet the ball made to withstand it all. Molded grooves for less drag, a grippy texture for control in any weatherâ€”all built in so you can excel on the pitch every time you play. Shown: White/Fierce Purple/White Style: FB2979-101',167.00,627,1),(39,'Brazil Essential',2,'It\'s a classic Nike tee with a little Brazil twist. What more could a fan want? Colour Shown: Dynamic Yellow Style: FV9377-740',45.00,190,1),(40,'Chelsea F.C. 2023/24 Stadium Away',2,'Who doesn\'t love an early 2000s throwback? Coming to you all the way from 2002, the 2023/24 Chelsea Away kit mixes classic colours and an all-over digital graphic with blue accents on the collar and sleeves. Inside, you will find a hidden London Chelsea F.C. design on the inner pride. Our Stadium collection pairs replica design details with sweat-wicking technology to give you a game-ready look inspired by your favourite team. Colour Shown: Soar/Club Gold/White Style: DX2683-428',115.00,51,1),(41,'Brazil 2024 Stadium Away',2,'The Brazil 2024 Away kit honours the chaotic natural beauty found in its beaches and jungles. Its intricate all-over print nods to the colours and shapes of the country\'s coastlines. Look inside the shirt for a hidden detail celebrating national pride. Colour Shown: Soar/Light Retro/Dynamic Yellow Style: FJ4283-458',115.00,666,1),(42,'LeBron x Liverpool F.C.',2,'Football and basketball collide in this comfortable cotton tee. With a design inspired by LeBron James and Liverpool F.C., it celebrates the King\'s ownership stake in the Reds. Dropped shoulders, longer sleeves and a roomy fit through the body and hips give the Max90 tee a relaxed and casual look. Colour Shown: Light Orewood Brown/Truly Gold Style: FQ6590-104',59.00,193,1),(43,'Liverpool F.C. Strike',2,'With design details specifically tailored for football\'s rising stars, a slim, streamlined fit ensures that nothing comes between you and the ball. Sweat-wicking technology helps keep you cool and composed while you fine-tune your skills. Colour Shown: Gym Red/Anthracite/Wolf Grey Style: FD7084-688',69.00,942,1),(44,'Nike Superfly 9 Elite Mercurial Dream Speed',3,'Cristiano Ronaldo wouldn\'t be the competitor he is without setbacks. Made for those obsessed with the game, this version of the Superfly 9 Elite has disruptive ripples that signify the sagas we endure while energetic greens represent the breakthrough that arises when we overcome obstacles. You also get a football-specific Air Zoom unit, so you can put the pedal down in the waning minutes of a match—when it matters most. Colour Shown: Green Strike/Stadium Green/Black Style: FJ7186-300',425.00,157,1),(45,'Nike Vapor 15 Elite Mercurial Dream Speed',3,'Cristiano Ronaldo wouldn\'t be the competitor he is without setbacks. Made for those obsessed with the game, this version of the Vapor 15 Elite has disruptive ripples that signify the sagas we endure, while energetic greens represent the breakthrough that arises when we overcome obstacles. You also get a football-specific Air Zoom unit, so you can put the pedal down in the waning minutes of a match—when it matters most. Colour Shown: Green Strike/Stadium Green/Black Style: FJ7196-300',369.00,923,1),(46,'Nike Vapor 15 Academy Mercurial Dream Speed',3,'Cristiano Ronaldo wouldn\'t be the competitor he is without setbacks. Made to help take your game to the next level, this version of the Vapor 15 Academy has disruptive ripples that signify the sagas we endure while energetic greens represent the breakthrough that arises when we overcome obstacles. You also get an Air Zoom unit, so you can put the pedal down in the waning minutes of a match—when it matters most. Colour Shown: Green Strike/Stadium Green/Black Style: FJ7200-300',149.00,170,1),(47,'Nike Superfly 9 Academy Mercurial Dream Speed',3,'Cristiano Ronaldo wouldn\'t be the competitor he is without setbacks. Made to help take your game to the next level, this version of the Superfly 9 Academy has disruptive ripples that signify the sagas we endure while energetic greens represent the breakthrough that arises when we overcome obstacles. You also get an Air Zoom unit, so you can put the pedal down in the waning minutes of a match—when it matters most. Colour Shown: Green Strike/Stadium Green/Black Style: FJ7190-300',169.00,53,1),(48,'Nike Vapor 15 Academy Mercurial Dream Speed',3,'Cristiano Ronaldo wouldn\'t be the competitor he is without setbacks. Made to help take your game to the next level, this version of the Vapor 15 Academy has disruptive ripples that signify the sagas we endure while energetic greens represent the breakthrough that arises when we overcome obstacles. You also get an Air Zoom unit, so you can put the pedal down in the waning minutes of a match—when it matters most. Colour Shown: Green Strike/Stadium Green/Black Style: FJ7191-300',149.00,738,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewimages`
--

DROP TABLE IF EXISTS `reviewimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviewimages` (
  `Id` int NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `reviewId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `order_product_product_id_fk_idx` (`reviewId`),
  CONSTRAINT `order_product_product_id_fk` FOREIGN KEY (`reviewId`) REFERENCES `reviews` (`reviewId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewimages`
--

LOCK TABLES `reviewimages` WRITE;
/*!40000 ALTER TABLE `reviewimages` DISABLE KEYS */;
INSERT INTO `reviewimages` VALUES (1,'laptop_review.jpg',1),(2,'smartphone_review.jpg',2),(3,'tshirt_review.jpg',3),(4,'novel_review.jpg',4);
/*!40000 ALTER TABLE `reviewimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewId` int NOT NULL AUTO_INCREMENT,
  `productId` int DEFAULT NULL,
  `customerId` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `reviewComment` text,
  `reviewDate` date DEFAULT NULL,
  `helpfulVotes` int DEFAULT NULL,
  PRIMARY KEY (`reviewId`),
  KEY `productId` (`productId`),
  KEY `customerId` (`customerId`) /*!80000 INVISIBLE */,
  FULLTEXT KEY `comment` (`reviewComment`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customer_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,1,5,'Excellent laptop!','2024-01-15',10),(2,2,2,4,'Great smartphone!','2024-02-15',5),(3,3,3,3,'Average T-shirt','2024-03-15',2),(4,4,4,5,'Fantastic novel!','2024-04-15',8);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(45) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Updated_at` datetime NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','2024-05-18 21:05:59','2024-05-18 21:05:59'),(2,'Customer','2024-05-18 21:05:59','2024-05-18 21:05:59'),(3,'Vendor','2024-05-18 21:05:59','2024-05-18 21:05:59'),(4,'Guest','2024-05-18 21:05:59','2024-05-18 21:05:59');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `salesreport`
--

DROP TABLE IF EXISTS `salesreport`;
/*!50001 DROP VIEW IF EXISTS `salesreport`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `salesreport` AS SELECT 
 1 AS `orderDate`,
 1 AS `catname`,
 1 AS `productname`,
 1 AS `total_quantity_sold`,
 1 AS `total_sales_amount`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `ticketId` int NOT NULL AUTO_INCREMENT,
  `eventName` varchar(255) NOT NULL,
  `eventDate` date DEFAULT NULL,
  `venue` varchar(50) DEFAULT NULL,
  `ticketPrice` decimal(10,2) DEFAULT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `customerId` int NOT NULL,
  PRIMARY KEY (`ticketId`,`customerId`),
  KEY `ticket_customer_Id_fk_idx` (`customerId`),
  CONSTRAINT `ticket_customer_Id_fk` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customer_Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,'Concert A','2024-05-01','Venue 1',50.00,1,1),(2,'Concert B','2024-06-01','Venue 2',60.00,1,2),(3,'Concert C','2024-07-01','Venue 3',70.00,1,3),(4,'Concert D','2024-08-01','Venue 4',80.00,1,4);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_blacklistedtoken`
--

DROP TABLE IF EXISTS `token_blacklist_blacklistedtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_id` (`token_id`),
  CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_blacklistedtoken`
--

LOCK TABLES `token_blacklist_blacklistedtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_outstandingtoken`
--

DROP TABLE IF EXISTS `token_blacklist_outstandingtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` int DEFAULT NULL,
  `jti` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  KEY `token_blacklist_outs_user_id_83bc629a_fk_auth_user` (`user_id`),
  CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_outstandingtoken`
--

LOCK TABLES `token_blacklist_outstandingtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trips`
--

DROP TABLE IF EXISTS `trips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trips` (
  `tripId` int NOT NULL AUTO_INCREMENT,
  `eventId` int DEFAULT NULL,
  `departureDate` date DEFAULT NULL,
  `returnDate` date DEFAULT NULL,
  `eventDescription` text,
  `destination` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`tripId`),
  KEY `trips_ibfk_2` (`eventId`),
  CONSTRAINT `trips_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `tickets` (`ticketId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trips`
--

LOCK TABLES `trips` WRITE;
/*!40000 ALTER TABLE `trips` DISABLE KEYS */;
INSERT INTO `trips` VALUES (1,1,'2024-04-29','2024-05-02',NULL,NULL),(2,2,'2024-05-29','2024-06-02',NULL,NULL),(3,3,'2024-06-29','2024-07-02',NULL,NULL),(4,4,'2024-07-29','2024-08-02',NULL,NULL);
/*!40000 ALTER TABLE `trips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(60) DEFAULT NULL,
  `status` enum('active','blocked','inactive') NOT NULL DEFAULT 'active',
  `role_id` int DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `user_role_id_fk_idx` (`role_id`),
  CONSTRAINT `user_role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','password',NULL,'active',1,'2024-05-18 03:00:00'),(2,'johndoe','password',NULL,'active',2,'2024-05-18 02:30:00'),(3,'janedoe','password',NULL,'active',2,'2024-05-18 04:15:00'),(4,'vendor','password',NULL,'active',3,'2024-05-18 01:45:00'),(5,'maria','password',NULL,'active',1,'2024-05-18 01:46:00'),(6,'john_doe','password123','john_doe@example.com','active',1,'2024-05-20 01:30:00'),(7,'jane_smith','abc@123','jane_smith@example.com','active',2,'2024-05-19 05:45:00'),(8,'alice_johnson','p@ssW0rd','alice_johnson@example.com','active',3,'2024-05-18 09:20:00'),(9,'bob_brown','securePassword','bob_brown@example.com','active',1,'2024-05-17 14:10:00'),(10,'emily_davis','123456','emily_davis@example.com','active',2,'2024-05-16 02:55:00'),(11,'michael_wilson','password','michael_wilson@example.com','active',3,'2024-05-15 07:30:00'),(12,'olivia_martin','qwerty','olivia_martin@example.com','active',1,'2024-05-14 11:40:00'),(13,'william_anderson','letmein','william_anderson@example.com','active',2,'2024-05-13 00:25:00'),(14,'ava_thompson','football','ava_thompson@example.com','active',3,'2024-05-12 03:50:00'),(15,'james_hernandez','baseball','james_hernandez@example.com','active',1,'2024-05-11 08:15:00'),(16,'sophia_miller','password123','sophia_miller@example.com','active',2,'2024-05-10 13:05:00'),(17,'benjamin_garcia','abcdef','benjamin_garcia@example.com','active',3,'2024-05-08 22:30:00'),(18,'mia_martinez','test123','mia_martinez@example.com','active',1,'2024-05-08 04:20:00'),(19,'logan_lopez','example','logan_lopez@example.com','active',2,'2024-05-07 06:45:00'),(20,'elijah_taylor','password1234','elijah_taylor@example.com','active',3,'2024-05-06 10:55:00'),(21,'amelia_adams','password12345','amelia_adams@example.com','active',1,'2024-05-05 15:35:00'),(22,'oliver_lewis','password123456','oliver_lewis@example.com','active',2,'2024-05-03 20:20:00'),(23,'emma_hall','password1234567','emma_hall@example.com','active',3,'2024-05-03 01:10:00'),(24,'henry_young','password12345678','henry_young@example.com','active',1,'2024-05-02 05:45:00'),(25,'ava_gonzalez','password123456789','ava_gonzalez@example.com','active',2,'2024-05-01 11:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db'
--

--
-- Dumping routines for database 'db'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_contact_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_contact_details`(
    IN user_id        INT,
    IN address_id     INT,
    IN city           VARCHAR(45),
    IN state          VARCHAR(45),
    IN country        VARCHAR(45),
    IN zipcode        TINYINT,
    IN street         TEXT
)
BEGIN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    INSERT INTO contact_detail VALUES (
        user_id,
        address_id,
        city,
        state,
        country,
        zipcode,
        street
    );

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_product` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_product`(
	IN product_id 		   INT,
    IN name                VARCHAR(120),
    IN price               DECIMAL(10,2),
    IN category_id         INT,
    IN description         TEXT,
    IN quantity     INT,
    IN image_url           VARCHAR(45)
)
BEGIN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    INSERT INTO product VALUES (
        name,
        category_id,
        description,
        price,
        quantity
    );

    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    INSERT INTO productimages VALUES (
        product_id,
        image_url
    );

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_to_shopping_cart` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_to_shopping_cart`(
    IN customer_id       INT,
    IN product_id     INT,
    IN quantity       INT
)
BEGIN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    INSERT INTO cart VALUES (
        customer_id,
        product_id,
        quantity,
        sysdate()
    );

    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_to_wish_list` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_to_wish_list`(
    IN customer_id       INT,
    IN product_id     INT
)
BEGIN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    INSERT INTO wishlist VALUES (
        customer_id,
        product_id,
        sysdate()
    );


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getBestSaleProduct` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getBestSaleProduct`()
BEGIN

SELECT* 
FROM products
WhERE productID = (
SELECT productID
FROM history H
GROUP BY productID
HAVING SUM(quantity) = (
    SELECT MAX(TotalNumber) AS M_Value
    FROM (
        SELECT SUM(quantity) AS TotalNumber, productId
        FROM history
        GROUP BY productID
    ) AS temp
)
);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTicketById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTicketById`( IN id INT)
BEGIN
SELECT* FROM tickets
WHERE ticketID = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTripById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTripById`( IN id INT)
BEGIN
SELECT* FROM TRIPS
WHERE tripID = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTripByInfos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTripByInfos`( IN eName VARCHAR(255),IN departDate date, IN reDate date, IN dest VARCHAR(60))
BEGIN
SELECT* FROM TRIPS TR
INNER JOIN TICKETS TI ON TI.ticketID = TR.eventID
WHERE TR.departureDate = departDate OR TR.returnDate = reDate OR TR.destination = dest OR TI.eventName=eName; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTripByInfos2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTripByInfos2`( IN ev_ID INT,IN price INT)
BEGIN
SELECT* FROM TRIPS TR
INNER JOIN TICKETS TI ON TI.ticketID = TR.eventID
WHERE TR.eventID = ev_ID OR TI.ticketPrice = price;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `give_review` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `give_review`(
    IN review_id      INT,
    IN product_id     INT,
    IN customer_id    INT,
    IN review         TEXT,
    IN rating         INT,
    IN helpfulVotes   INT,
    IN image_url      VARCHAR(255)
)
BEGIN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    INSERT INTO review(productId,customerId,rating, reviewComment,reviewDate,helpfulVotes) VALUES (
        product_id,
        customer_id,
        rating,
        review,
        sysdate(),
        helpfulVotes
    );

    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    INSERT INTO reviewimages(imageUrl,reviewId) VALUES (
        image_url,
        reviewId
    );

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `register_customer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `register_customer`(
    IN email        VARCHAR(60),
    IN username     VARCHAR(60),
    IN fname        VARCHAR(60),
    IN lname        VARCHAR(60),
    IN password     VARCHAR(60),
    IN phone        VARCHAR(15)
)
BEGIN
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    INSERT INTO users(username,password,email,role_id) VALUES (
        username,
        password,
        email,
        1
    );

    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    INSERT INTO customers(customer_fname,customer_lname,phone) VALUES (
        fname,
        lname,
        phone
    );

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `productcatalog`
--

/*!50001 DROP VIEW IF EXISTS `productcatalog`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `productcatalog` AS select `p`.`id` AS `id`,`p`.`productName` AS `productName`,`p`.`description` AS `description`,`c`.`catName` AS `catname`,`p`.`price` AS `price`,`pi`.`imageUrl` AS `imageUrl` from ((`products` `p` join `categories` `c` on((`p`.`catId` = `c`.`catId`))) join `productimages` `pi` on((`p`.`id` = `pi`.`productId`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `salesreport`
--

/*!50001 DROP VIEW IF EXISTS `salesreport`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `salesreport` AS select `o`.`orderDate` AS `orderDate`,`c`.`catName` AS `catname`,`p`.`productName` AS `productname`,sum(`op`.`quantity`) AS `total_quantity_sold`,sum((`op`.`price` * `op`.`quantity`)) AS `total_sales_amount` from (((`orders` `o` join `orderproducts` `op` on((`o`.`orderId` = `op`.`orderId`))) join `products` `p` on((`op`.`productId` = `p`.`id`))) join `categories` `c` on((`p`.`catId` = `c`.`catId`))) group by `o`.`orderDate`,`c`.`catName`,`p`.`productName` order by `o`.`orderDate` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-20 20:34:56
