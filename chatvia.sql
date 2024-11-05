-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 10, 2022 at 10:53 AM
-- Server version: 5.7.39
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `themesbrand_chatvia_node`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(90) NOT NULL,
  `email` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `version` int(1) NOT NULL DEFAULT '0',
  `last_msg_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `user_id`, `created_by`, `version`, `last_msg_date`) VALUES
(53, 'Test', 'test@test.com', 5, 4, 0, NULL),
(54, 'demo', 'demo@demo.com', 4, 5, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `userId` int(11) NOT NULL,
  `version` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`, `userId`, `version`) VALUES
(2, 'test group - 1', 'test', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `group_messages`
--

CREATE TABLE `group_messages` (
  `id` int(11) NOT NULL,
  `message` text CHARACTER SET utf8mb4 NOT NULL,
  `sender_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `file_upload` varchar(255) DEFAULT NULL,
  `unread` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `version` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `group_messages`
--

INSERT INTO `group_messages` (`id`, `message`, `sender_id`, `group_id`, `file_upload`, `unread`, `createdAt`, `updatedAt`, `version`) VALUES
(7, '', 1, 2, '8149.jpg', 0, '2022-08-12 13:58:35', '2022-08-12 13:58:35', 0),
(10, 'ets', 1, 2, '', 0, '2022-08-12 16:35:55', '2022-08-12 16:35:55', 0),
(11, ' set', 1, 2, '', 0, '2022-08-12 16:36:00', '2022-08-12 16:36:00', 0),
(12, 'set', 1, 2, '', 0, '2022-08-12 16:36:02', '2022-08-12 16:36:02', 0),
(13, 'ser', 1, 2, '', 0, '2022-08-12 16:36:04', '2022-08-12 16:36:04', 0),
(14, 'wer', 1, 2, '', 0, '2022-08-12 16:36:05', '2022-08-12 16:36:05', 0);

-- --------------------------------------------------------

--
-- Table structure for table `group_users`
--

CREATE TABLE `group_users` (
  `id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `unread` int(1) NOT NULL DEFAULT '1',
  `is_admin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `version` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `group_users`
--

INSERT INTO `group_users` (`id`, `contact_id`, `group_id`, `unread`, `is_admin`, `createdAt`, `updatedAt`, `version`) VALUES
(3, 2, 2, 0, 0, '2022-08-12 13:57:59', '2022-08-12 13:58:10', 0),
(4, 1, 2, 0, 1, '2022-08-12 13:57:59', '2022-08-12 13:58:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `message` longtext CHARACTER SET utf8mb4 NOT NULL,
  `sender_id` varchar(50) NOT NULL,
  `receiver_id` varchar(50) NOT NULL,
  `file_upload` text NOT NULL,
  `unread` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `version` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `message`, `sender_id`, `receiver_id`, `file_upload`, `unread`, `createdAt`, `updatedAt`, `version`) VALUES
(103, 'tert', '1', '2', '', 0, '2022-08-12 18:08:55', '2022-08-12 18:08:55', 0),
(104, 'Hii', '4', '5', '', 0, '2022-09-20 05:29:31', '2022-09-20 05:29:31', 0),
(105, 'Hii', '4', '5', '', 0, '2022-09-20 05:31:31', '2022-09-20 05:31:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `notification` tinyint(1) NOT NULL DEFAULT '1',
  `is_muted` tinyint(1) NOT NULL DEFAULT '1',
  `location` varchar(50) NOT NULL,
  `image` text,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `version` int(2) DEFAULT NULL,
  `passwordResetToken` text,
  `passwordResetExpires` text,
  `passwordChangedAt` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `notification`, `is_muted`, `location`, `image`, `active`, `createdAt`, `updatedAt`, `version`, `passwordResetToken`, `passwordResetExpires`, `passwordChangedAt`) VALUES
(1, 'user1', 'user1@themesbrand.com', '$2a$12$EBbk7OBqdXiBXfFVKpun7OgFRxKADhTNmdhHL/IATtGX3LNizrTMq', 1, 1, 'surat', 'img-10.jpg', 0, '2022-08-12 10:33:57', '2022-09-19 11:13:18', 0, NULL, NULL, '2022-09-19 11:13:18'),
(2, 'user2', 'user2@themesbrand.com', '$2a$12$EBbk7OBqdXiBXfFVKpun7OgFRxKADhTNmdhHL/IATtGX3LNizrTMq', 1, 1, 'surat', 'default_image.jpg', 0, '2022-08-12 10:35:30', '2022-09-19 11:13:24', 0, NULL, NULL, '2022-09-19 11:13:24'),
(4, 'demo', 'demo@demo.com', '$2a$12$rJvwaEdirosVtNBc.VN0z.i3tZwzKmqjsZ79GX1ydmTDaIHiEVoXK', 1, 1, 'Surat', NULL, 0, '2022-09-20 05:00:27', '2022-09-20 05:00:27', NULL, NULL, NULL, NULL),
(5, 'Test', 'test@test.com', '$2a$12$EfWSXJqqJ5NBC.tuFrsGo.9Zqrhs8v6aT.zDJ.l1avEoYdUMAEdRu', 1, 1, 'Ahmedabad', NULL, 0, '2022-09-20 05:01:21', '2022-09-20 05:01:21', NULL, NULL, NULL, NULL),
(6, 'test11', 'test11@gmail.com', '$2a$12$ktGURv.ua0zTuPxGxvX0suTCjAzudZX5.5qHGqGFV4v5dwVTvoWR.', 1, 1, 'surat', NULL, 0, '2022-09-20 05:05:52', '2022-09-20 05:05:52', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_messages`
--
ALTER TABLE `group_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_users`
--
ALTER TABLE `group_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `group_messages`
--
ALTER TABLE `group_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `group_users`
--
ALTER TABLE `group_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
