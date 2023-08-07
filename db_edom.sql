-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2023 at 11:53 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

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
-- Table structure for table `table_answer`
--

CREATE TABLE `table_answer` (
  `answer_id` int(11) NOT NULL,
  `q1` int(1) NOT NULL,
  `q2` int(1) NOT NULL,
  `q3` int(1) NOT NULL,
  `q4` int(1) NOT NULL,
  `q5` int(1) NOT NULL,
  `q6` int(11) NOT NULL,
  `q7` int(11) NOT NULL,
  `q8` int(11) NOT NULL,
  `q9` int(11) NOT NULL,
  `q10` int(11) NOT NULL,
  `q11` int(11) NOT NULL,
  `q12` int(11) NOT NULL,
  `q13` int(11) NOT NULL,
  `q14` int(11) NOT NULL,
  `q15` int(11) NOT NULL,
  `q16` int(11) NOT NULL,
  `q17` int(11) NOT NULL,
  `q18` int(11) NOT NULL,
  `q19` int(11) NOT NULL,
  `q20` int(11) NOT NULL,
  `q21` int(11) NOT NULL,
  `q22` int(11) NOT NULL,
  `q23` int(11) NOT NULL,
  `q24` int(11) NOT NULL,
  `q25` int(11) NOT NULL,
  `q26` int(11) NOT NULL,
  `q27` int(11) NOT NULL,
  `answer_dosen` varchar(3) NOT NULL,
  `answer_user` float NOT NULL,
  `answer_matkul` varchar(100) NOT NULL,
  `answer_semester` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_answer`
--

INSERT INTO `table_answer` (`answer_id`, `q1`, `q2`, `q3`, `q4`, `q5`, `q6`, `q7`, `q8`, `q9`, `q10`, `q11`, `q12`, `q13`, `q14`, `q15`, `q16`, `q17`, `q18`, `q19`, `q20`, `q21`, `q22`, `q23`, `q24`, `q25`, `q26`, `q27`, `answer_dosen`, `answer_user`, `answer_matkul`, `answer_semester`) VALUES
(1, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 5, 5, '8', 86, '32', '2'),
(2, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 5, 5, 5, 5, 4, 4, 4, '18', 86, '31', '2'),
(3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, '1', 61, '20', '2'),
(4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, '14', 92, '77', '2'),
(5, 4, 4, 4, 4, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 4, 5, 5, '1', 3, '3', '2');

-- --------------------------------------------------------

--
-- Table structure for table `table_auth`
--

CREATE TABLE `table_auth` (
  `auth_id` int(11) NOT NULL,
  `auth_email` varchar(100) NOT NULL,
  `auth_key` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_auth`
--

INSERT INTO `table_auth` (`auth_id`, `auth_email`, `auth_key`) VALUES
(48, 'sinan@gmail.com', 'PVkT7f7IkZ'),
(49, 'ando@gmail.com', 'SVjkxGldXE');

-- --------------------------------------------------------

--
-- Table structure for table `table_dosen`
--

CREATE TABLE `table_dosen` (
  `dosen_id` int(11) NOT NULL,
  `dosen_name` varchar(100) NOT NULL,
  `dosen_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_dosen`
--

INSERT INTO `table_dosen` (`dosen_id`, `dosen_name`, `dosen_user`) VALUES
(1, 'Mera Kartika', 2),
(2, 'mauldy', 6),
(3, 'anita', 7),
(4, 'rizki elisa', 8),
(5, 'risna', 9),
(6, 'agus', 10),
(7, 'dewi k', 11),
(8, 'bambang', 12),
(9, 'heikal', 13),
(10, 'ayres', 14),
(11, 'fitri', 15),
(12, 'irawati', 16),
(13, 'iklima', 17),
(14, 'euis', 18),
(15, 'asep', 19),
(16, 'dinda', 20),
(17, 'chandra', 21),
(18, 'anggi', 22),
(19, 'syamsi', 23),
(20, 'defiana', 24),
(21, 'lik', 26),
(22, 'dewiyanti', 27),
(23, 'ratna', 28),
(24, 'basam', 29),
(25, 'hata', 30),
(26, 'herlino', 31),
(27, 'fachroni', 32),
(28, 'yoyok', 33),
(29, 'eriya', 34),
(30, 'asep c', 35),
(31, 'prihatin', 36),
(32, 'ella', 37),
(33, 'ayu', 38),
(34, 'maria', 39),
(35, 'yusuf', 40),
(36, 'andi', 41),
(37, 'indra', 42),
(38, 'nurfauzi', 43),
(39, 'abub', 44),
(40, 'iwan', 45),
(41, 'lisa', 46),
(42, 'mira', 47),
(43, 'wanda', 48),
(44, 'ade', 49),
(45, 'indahsari', 50);

-- --------------------------------------------------------

--
-- Table structure for table `table_jurusan`
--

CREATE TABLE `table_jurusan` (
  `jurusan_id` int(11) NOT NULL,
  `jurusan_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_jurusan`
--

INSERT INTO `table_jurusan` (`jurusan_id`, `jurusan_name`) VALUES
(1, 'Teknik Informatika'),
(2, 'teknik mesin');

-- --------------------------------------------------------

--
-- Table structure for table `table_kajur`
--

CREATE TABLE `table_kajur` (
  `kajur_id` int(11) NOT NULL,
  `kajur_email` varchar(100) NOT NULL,
  `kajur_name` varchar(100) NOT NULL,
  `kajur_jurusan` varchar(100) NOT NULL,
  `kajur_user` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_kajur`
--

INSERT INTO `table_kajur` (`kajur_id`, `kajur_email`, `kajur_name`, `kajur_jurusan`, `kajur_user`) VALUES
(1, 'kajurtik@gmail.com', 'Kajur TIK', '1', '5');

-- --------------------------------------------------------

--
-- Table structure for table `table_kaprodi`
--

CREATE TABLE `table_kaprodi` (
  `kaprodi_id` int(11) NOT NULL,
  `kaprodi_email` varchar(100) NOT NULL,
  `kaprodi_nama` varchar(100) NOT NULL,
  `kaprodi_prodi` varchar(100) NOT NULL,
  `kaprodi_user` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_kaprodi`
--

INSERT INTO `table_kaprodi` (`kaprodi_id`, `kaprodi_email`, `kaprodi_nama`, `kaprodi_prodi`, `kaprodi_user`) VALUES
(1, 'kaproditi@gmail.com', 'Kaprodi TI', '1', '4'),
(2, 'kaproditmd@gmail.com', 'Kaprodi TMD', '2', '91');

-- --------------------------------------------------------

--
-- Table structure for table `table_kbm`
--

CREATE TABLE `table_kbm` (
  `kbm_id` int(11) NOT NULL,
  `kbm_kelas` int(3) NOT NULL,
  `kbm_dosen` int(3) NOT NULL,
  `kbm_matkul` int(3) NOT NULL,
  `kbm_semester` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_kbm`
--

INSERT INTO `table_kbm` (`kbm_id`, `kbm_kelas`, `kbm_dosen`, `kbm_matkul`, `kbm_semester`) VALUES
(1, 1, 2, 2, '2'),
(2, 1, 1, 3, '2'),
(3, 1, 3, 4, '2'),
(4, 1, 4, 5, '2'),
(5, 1, 5, 6, '2'),
(6, 1, 6, 7, '2'),
(7, 1, 7, 8, '2'),
(8, 1, 8, 9, '2'),
(9, 1, 9, 10, '2'),
(20, 1, 10, 11, '2'),
(21, 2, 8, 6, '2'),
(22, 2, 11, 8, '2'),
(23, 2, 2, 2, '2'),
(24, 2, 12, 10, '2'),
(25, 2, 13, 5, '2'),
(26, 2, 14, 7, '2'),
(27, 2, 5, 6, '2'),
(28, 2, 15, 3, '2'),
(29, 2, 16, 11, '2'),
(30, 2, 9, 4, '2'),
(31, 3, 17, 12, '2'),
(32, 3, 18, 13, '2'),
(33, 3, 19, 14, '2'),
(34, 3, 14, 15, '2'),
(35, 3, 20, 16, '2'),
(36, 3, 15, 17, '2'),
(37, 3, 10, 18, '2'),
(38, 3, 4, 19, '2'),
(39, 3, 1, 20, '2'),
(40, 3, 13, 21, '2'),
(41, 4, 18, 13, '2'),
(42, 4, 17, 12, '2'),
(43, 4, 14, 15, '2'),
(44, 4, 19, 14, '2'),
(45, 4, 15, 17, '2'),
(46, 4, 21, 16, '2'),
(47, 4, 22, 19, '2'),
(48, 4, 23, 18, '2'),
(49, 4, 13, 21, '2'),
(50, 4, 4, 20, '2'),
(51, 5, 14, 1, '2'),
(52, 5, 10, 43, '2'),
(53, 5, 16, 24, '2'),
(54, 5, 2, 25, '2'),
(55, 5, 4, 20, '2'),
(56, 5, 24, 26, '2'),
(57, 5, 25, 27, '2'),
(58, 5, 17, 28, '2'),
(59, 5, 26, 29, '2'),
(61, 6, 9, 1, '2'),
(62, 6, 23, 24, '2'),
(63, 6, 24, 26, '2'),
(64, 6, 7, 23, '2'),
(65, 6, 8, 25, '2'),
(66, 6, 1, 20, '2'),
(67, 6, 2, 28, '2'),
(68, 6, 25, 27, '2'),
(69, 6, 27, 29, '2'),
(70, 7, 28, 30, '2'),
(71, 7, 5, 31, '2'),
(72, 7, 29, 32, '2'),
(73, 8, 28, 51, '2'),
(74, 8, 8, 32, '2'),
(75, 8, 18, 31, '2'),
(78, 33, 14, 77, '2'),
(79, 29, 39, 5, '2'),
(80, 29, 44, 7, '2'),
(81, 29, 6, 75, '2');

-- --------------------------------------------------------

--
-- Table structure for table `table_kelas`
--

CREATE TABLE `table_kelas` (
  `kelas_id` int(11) NOT NULL,
  `kelas_semester` int(2) NOT NULL,
  `kelas_subkelas` varchar(10) NOT NULL,
  `kelas_prodi` varchar(4) NOT NULL,
  `kelas_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_kelas`
--

INSERT INTO `table_kelas` (`kelas_id`, `kelas_semester`, `kelas_subkelas`, `kelas_prodi`, `kelas_name`) VALUES
(1, 2, 'A', '1', ''),
(2, 2, 'B', '1', ''),
(3, 4, 'A', '1', ''),
(4, 4, 'B', '1', ''),
(5, 6, 'A', '1', ''),
(6, 6, 'B', '1', ''),
(7, 8, 'A', '1', ''),
(8, 8, 'B', '1', ''),
(9, 2, 'CCIT A', '1', ''),
(10, 2, 'CCIT B', '1', ''),
(11, 4, 'CCIT A', '1', ''),
(12, 4, 'CCIT B', '1', ''),
(13, 6, 'CCIT', '1', ''),
(14, 8, 'CCIT', '1', ''),
(15, 2, 'A', '3', ''),
(16, 2, 'B', '3', ''),
(17, 4, '', '3', ''),
(18, 6, '', '3', ''),
(19, 8, '', '3', ''),
(20, 6, 'CCIT', '3', ''),
(21, 8, 'CCIT ', '3', ''),
(22, 8, 'ITKJ', '3', ''),
(23, 2, 'A', '2', ''),
(24, 2, 'B', '2', ''),
(25, 4, 'A', '2', ''),
(26, 4, 'B', '2', ''),
(27, 6, 'A', '2', ''),
(28, 6, 'B', '2', ''),
(29, 8, '', '2', ''),
(30, 2, '', '4', ''),
(32, 2, 'A', '5', ''),
(33, 2, 'A', '2', '');

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
(1, 'Data Mining\r\n'),
(2, 'pemograman berorientasi objek'),
(3, 'pemograman web dasar'),
(4, 'rekayasa perangkat lunak'),
(5, 'algoritma dan stuktur data'),
(6, 'sistem basis data'),
(7, 'aljabar linear'),
(8, 'english for it profesional'),
(9, 'sistem informasi manajemen'),
(10, 'jaringan komputer'),
(11, 'kepemimpinan dan pengembangan karakter'),
(12, 'framework programming'),
(13, 'mobile computing'),
(14, 'mobile programming'),
(15, 'statistika probabilitas'),
(16, 'cloud computing'),
(17, 'sistem pendukung keputusan'),
(18, 'etika dan hukum tik'),
(19, 'kecerdasan buatan'),
(20, 'pengolahan citra digital'),
(21, 'software quality assurance'),
(22, 'data mining'),
(23, 'kewirausahaan dalam bidang teknologi'),
(24, 'hukum dan etika dalam tik'),
(25, 'proyek sesuai kekhususan bidang teknik informatika'),
(26, 'pemograman bergerak'),
(27, 'perencanaan sumber daya perusahaan'),
(28, 'pemograman web 3'),
(29, 'sistem terdistribusi'),
(30, 'bahasa inggris komunikasi 3'),
(31, 'kapita selekta 2'),
(32, 'metodologi penelitian 2'),
(33, 'e-business'),
(34, 'pembelajaran mesin'),
(35, 'teknik digital'),
(36, 'interaksi manusia dan komputer'),
(37, 'pendidikan agama'),
(38, 'kepmimpinan dan pengembangan karakter'),
(39, 'pancasila'),
(40, 'jaringan komputer lanjut'),
(41, 'keamanan sistem informasi'),
(42, 'teknologi virtualisasi'),
(43, 'kewirausahaan bidang tik'),
(44, 'wireless sensor network'),
(45, 'pemograman perangkat jaringan (shell script)'),
(46, 'jaringan server'),
(47, 'metodologi penelitian'),
(48, 'kriptografi'),
(49, 'teknologi nirkabel'),
(50, 'proyek multimedia jaringan (2)'),
(51, 'bahasa inggris komunikasi 2 (2)'),
(52, 'kemanan jaringan (3)'),
(53, 'teknologi migrasi (3)'),
(54, 'jaringan enterprise (2)'),
(55, 'robotika (3)'),
(56, 'kewirausahaan dalam bidang multimedia jaringan (2)'),
(57, 'teknologi sensor (3)'),
(58, 'metodologi penelitian lanjut'),
(59, 'distributed system (2)'),
(60, 'java programming (oracle academy) (3)'),
(61, 'english 6 (2)'),
(62, 'security web platforms (2)'),
(63, 'crypthography 2 (asymetrics) (2)'),
(64, 'shell script programming (2)'),
(65, 'project of information system security (2)'),
(66, 'routing and switching (mikrotik) (2)'),
(67, 'project management (2)'),
(68, 'cloud computing (3)'),
(69, 'security mobile platforms (3)'),
(70, 'research methodology (2)'),
(71, 'mathematics 3 (statistics) (2)'),
(72, 'prinsip dan desain animasi'),
(73, 'multimedia lanjut'),
(74, 'desain ux/ui'),
(75, 'aljabar linear geometrik'),
(76, 'menggambar'),
(77, 'desain komunikasi visual lanjut'),
(78, 'animasi 3d'),
(79, 'metode statistika'),
(80, 'teknik audio video'),
(81, 'manajemen proyek multimedia'),
(82, 'bahasa inggris untuk komunikasi'),
(83, 'multimedia authoring & scripting'),
(84, 'pemrogaman game 2d'),
(85, 'animasi 3d'),
(86, 'proyek kekhususan multimedia'),
(87, 'manajemen projek tik'),
(88, 'multimedia embedded system'),
(89, 'mixed reality'),
(90, 'pemograman game 3d'),
(91, 'keamanan sistem informasi'),
(92, 'interaksi komputer manusia'),
(93, 'kewarganegaraan'),
(94, 'protokol perutean dan penyambungan'),
(95, 'projek akhir');

-- --------------------------------------------------------

--
-- Table structure for table `table_prodi`
--

CREATE TABLE `table_prodi` (
  `prodi_id` int(11) NOT NULL,
  `prodi_name` varchar(100) NOT NULL,
  `prodi_jurusan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_prodi`
--

INSERT INTO `table_prodi` (`prodi_id`, `prodi_name`, `prodi_jurusan`) VALUES
(1, 'Teknik Informatika', '1'),
(2, 'TEKNIK MULTIMEDIA DIGITAL', '1'),
(3, 'TEKNIK MULTIMEDIA JARINGAN', '1'),
(4, 'TEKNIK KOMPUTER JARINGAN', '1'),
(5, 'teknik alat berat', '2');

-- --------------------------------------------------------

--
-- Table structure for table `table_question`
--

CREATE TABLE `table_question` (
  `question_id` int(11) NOT NULL,
  `question_name` varchar(100) NOT NULL,
  `question_category` varchar(100) NOT NULL,
  `question_question` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_question`
--

INSERT INTO `table_question` (`question_id`, `question_name`, `question_category`, `question_question`) VALUES
(1, 'question1', 'Kompetensi Pedagogik', 'Kesiapan memberikan kuliah dan/atau praktek/praktikum'),
(2, 'question2', 'Kompetensi Pedagogik', 'Keteraturan dan ketertiban penyelenggaraan perkuliahan'),
(3, 'question3', 'Kompetensi Pedagogik', 'Kemampuan menghidupkan suasana kelas'),
(4, 'question4', 'Kompetensi Pedagogik', 'Kejelasan penyampaian materi dan jawaban terhadap pertanyaan di kelas'),
(5, 'question5', 'Kompetensi Pedagogik', 'Pemanfaatan media dan teknologi pembelajaran'),
(6, 'question6', 'Kompetensi Pedagogik', 'Keanekaragaman cara pengukuran/penilaian hasil belajar'),
(7, 'question7', 'Kompetensi Pedagogik', 'Pemberian umpan balik terhadap tugas/penilaian'),
(8, 'question8', 'Kompetensi Pedagogik', 'Kesesuaian materi ujian dan/atau tugas dengan tujuan mata kuliah'),
(9, 'question9', 'Kompetensi Pedagogik', 'Kesesuaian nilai yang diberikan dengan hasil belajar'),
(10, 'question10', 'Kompetensi Profesional', 'Kemampuan menjelaskan pokok bahasan/topik secara tepat'),
(11, 'question11', 'Kompetensi Profesional', 'Kemampuan memberi contoh relevan dari konsep yang diajarkan'),
(12, 'question12', 'Kompetensi Profesional', 'Kemampuan menjelaskan keterkaitan bidang/topik yang diajarkan dengan bidang/topik lain'),
(13, 'question13', 'Kompetensi Profesional', 'Kemampuan menjelaskan keterkaitan bidang/topik yang diajarkan dengan konteks kehidupan'),
(14, 'question14', 'Kompetensi Profesional', 'Penguasaan akan isu-isu mutakhir dalam bidang yang diajarkan (kemutakhiran bahan/referensi kuliah)'),
(15, 'question15', 'Kompetensi Profesional', 'Penggunaan hasil-hasil penelitian untuk meningkatkan kualitas perkuliahan'),
(16, 'question16', 'Kompetensi Profesional', 'Pelibatan mahasiswa dalam penelitian/kajian dan atau pengembangan/rekayasa/desain yang dilakukan dosen'),
(17, 'question17', 'Kompetensi Profesional', 'Kemampuan menggunakan beragam teknologi komunikasi'),
(18, 'question18', 'Kompetensi Kepribadian', 'Kewibawaan sebagai pribadi dosen'),
(19, 'question19', 'Kompetensi Kepribadian', 'Kearifan dalam mengambil keputusan'),
(20, 'question20', 'Kompetensi Kepribadian', 'Menjadi contoh dalam bersikap dan berperilaku'),
(21, 'question21', 'Kompetensi Kepribadian', 'Satunya kata dan tindakan'),
(22, 'question22', 'Kompetensi Kepribadian', 'Kemampuan mengendalikan diri dalam berbagai situasi dan kondisi'),
(23, 'question23', 'Kompetensi Kepribadian', 'Adil dalam memperlakukan mahasiswa'),
(24, 'question24', 'Kompetensi Kepribadian', 'Kemampuan menyampaikan pendapat'),
(25, 'question25', 'Kompetensi Kepribadian', 'Kemampuan menerima kritik, saran, dan pendapat dari mahasiswa'),
(26, 'question26', 'Kompetensi Kepribadian', 'Mengenal dengan baik mahasiswa yang mengikuti kuliahnya'),
(27, 'question27', 'Kompetensi Kepribadian', 'Toleransi terhadap keberagaman mahasiswa');

-- --------------------------------------------------------

--
-- Table structure for table `table_semester`
--

CREATE TABLE `table_semester` (
  `semester_id` int(11) NOT NULL,
  `semester_year` varchar(100) NOT NULL,
  `semester_gage` varchar(100) NOT NULL,
  `semester_status` varchar(100) NOT NULL,
  `semester_no` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_semester`
--

INSERT INTO `table_semester` (`semester_id`, `semester_year`, `semester_gage`, `semester_status`, `semester_no`) VALUES
(1, '2022/2023', '1', '0', '1'),
(2, '2022/2023', '2', '1', '2'),
(3, '2023/2024', '1', '0', '3'),
(4, '2023/2024', '2', '0', '4');

-- --------------------------------------------------------

--
-- Table structure for table `table_user`
--

CREATE TABLE `table_user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_password` text NOT NULL,
  `user_kelas` text NOT NULL,
  `user_role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_user`
--

INSERT INTO `table_user` (`user_id`, `user_email`, `user_name`, `user_password`, `user_kelas`, `user_role`) VALUES
(1, 'admin@gmail.com', 'admin', '79b49ba37eae7bf6e54d5db3dff30dd74723c3931eae48d275f70212fad4d35886f56311ae992e0b0789d43505a940bdf830950a526db28e13649c511ef79a45', '0', 'admin'),
(2, 'merakartika@gmail.com', 'Mera Kartika', '4e14585412e1377e862fb348d4753289db18d647426051454be764edcccfb72ae66d2530c11086dee1176762cbb63a797c0c8c459d5a3076de99a7241e474cdf', '0', 'dosen'),
(3, 'rakhaharis080102@gmail.com', 'Rakha Haris', '79b49ba37eae7bf6e54d5db3dff30dd74723c3931eae48d275f70212fad4d35886f56311ae992e0b0789d43505a940bdf830950a526db28e13649c511ef79a45', '1', 'Mahasiswa'),
(4, 'kaproditi@gmail.com', 'Kaprodi TI', '45af53bb580b19a0f2a14c47499f570a9fb4ed38d32ef7aefe2437018bf7922f95d54fddbbbedd3eadc0b7b5013a3d6c0ed9d72d6ea6d4cf0369826265007916', '0', 'kaprodi'),
(5, 'kajurtik@gmail.com', 'Kajur TIK', '359641cd4dc127f8ac194b3bd064df68274b0abdf6b6f660c3da5cf245b1576dc213a0a64d07120b024a2d8f47beac6add38c5fae50351a5d216fa78f7161c4e', '0', 'kajur'),
(6, 'mauldy@gmail.com', 'mauldy', 'ba578101518d033ce5d36f926133e7f1eee74b85faf71c6474c0fe3b816ed870db39ac5bf5fc93d702d2bbc7c7ec38eb7468ad2f0cc0deb48def2e32caa32565', '0', 'dosen'),
(7, 'anita@gmail.com', 'anita', '15dd134cec5ad894721a567f7d7ed5d4176da90ba11a4972f12ef8a194319e020752017077388d6f11abdbfed5cac291ed31ec56e43ab22441d49cd81af407f4', '0', 'dosen'),
(8, 'rizkielisa@gmail.com', 'rizki elisa', '5c8ce5ffcb6f5b2f61aa36a6d92ad474d84836aec778e4fee3363e8a32447622ec4f5f58aec5b3a284bfaf145c1a7623b7570bd3f4a309192f540016e4a376d9', '0', 'dosen'),
(9, 'risna@gmail.com', 'risna', '122a2bf8e2f5dc9249c645e0b43758e06c1277e1cd77c6b3fbd555bdd97c48ba853359a1c439de0236d8481e699fd3e2a7fee0bdb55b102b682de5e3a59b042b', '0', 'dosen'),
(10, 'agus@gmail.com', 'agus', '5acf9cbb619b3fd038e8eb651b579e85191f123b5f1f05ef907ed3f15a18ff29f1fd7ed6b08065696f96b84282c4e96cca8ff26a59fbbbd83f6958b9317915c3', '0', 'dosen'),
(11, 'dewik@gmail.com', 'dewi k', '28555efd0f024f7390ac05e3e1381895e4d3f70670f6686421fe66bf48824d0cef6b9cb4bca74d56af248c95181ce58cc338a57eb3adfc309e85a3fba84efb08', '0', 'dosen'),
(12, 'bambang@gmail.com', 'bambang', 'a2e307369cc60aa88b0c51ed54da68d85ab7130853ad59a1a6db84d1e4e00115389f5aa4e1e4ae1d9c94ba2f12a9ecabdefd2f42065e7ca99cdfdc736ff8f03f', '0', 'dosen'),
(13, 'heikal@gmail.com', 'heikal', '512ce8e1a8117cc339929fa536bfa2c89a88b456b349742909d2a59a0b8d54be915adba89aaf0a077744870d22dbaf7d7d5ad05e6c8d6ed6e30e8c74ece42b55', '0', 'dosen'),
(14, 'ayres@gmail.com', 'ayres', '8d7b503fc7b715106fabce7dce63768a5226edef5a989f2823ff446887422677193426f64dece88e9ed5118a95edfa543a42184d2080f7ba3c17c94f811dbb55', '0', 'dosen'),
(15, 'fitri@gmail.com', 'fitri', '4c1d96232576353aafbb6b2dea2071b6919d1ca1de775c8cccc4c964d0b1c9caf187438f760a156fdb3811ff6b1793ad7dda07cbed9b99c27c97185f35b5c6d3', '0', 'dosen'),
(16, 'irawati@gmail.com', 'irawati', '54e31fecb9a7e9f1361bd85ef3752f54e243df18b1bf2cd294da77a195612527c50c8d1cd8b225070573f73787ef509ad891b19b75b27d576183cd76263e36e0', '0', 'dosen'),
(17, 'iklima@gmail.com', 'iklima', 'eec022d3d9d80af52b17a8ba7b6836a975c519e51c9ee9a3ea1280c961c90fe6a9990a66fa5414a94b977d575a4aad357faee09c0712a2d48ab141fddd69db55', '0', 'dosen'),
(18, 'euis@gmail.com', 'euis', 'e453a501aad3c92d4c060979dfc63504c5855bf96e0315d2c3c7fb77839c554b9cbcbb6d4470f381a0365ed63d37f4e981936b0f3f5e1a0d3fdca917801c998d', '0', 'dosen'),
(19, 'asep@gmail.com', 'asep', '86a37b40b3b2e7f0f3cccd681befadc987a1c9e0d2bb96e3761b59dc05877a226e185765711db37bc6103b9be4c5094a7ef13be4edeadfd27940bad53fef4602', '0', 'dosen'),
(20, 'dinda@gmail.com', 'dinda', '96a773a379122d94e816cdbecab97500adddf139df29983b21005eb60d66229f307836153c6b738dbf38b2ef2880512f5e9f34dd609249dfa53791e59c4f2b64', '0', 'dosen'),
(21, 'chandra@gmail.com', 'chandra', '5f770e3bd2e90424735975e77f82f15216ff1211aca20985f7949f9a6ae31cf20c7c6620f47d834c974451a8be28ef640fdfc5e9a1b6de9f66d0905eb07e8963', '0', 'dosen'),
(22, 'anggi@gmail.com', 'anggi', 'e2de183060c001623400e9d2f75c65dbb1bb8dfb7ed74f07d287dd6441d4315f65bfa07c9aa2798a122723edd73cf286fa4c45e752a3dfe5ac2ac3ccc41ed769', '0', 'dosen'),
(23, 'syamsi@gmail.com', 'syamsi', '478cc67b46db4e0f2b41eec7ded02e1ddd0dcbbf9680c98af2ef465886f43c07fc5a1e5973b882e460af340e8acb1fab51bcb6c7d17e3db0a81d06b956a446db', '0', 'dosen'),
(24, 'defiana@gmail.com', 'defiana', '6aa696f472982512d628fd6f5c9fdca55f298e938e3304cc4970395a9757f8eef51955f22facddc5ae054178c811ab41b439a4b00223b51d7a1f54840c538cdf', '0', 'dosen'),
(25, 'tab@gmail.com', 'TAB', '79b49ba37eae7bf6e54d5db3dff30dd74723c3931eae48d275f70212fad4d35886f56311ae992e0b0789d43505a940bdf830950a526db28e13649c511ef79a45', '32', 'Mahasiswa'),
(26, 'lik@gmail.com', 'lik', '1f3f8b13e586eaa0619fef8aa50f491fc7c92702811c8f14fb2f3525d79f871151812e81d02381c11b667844c4baba562ec9f93ec34ad3f6f387ae1cf670ead9', '0', 'dosen'),
(27, 'dewiyanti@gmail.com', 'dewiyanti', 'c0c28c71bea0c5b4d4c4585602499a1bd99174c7625a0d185276f074b776df328e2b7278b9472db99cdbbf502c1cb718856176a742c646282619d8d4190d5a72', '0', 'dosen'),
(28, 'ratna@gmail.com', 'ratna', 'ab6aadc57f3f670073da6f12448ff742560fb44c6407805ec8e442d51fb1f20a210013ec7cb51b404403aa2763af003ad7aa0713468d6a12534ad1e103e94719', '0', 'dosen'),
(29, 'basam@gmail.com', 'basam', '86c44ff027ae7219001300b7ff43230765e78102b94f4402c0e99569db70a68a99d317767dddc38c540bbac0ace162c3af8a5ccd1fc1fcff035fc9c11c3443fb', '0', 'dosen'),
(30, 'hata@gmail.com', 'hata', 'f1777c66854fde254855734d90000b89a9f8052e3ebf59c095bd84daef7c1ceb892f2141e99a3758f04b35cfcf9e3bc56cb1b9e4c40ec7b422ab7235b5495e39', '0', 'dosen'),
(31, 'herlino@gmail.com', 'herlino', '90ea96e8ad2e80c931d0d47c4eb898b59c4d4ad0d6e15ba82b380321deba289fbbe396412b4c4e56c71243fe08f1a08238243a5de0a05a0b921f9f06004f573c', '0', 'dosen'),
(32, 'fachroni@gmail.com', 'fachroni', 'cac93e66c54b8ae9d4baf7ccebfd8493e1bd8b2042f2ec2e4676715731d4d39706d5926b0012b56cf29607be50c7c8e5a5349e489ac337ecf815f7638358ec7c', '0', 'dosen'),
(33, 'yoyok@gmail.com', 'yoyok', '29e2b53825322f60960d56b657bedecb9d7b01becb1d4b02f86837d9d88bf3a2d751c05945917c46cf1cba727b6ae77ce96af96e02aecc6edff1a3ab9856c638', '0', 'dosen'),
(34, 'eriya@gmail.com', 'eriya', 'f2c37a9c3455297cf5363112ca6e9b43665d7b80061f458fc1811b531ad1991e4c68548f6e052c8fac982f7a8cd7921145293c7fd29ddb86407c8931faccce69', '0', 'dosen'),
(35, 'asepc@gmail.com', 'asep c', 'a4ef9b852cc19988d62fac6c0a2d98776cb15b9087f56cee9874d19904235f737300987c1c38b553beb89b9ebf0203c447ec5524d47363aba677a013f91c5a0f', '0', 'dosen'),
(36, 'prihatin@gmail.com', 'prihatin', 'bcea26203f37335d9d21fe893ba1970e60cf63875bd1f27c8479a86bfa5e16cf90a3479d9e9b4def2a4f032b5b2091ef0ea5deb012a2a5da3043feac679de935', '0', 'dosen'),
(37, 'ella@gmail.com', 'ella', '275eac5fc01e61bdacc5b37567b03a21805c87b2031119b00abaee8dab6f4bcaec0c0491163c037cbb452c8ea3e6bc7f13d0063217caf7b100cee39d5b038c26', '0', 'dosen'),
(38, 'ayu@gmail.com', 'ayu', 'cda21b8cf2c964342ba2223c09efd20aa81c00f9fb54d265243290d48d61c590d9ab17e938a4372d8bbb295956f070a6e9a7a06864b0cd3a3f6af2c62bdf571a', '0', 'dosen'),
(39, 'maria@gmail.com', 'maria', '6955664143f39383266d35e430aa5661d6eb20625c91967ed459c72ad7a1bc2e82c133f90783db6e640ac729d696bb6ef68e9cb109c1b12499097fb6e2f33e83', '0', 'dosen'),
(40, 'yusuf@gmail.com', 'yusuf', 'd0d3592483de7bfda1b0abf50896dd4448f106a09ef8f102882f4ff7ca272325481590170514c99cb1d5885292732911a8f1f52d097270efea67a19d08c8584e', '0', 'dosen'),
(41, 'andi@gmail.com', 'andi', '27c7db3821d3a6c391bb8324f9a7ef5bf3131ebd34e141b097f3fd130f2a1aaaa9e2d5f59bfc38bfdf2d42c7710b5cd391e015b19d9cbb48c344c3b4df53f7c8', '0', 'dosen'),
(42, 'indra@gmail.com', 'indra', '72f99e7774e18c1f289ad79134353983d1971f6f6d5addb29431f34bc2453f26b81e73b304f3b96807eb99517473b2f089fadc6daec693f311a9903b19a9e242', '0', 'dosen'),
(43, 'nurfauzi@gmail.com', 'nurfauzi', '646205ec66e28c218b3f20603e530fd60207f8be7173d9e3ab9eed75d21f5e4e60a885faf23c93cbf74417e8a775933443a086bfa98de2d5ff2498d935477ce4', '0', 'dosen'),
(44, 'abub@gmail.com', 'abub', 'd41581cea5060c67eeb1d79554fe719de9f9549ba7269a9b74036adc38f7b6cb10a2c60e7f8792b89e6abbc7f40e4414cc6259565bf8b85dda7cd6c1890b2ccd', '0', 'dosen'),
(45, 'iwan@gmail.com', 'iwan', '477befaebd7ad3b7f3395513750bb86994fbeae513e2e0be1f36d01e51b50d8ebf4d4a4f5ab1e83c93cac3c05f89910d058a606c14ed713f616d7c94e813c832', '0', 'dosen'),
(46, 'lisa@gmail.com', 'lisa', '8ba7101132da3e6286f761418e71aeb0a8cbebf69516ffbc723832cd02688f9bcf212fcc15ef8a382ec826d87c77c2b05e8eaa9980dfedf5eaa9032edffd1fd0', '0', 'dosen'),
(47, 'mira@gmail.com', 'mira', 'faf304c13a46f0b1dd96f467b4ac5318edc6e751d6317c94bac62acf173015eec33f6cd208eab68b353e36785a5899233640e72e0f76f7f580ae3e13f7f89e1c', '0', 'dosen'),
(48, 'wanda@gmail.com', 'wanda', '5efd25fd0f06d6079a00132fa09c8478815ae9aea0de9687fdc696ce572f2d6b9b4d567c56851ed6acceb07246471e755ec8d82bc7817747362ebbf3342f1e9a', '0', 'dosen'),
(49, 'ade@gmail.com', 'ade', 'c636ad21cae9941455e96329f276cb94a2d537eedcb91577f0a078dd0d3a3aeaf5ff191a717de0f9e98e1f7a68755f744cd9ccb36bc135cf2c3aeaede92dc58c', '0', 'dosen'),
(50, 'indahsari@gmail.com', 'indahsari', 'ad801728912837cf851b25e047ac6d338efadd78edec3ac46f9d08c8b7e5bb5f122efe58a66006286ac6daa533fa56b601aeb8d54f6c48f59f4a60534aaf4f18', '0', 'dosen'),
(51, 'userti2a1@gmail.com', 'USER TI 2A (1)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '1', 'Mahasiswa'),
(52, 'userti2a2@gmail.com', 'USER TI 2A (2)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '1', 'Mahasiswa'),
(53, 'userti2a3@gmail.com', 'USER TI 2A (3)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '1', 'Mahasiswa'),
(54, 'userti2a4@gmail.com', 'USER TI 2A (4)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '1', 'Mahasiswa'),
(55, 'userti2a5@gmail.com', 'USER TI 2A (5)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '1', 'Mahasiswa'),
(56, 'userti2b1@gmail.com', 'USER TI 2B (1)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '2', 'Mahasiswa'),
(57, 'userti2b2@gmail.com', 'USER TI 2B (2)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '2', 'Mahasiswa'),
(58, 'userti2b3@gmail.com', 'USER TI 2B (3)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '2', 'Mahasiswa'),
(59, 'userti2b4@gmail.com', 'USER TI 2B (4)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '2', 'Mahasiswa'),
(60, 'userti2b5@gmail.com', 'USER TI 2B (5)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '2', 'Mahasiswa'),
(61, 'userti4a1@gmail.com', 'USER TI 4B (1)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '3', 'Mahasiswa'),
(62, 'userti4a2@gmail.com', 'USER TI 4B (2)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '3', 'Mahasiswa'),
(63, 'userti4a3@gmail.com', 'USER TI 4B (3)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '3', 'Mahasiswa'),
(64, 'userti4a4@gmail.com', 'USER TI 4B (4)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '3', 'Mahasiswa'),
(65, 'userti4a5@gmail.com', 'USER TI 4B (5)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '3', 'Mahasiswa'),
(66, 'userti4b1@gmail.com', 'USER TI 4B (1)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '4', 'Mahasiswa'),
(67, 'userti4b2@gmail.com', 'USER TI 4B (2)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '4', 'Mahasiswa'),
(68, 'userti4b3@gmail.com', 'USER TI 4B (3)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '4', 'Mahasiswa'),
(69, 'userti4b4@gmail.com', 'USER TI 4B (4)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '4', 'Mahasiswa'),
(70, 'userti4b5@gmail.com', 'USER TI 4B (5)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '4', 'Mahasiswa'),
(71, 'userti6a1@gmail.com', 'USER TI 6A (1)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '5', 'Mahasiswa'),
(72, 'userti6a2@gmail.com', 'USER TI 6A (2)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '5', 'Mahasiswa'),
(73, 'userti6a3@gmail.com', 'USER TI 6A (3)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '5', 'Mahasiswa'),
(74, 'userti6a4@gmail.com', 'USER TI 6A (4)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '5', 'Mahasiswa'),
(75, 'userti6a5@gmail.com', 'USER TI 6A (5)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '5', 'Mahasiswa'),
(76, 'userti6b1@gmail.com', 'USER TI 6B (1)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '6', 'Mahasiswa'),
(77, 'userti6b2@gmail.com', 'USER TI 6B (2)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '6', 'Mahasiswa'),
(78, 'userti6b3@gmail.com', 'USER TI 6B (3)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '6', 'Mahasiswa'),
(79, 'userti6b4@gmail.com', 'USER TI 6B (4)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '6', 'Mahasiswa'),
(80, 'userti6b5@gmail.com', 'USER TI 6B (5)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '6', 'Mahasiswa'),
(81, 'userti8a1@gmail.com', 'USER TI 8B (1)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '7', 'Mahasiswa'),
(82, 'userti8a2@gmail.com', 'USER TI 8B (2)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '7', 'Mahasiswa'),
(83, 'userti8a3@gmail.com', 'USER TI 8B (3)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '7', 'Mahasiswa'),
(84, 'userti8a4@gmail.com', 'USER TI 8B (4)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '7', 'Mahasiswa'),
(85, 'userti8a5@gmail.com', 'USER TI 8B (5)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '7', 'Mahasiswa'),
(86, 'userti8b1@gmail.com', 'USER TI 8B (1)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '8', 'Mahasiswa'),
(87, 'userti8b2@gmail.com', 'USER TI 8B (2)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '8', 'Mahasiswa'),
(88, 'userti8b3@gmail.com', 'USER TI 8B (3)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '8', 'Mahasiswa'),
(89, 'userti8b4@gmail.com', 'USER TI 8B (4)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '8', 'Mahasiswa'),
(90, 'userti8b5@gmail.com', 'USER TI 8B (5)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '8', 'Mahasiswa'),
(91, 'kaproditmd@gmail.com', 'Kaprodi TMD', '45af53bb580b19a0f2a14c47499f570a9fb4ed38d32ef7aefe2437018bf7922f95d54fddbbbedd3eadc0b7b5013a3d6c0ed9d72d6ea6d4cf0369826265007916', '0', 'kaprodi'),
(92, 'usertmd2a1@gmail.com', 'USER TMD 2A (1)', '70e9b857aca8d91bc6407f76262723939ea25cdaf74644820afffd28cfdba12d84121fd225a1c7bdac0c7d9116e04a08bde682716e43d24ac31436b8eb8f575a', '33', 'Mahasiswa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `table_answer`
--
ALTER TABLE `table_answer`
  ADD PRIMARY KEY (`answer_id`);

--
-- Indexes for table `table_auth`
--
ALTER TABLE `table_auth`
  ADD PRIMARY KEY (`auth_id`);

--
-- Indexes for table `table_dosen`
--
ALTER TABLE `table_dosen`
  ADD PRIMARY KEY (`dosen_id`);

--
-- Indexes for table `table_jurusan`
--
ALTER TABLE `table_jurusan`
  ADD PRIMARY KEY (`jurusan_id`);

--
-- Indexes for table `table_kajur`
--
ALTER TABLE `table_kajur`
  ADD PRIMARY KEY (`kajur_id`);

--
-- Indexes for table `table_kaprodi`
--
ALTER TABLE `table_kaprodi`
  ADD PRIMARY KEY (`kaprodi_id`);

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
-- Indexes for table `table_prodi`
--
ALTER TABLE `table_prodi`
  ADD PRIMARY KEY (`prodi_id`);

--
-- Indexes for table `table_question`
--
ALTER TABLE `table_question`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `table_semester`
--
ALTER TABLE `table_semester`
  ADD PRIMARY KEY (`semester_id`);

--
-- Indexes for table `table_user`
--
ALTER TABLE `table_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `table_answer`
--
ALTER TABLE `table_answer`
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `table_auth`
--
ALTER TABLE `table_auth`
  MODIFY `auth_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `table_dosen`
--
ALTER TABLE `table_dosen`
  MODIFY `dosen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `table_jurusan`
--
ALTER TABLE `table_jurusan`
  MODIFY `jurusan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `table_kajur`
--
ALTER TABLE `table_kajur`
  MODIFY `kajur_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `table_kaprodi`
--
ALTER TABLE `table_kaprodi`
  MODIFY `kaprodi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `table_kbm`
--
ALTER TABLE `table_kbm`
  MODIFY `kbm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `table_kelas`
--
ALTER TABLE `table_kelas`
  MODIFY `kelas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `table_matkul`
--
ALTER TABLE `table_matkul`
  MODIFY `matkul_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `table_prodi`
--
ALTER TABLE `table_prodi`
  MODIFY `prodi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `table_question`
--
ALTER TABLE `table_question`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `table_semester`
--
ALTER TABLE `table_semester`
  MODIFY `semester_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `table_user`
--
ALTER TABLE `table_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
