-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2022 at 09:45 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crs`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_accounts`
--

CREATE TABLE `t_accounts` (
  `id` int(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `t_accounts`
--

INSERT INTO `t_accounts` (`id`, `username`, `email`, `password`) VALUES
(1, 'admin', '', 'e086cf6476352a6de512faa7ad41c1db');

-- --------------------------------------------------------

--
-- Table structure for table `t_cars`
--

CREATE TABLE `t_cars` (
  `id` int(10) NOT NULL,
  `cars` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `agent` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL,
  `datetime` datetime(6) DEFAULT NULL,
  `datetimeUse` datetime(6) DEFAULT NULL,
  `datetimeReturn` datetime(6) DEFAULT NULL,
  `purpose` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `t_cars`
--

INSERT INTO `t_cars` (`id`, `cars`, `name`, `code`, `agent`, `tel`, `datetime`, `datetimeUse`, `datetimeReturn`, `purpose`) VALUES
(1, '0001', 'Tester 1', '0000001', 'SPEC', '0123456789', '2022-02-17 09:05:03.000000', '2022-02-17 09:00:00.000000', '2022-02-17 12:00:00.000000', '-'),
(2, '0002', 'Tester 2', '0000002', 'SPEC', '0123456789', '2022-02-17 09:06:14.000000', '2022-02-17 08:00:00.000000', '2022-02-17 14:00:00.000000', '-'),
(3, '0002', 'Tester 3', '0000003', 'SPEC', '0123456789', '2022-02-17 09:21:30.000000', '2022-02-17 14:00:00.000000', '2022-02-17 15:00:00.000000', '-'),
(4, '0002', 'Tester 3', '0000003', 'SPEC', '0123456789', '2022-02-17 09:37:24.000000', '2022-02-17 15:00:00.000000', '2022-02-17 16:00:00.000000', '-'),
(5, '0001', 'Tester 1', '0000001', 'SPEC', '0123456789', '2022-02-17 11:07:09.000000', '2022-02-17 12:00:00.000000', '2022-02-17 16:00:00.000000', '-'),
(6, '0001', 'Tester 1', '0000001', 'SPEC', '0123456789', '2022-02-17 11:08:41.000000', '2022-02-17 16:00:00.000000', '2022-02-17 17:59:00.000000', '-'),
(7, '0002', 'Tester 2', '0000002', 'SPEC', '0123456789', '2022-02-17 16:12:13.000000', '2022-02-17 16:00:00.000000', '2022-02-17 17:00:00.000000', '-'),
(8, '0002', 'Tester 2', '0000002', 'SPEC', '0123456789', '2022-02-17 16:13:23.000000', '2022-02-17 17:00:00.000000', '2022-02-17 18:00:00.000000', '-'),
(9, '0002', 'Tester 2', '0000002', 'SPEC', '0123456789', '2022-02-17 16:13:48.000000', '2022-02-17 18:00:00.000000', '2022-02-17 19:00:00.000000', '-'),
(10, '0002', 'Tester 4', '0000004', 'SPEC', '0123456789', '2022-02-17 16:17:41.000000', '2022-02-17 07:00:00.000000', '2022-02-17 08:00:00.000000', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t_cars_logger`
--

CREATE TABLE `t_cars_logger` (
  `id` int(10) NOT NULL,
  `cars` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `agent` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL,
  `datetime` datetime(6) DEFAULT NULL,
  `datetimeUse` datetime(6) DEFAULT NULL,
  `datetimeReturn` datetime(6) DEFAULT NULL,
  `purpose` varchar(100) NOT NULL,
  `action` varchar(100) NOT NULL,
  `parking` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `t_cars_logger`
--

INSERT INTO `t_cars_logger` (`id`, `cars`, `name`, `code`, `agent`, `tel`, `datetime`, `datetimeUse`, `datetimeReturn`, `purpose`, `action`, `parking`) VALUES
(1, '0001', 'Tester 1', '0000001', 'SPEC', '0123456789', '2022-02-17 09:05:03.000000', '2022-02-17 09:00:00.000000', '2022-02-17 12:00:00.000000', '-', 'booking', '-'),
(2, '0002', 'Tester 2', '0000002', 'SPEC', '0123456789', '2022-02-17 09:06:14.000000', '2022-02-17 08:00:00.000000', '2022-02-17 14:00:00.000000', '-', 'booking', '-'),
(3, '0002', 'Tester 3', '0000003', 'SPEC', '0123456789', '2022-02-17 09:21:30.000000', '2022-02-17 14:00:00.000000', '2022-02-17 15:00:00.000000', '-', 'booking', '-'),
(4, '0002', 'Tester 3', '0000003', 'SPEC', '0123456789', '2022-02-17 09:37:24.000000', '2022-02-17 15:00:00.000000', '2022-02-17 16:00:00.000000', '-', 'booking', '-'),
(5, '0001', 'Tester 1', '0000001', 'SPEC', '0123456789', '2022-02-17 11:07:09.000000', '2022-02-17 12:00:00.000000', '2022-02-17 16:00:00.000000', '-', 'booking', '-'),
(6, '0001', 'Tester 1', '0000001', 'SPEC', '0123456789', '2022-02-17 11:08:41.000000', '2022-02-17 16:00:00.000000', '2022-02-17 17:59:00.000000', '-', 'booking', '-'),
(7, '0002', 'Tester 2', '0000002', 'SPEC', '0123456789', '2022-02-17 16:12:13.000000', '2022-02-17 16:00:00.000000', '2022-02-17 17:00:00.000000', '-', 'booking', '-'),
(8, '0002', 'Tester 2', '0000002', 'SPEC', '0123456789', '2022-02-17 16:13:23.000000', '2022-02-17 17:00:00.000000', '2022-02-17 18:00:00.000000', '-', 'booking', '-'),
(9, '0002', 'Tester 2', '0000002', 'SPEC', '0123456789', '2022-02-17 16:13:48.000000', '2022-02-17 18:00:00.000000', '2022-02-17 19:00:00.000000', '-', 'booking', '-'),
(10, '0002', 'Tester 4', '0000004', 'SPEC', '0123456789', '2022-02-17 16:17:41.000000', '2022-02-17 07:00:00.000000', '2022-02-17 08:00:00.000000', '-', 'booking', '-');

-- --------------------------------------------------------

--
-- Table structure for table `t_cars_status`
--

CREATE TABLE `t_cars_status` (
  `id` int(11) NOT NULL,
  `cars` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `blockStart` datetime DEFAULT NULL,
  `blockEnd` datetime DEFAULT NULL,
  `datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `t_cars_status`
--

INSERT INTO `t_cars_status` (`id`, `cars`, `status`, `note`, `blockStart`, `blockEnd`, `datetime`) VALUES
(1, '6298 (รถกระบะ)', 'normal', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2022-02-18 15:39:10'),
(2, '8166 (รถหลังคาสูง)', 'block', 'test', '2022-02-19 00:00:00', '2022-02-20 00:00:00', '2022-02-18 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_accounts`
--
ALTER TABLE `t_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_cars`
--
ALTER TABLE `t_cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_cars_logger`
--
ALTER TABLE `t_cars_logger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_cars_status`
--
ALTER TABLE `t_cars_status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_accounts`
--
ALTER TABLE `t_accounts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `t_cars`
--
ALTER TABLE `t_cars`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `t_cars_logger`
--
ALTER TABLE `t_cars_logger`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `t_cars_status`
--
ALTER TABLE `t_cars_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
