-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2023 at 05:10 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_edom`
--

-- --------------------------------------------------------

--
-- Table structure for table `table_dosen`
--

CREATE TABLE `table_dosen` (
  `dosen_id` int(11) NOT NULL,
  `dosen_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_dosen`
--

INSERT INTO `table_dosen` (`dosen_id`, `dosen_name`) VALUES
(1, 'Anggi Mardiyono S.pD'),
(3, 'Mera Kartika S.pD');

-- --------------------------------------------------------

--
-- Table structure for table `table_kbm`
--

CREATE TABLE `table_kbm` (
  `kbm_id` int(11) NOT NULL,
  `kbm_kelas` int(3) NOT NULL,
  `kbm_dosen` int(3) NOT NULL,
  `kbm_matkul` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_kbm`
--

INSERT INTO `table_kbm` (`kbm_id`, `kbm_kelas`, `kbm_dosen`, `kbm_matkul`) VALUES
(1, 2, 1, 1),
(2, 2, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `table_kelas`
--

CREATE TABLE `table_kelas` (
  `kelas_id` int(11) NOT NULL,
  `kelas_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_kelas`
--

INSERT INTO `table_kelas` (`kelas_id`, `kelas_name`) VALUES
(1, 'TI 8A'),
(2, 'TI 8B');

-- --------------------------------------------------------

--
-- Table structure for table `table_matkul`
--

CREATE TABLE `table_matkul` (
  `matkul_id` int(11) NOT NULL,
  `matkul_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_matkul`
--

INSERT INTO `table_matkul` (`matkul_id`, `matkul_name`) VALUES
(1, 'Algoritma Pemograman'),
(2, 'Metodologi Penelitian\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `table_user`
--

CREATE TABLE `table_user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_password` text NOT NULL,
  `user_kelas` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_user`
--

INSERT INTO `table_user` (`user_id`, `user_email`, `user_name`, `user_password`, `user_kelas`) VALUES
(5, 'rakhaharis080102@gmail.com', 'rakha', '79b49ba37eae7bf6e54d5db3dff30dd74723c3931eae48d275f70212fad4d35886f56311ae992e0b0789d43505a940bdf830950a526db28e13649c511ef79a45', '2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `table_dosen`
--
ALTER TABLE `table_dosen`
  ADD PRIMARY KEY (`dosen_id`);

--
-- Indexes for table `table_kbm`
--
ALTER TABLE `table_kbm`
  ADD PRIMARY KEY (`kbm_id`);

--
-- Indexes for table `table_kelas`
--
ALTER TABLE `table_kelas`
  ADD PRIMARY KEY (`kelas_id`);

--
-- Indexes for table `table_matkul`
--
ALTER TABLE `table_matkul`
  ADD PRIMARY KEY (`matkul_id`);

--
-- Indexes for table `table_user`
--
ALTER TABLE `table_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `table_dosen`
--
ALTER TABLE `table_dosen`
  MODIFY `dosen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `table_kbm`
--
ALTER TABLE `table_kbm`
  MODIFY `kbm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `table_kelas`
--
ALTER TABLE `table_kelas`
  MODIFY `kelas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `table_matkul`
--
ALTER TABLE `table_matkul`
  MODIFY `matkul_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `table_user`
--
ALTER TABLE `table_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
