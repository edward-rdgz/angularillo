# Host: localhost  (Version: 5.6.16)
# Date: 2014-11-13 11:28:13
# Generator: MySQL-Front 5.3  (Build 4.128)

/*!40101 SET NAMES utf8 */;
create compras;
use compras;
#
# Structure for table "producto"
#

DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_nombre` varchar(255) NOT NULL,
  `prod_desc` text NOT NULL,
  `prod_precio` int(11) NOT NULL,
  `prod_cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Data for table "producto"
#

/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
