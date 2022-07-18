-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 12 juil. 2022 à 08:30
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `meazay`
--

-- --------------------------------------------------------

--
-- Structure de la table `data_tbl`
--

DROP TABLE IF EXISTS `data_tbl`;
CREATE TABLE IF NOT EXISTS `data_tbl` (
  `dta_id` int(11) NOT NULL AUTO_INCREMENT,
  `dta_date` date NOT NULL,
  `dta_content` json NOT NULL,
  `dta_tool` int(11) NOT NULL,
  `dta_user` int(11) NOT NULL,
  PRIMARY KEY (`dta_id`),
  KEY `dta_tool` (`dta_tool`),
  KEY `dta_user` (`dta_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `images_tbl`
--

DROP TABLE IF EXISTS `images_tbl`;
CREATE TABLE IF NOT EXISTS `images_tbl` (
  `img_id` int(11) NOT NULL AUTO_INCREMENT,
  `img_name` varchar(20) NOT NULL,
  `img_path` varchar(40) NOT NULL,
  PRIMARY KEY (`img_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `players_tbl`
--

DROP TABLE IF EXISTS `players_tbl`;
CREATE TABLE IF NOT EXISTS `players_tbl` (
  `ply_id` int(11) NOT NULL AUTO_INCREMENT,
  `ply_role` int(11) NOT NULL,
  `ply_avatar` int(11) NOT NULL,
  `ply_user` int(11) NOT NULL,
  PRIMARY KEY (`ply_id`),
  KEY `ply_role` (`ply_role`),
  KEY `ply_avatar` (`ply_avatar`),
  KEY `ply_user` (`ply_user`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `plugins_tbl`
--

DROP TABLE IF EXISTS `plugins_tbl`;
CREATE TABLE IF NOT EXISTS `plugins_tbl` (
  `plg_id` int(11) NOT NULL AUTO_INCREMENT,
  `plg_name` varchar(20) NOT NULL,
  `plg_description` varchar(200) NOT NULL,
  `plg_path` varchar(30) NOT NULL,
  `plg_tool` int(11) NOT NULL,
  PRIMARY KEY (`plg_id`),
  KEY `plg_tool` (`plg_tool`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `projects_tbl`
--

DROP TABLE IF EXISTS `projects_tbl`;
CREATE TABLE IF NOT EXISTS `projects_tbl` (
  `prj_id` int(11) NOT NULL AUTO_INCREMENT,
  `proj_name` varchar(30) NOT NULL,
  `prj_description` int(200) NOT NULL,
  `prj_config` json NOT NULL,
  `prj_owner` int(11) NOT NULL,
  `prj_avatar` int(11) NOT NULL,
  PRIMARY KEY (`prj_id`),
  KEY `prj_owner` (`prj_owner`) USING BTREE,
  KEY `prj_avatar` (`prj_avatar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `roles_tbl`
--

DROP TABLE IF EXISTS `roles_tbl`;
CREATE TABLE IF NOT EXISTS `roles_tbl` (
  `rle_id` int(11) NOT NULL AUTO_INCREMENT,
  `rle_name` varchar(20) NOT NULL,
  `rle_description` int(200) NOT NULL,
  PRIMARY KEY (`rle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `tools_tbl`
--

DROP TABLE IF EXISTS `tools_tbl`;
CREATE TABLE IF NOT EXISTS `tools_tbl` (
  `too_id` int(11) NOT NULL AUTO_INCREMENT,
  `too_name` varchar(20) NOT NULL,
  `too_description` varchar(200) NOT NULL,
  `too_category` int(11) NOT NULL,
  `too_path` varchar(30) NOT NULL,
  `too_project` int(11) NOT NULL,
  PRIMARY KEY (`too_id`),
  KEY `too_project` (`too_project`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `users_tbl`
--

DROP TABLE IF EXISTS `users_tbl`;
CREATE TABLE IF NOT EXISTS `users_tbl` (
  `usr_id` int(11) NOT NULL AUTO_INCREMENT,
  `usr_username` varchar(20) NOT NULL,
  `usr_mail` varchar(50) NOT NULL,
  `usr_password` varchar(255) NOT NULL,
  `usr_permissions` tinyint(1) NOT NULL,
  `usr_token_iat` int(11) DEFAULT NULL,
  `usr_token_exp` int(11) DEFAULT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users_tbl`
--

INSERT INTO `users_tbl` (`usr_id`, `usr_username`, `usr_mail`, `usr_password`, `usr_permissions`, `usr_token_iat`, `usr_token_exp`) VALUES
(1, 'meax', 'meax@meax.meax', '$argon2i$v=19$m=4096,t=3,p=1$K41GScOKyvm5RisGtu2gsQ$dchK3Rfg/61+QgFVrpU3+dkvjcIV8sPzet7r1HKHU0A', 0, 1657549092, 1657635492),
(4, 'akak', 'ak@ak.ak', '$argon2i$v=19$m=4096,t=3,p=1$IakkYMy5ufrVCHAfQ8CbYw$qmACLnOx53zYhp6F0DW1r4vZSrcse+64XC2lvrVRxu8', 0, 1657548934, 1657635334);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `data_tbl`
--
ALTER TABLE `data_tbl`
  ADD CONSTRAINT `data_tbl_ibfk_1` FOREIGN KEY (`dta_tool`) REFERENCES `tools_tbl` (`too_id`),
  ADD CONSTRAINT `data_tbl_ibfk_2` FOREIGN KEY (`dta_user`) REFERENCES `players_tbl` (`ply_id`);

--
-- Contraintes pour la table `players_tbl`
--
ALTER TABLE `players_tbl`
  ADD CONSTRAINT `players_tbl_ibfk_2` FOREIGN KEY (`ply_avatar`) REFERENCES `images_tbl` (`img_id`),
  ADD CONSTRAINT `players_tbl_ibfk_3` FOREIGN KEY (`ply_user`) REFERENCES `users_tbl` (`usr_id`),
  ADD CONSTRAINT `players_tbl_ibfk_4` FOREIGN KEY (`ply_role`) REFERENCES `roles_tbl` (`rle_id`);

--
-- Contraintes pour la table `plugins_tbl`
--
ALTER TABLE `plugins_tbl`
  ADD CONSTRAINT `plugins_tbl_ibfk_1` FOREIGN KEY (`plg_tool`) REFERENCES `tools_tbl` (`too_id`);

--
-- Contraintes pour la table `projects_tbl`
--
ALTER TABLE `projects_tbl`
  ADD CONSTRAINT `projects_tbl_ibfk_1` FOREIGN KEY (`prj_owner`) REFERENCES `players_tbl` (`ply_id`),
  ADD CONSTRAINT `projects_tbl_ibfk_2` FOREIGN KEY (`prj_avatar`) REFERENCES `images_tbl` (`img_id`);

--
-- Contraintes pour la table `tools_tbl`
--
ALTER TABLE `tools_tbl`
  ADD CONSTRAINT `tools_tbl_ibfk_1` FOREIGN KEY (`too_project`) REFERENCES `projects_tbl` (`prj_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
