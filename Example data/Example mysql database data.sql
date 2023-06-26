-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 09 Maj 2022, 12:21
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `projekt_szkielety`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pic_url` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `categories`
--

INSERT INTO `categories` (`id`, `name`, `pic_url`, `createdAt`, `updatedAt`) VALUES
(1, 'śniadania', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', '2022-04-16 01:20:22', '2022-04-16 01:20:22'),
(2, 'desery', 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80', '2022-04-16 01:20:32', '2022-04-16 01:20:32'),
(3, 'przekąski', 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', '2022-04-16 01:20:39', '2022-04-16 01:20:39'),
(4, 'obiady', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', '2022-04-20 21:50:19', '2022-04-20 21:50:19'),
(5, 'kolacje', 'https://images.unsplash.com/photo-1578815484572-fedc09af0d27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', '2022-04-20 21:50:42', '2022-04-20 21:50:42'),
(6, 'napoje', 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80', '2022-04-20 21:50:50', '2022-04-20 21:50:50'),
(7, 'sałatki', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80', '2022-04-20 21:51:35', '2022-04-20 21:51:35'),
(8, 'zupy', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80', '2022-04-20 21:51:40', '2022-04-20 21:51:40');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RecipeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `comments`
--

INSERT INTO `comments` (`id`, `text`, `username`, `createdAt`, `updatedAt`, `RecipeId`) VALUES
(20, 'Świetne z sosem BBQ', 'krystian12', '2022-05-08 17:15:02', '2022-05-08 17:15:02', 75),
(21, 'Pycha.', 'krystian12', '2022-05-08 17:15:17', '2022-05-08 17:15:17', 69),
(22, 'Cebula nie pasuje do tej sałatki...', 'krystian12', '2022-05-08 17:16:00', '2022-05-08 17:16:00', 78),
(24, 'Podawane z bitą śmietaną i świeżymi truskawkami smakują niesamowicie :)', 'Jakub656', '2022-05-08 17:18:35', '2022-05-08 17:18:35', 73),
(25, 'Uważajcie na czas gotowania przy niektórych owocach bo otrzymacie rozwodniony dżem zamiast kompotu :D. Zalecane 10 minut dla np. śliwek to zdecydowanie za długo.', 'Jakub656', '2022-05-08 17:20:36', '2022-05-08 17:20:36', 71),
(26, 'Smaczne, ale proponowanej panierki nie określałbym jako pikantna...', 'damian12', '2022-05-08 17:22:18', '2022-05-08 17:22:18', 75),
(27, 'Świetny pomysł na szybkie śniadanie', 'damian12', '2022-05-08 17:22:48', '2022-05-08 17:22:48', 70),
(29, 'Ciekawy przepis, aczkolwiek nie dodawałabym cebuli i fasoli. Bardziej pasują mi tu czarne oliwki.', 'Kinga02', '2022-05-08 17:25:27', '2022-05-08 17:25:27', 78),
(31, 'Pyszne. Polecam przepis', 'Kinga02', '2022-05-08 17:27:05', '2022-05-08 17:27:05', 73),
(32, 'asasfasdfassfa', 'damian12', '2022-05-09 08:42:37', '2022-05-09 08:42:37', 69);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RecipeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `createdAt`, `updatedAt`, `RecipeId`) VALUES
(143, '3 jaja', '2022-05-08 16:28:55', '2022-05-08 16:28:55', 69),
(144, '0.9 szkl cukru', '2022-05-08 16:28:55', '2022-05-08 16:28:55', 69),
(145, '100ml oleju', '2022-05-08 16:28:55', '2022-05-08 16:28:55', 69),
(146, '300g mąki', '2022-05-08 16:28:55', '2022-05-08 16:28:55', 69),
(147, '1 łyżezka proszku do pieczenia', '2022-05-08 16:28:55', '2022-05-08 16:28:55', 69),
(148, '2 jajka', '2022-05-08 16:34:15', '2022-05-08 16:34:15', 70),
(149, '2 duże pieczarki', '2022-05-08 16:34:15', '2022-05-08 16:34:15', 70),
(150, '10g szpinaku', '2022-05-08 16:34:15', '2022-05-08 16:34:15', 70),
(151, '1 łyżka oleju', '2022-05-08 16:34:15', '2022-05-08 16:34:15', 70),
(152, '1 szczypta soli', '2022-05-08 16:34:15', '2022-05-08 16:34:15', 70),
(153, '50g startego sera żółtego', '2022-05-08 16:34:15', '2022-05-08 16:34:15', 70),
(157, '300g owoców bez gniazd nasiennych i pestek', '2022-05-08 16:37:57', '2022-05-08 16:37:57', 71),
(158, '3 łyżki cukru', '2022-05-08 16:37:57', '2022-05-08 16:37:57', 71),
(159, '1l wody', '2022-05-08 16:37:57', '2022-05-08 16:37:57', 71),
(160, '1 kromka chleba', '2022-05-08 16:44:43', '2022-05-08 16:44:43', 72),
(161, 'sczypta soli', '2022-05-08 16:44:43', '2022-05-08 16:44:43', 72),
(162, '10g masła', '2022-05-08 16:44:43', '2022-05-08 16:44:43', 72),
(163, '3 plasterki pomidora', '2022-05-08 16:44:43', '2022-05-08 16:44:43', 72),
(172, '1 szkl mąki pszennej', '2022-05-08 16:48:37', '2022-05-08 16:48:37', 73),
(173, '2 jajka', '2022-05-08 16:48:37', '2022-05-08 16:48:37', 73),
(174, '15g cukru waniliowego', '2022-05-08 16:48:37', '2022-05-08 16:48:37', 73),
(175, '1 łyżka miodu', '2022-05-08 16:48:37', '2022-05-08 16:48:37', 73),
(176, '1 szkl mleka', '2022-05-08 16:48:37', '2022-05-08 16:48:37', 73),
(177, '1 szczypta soli', '2022-05-08 16:48:37', '2022-05-08 16:48:37', 73),
(178, '30ml oleju', '2022-05-08 16:48:37', '2022-05-08 16:48:37', 73),
(179, '30g oleju do smażenia', '2022-05-08 16:48:37', '2022-05-08 16:48:37', 73),
(185, '2 opakowania pikantnej panierki do nuggetsów Knorr', '2022-05-08 16:58:36', '2022-05-08 16:58:36', 75),
(186, '1kg piersi z kurczaka', '2022-05-08 16:58:36', '2022-05-08 16:58:36', 75),
(187, '2 jajka', '2022-05-08 16:58:36', '2022-05-08 16:58:36', 75),
(188, '50 ml mleka', '2022-05-08 16:58:36', '2022-05-08 16:58:36', 75),
(189, '1 kromka chleba', '2022-05-08 17:00:07', '2022-05-08 17:00:07', 76),
(190, '20g margaryny', '2022-05-08 17:00:07', '2022-05-08 17:00:07', 76),
(191, '2 ogórki konserwowe', '2022-05-08 17:00:07', '2022-05-08 17:00:07', 76),
(192, '1 opakowanie kisielu owocowego Winiary', '2022-05-08 17:04:11', '2022-05-08 17:04:11', 77),
(193, '2 szkl wody', '2022-05-08 17:04:11', '2022-05-08 17:04:11', 77),
(194, '20g świeżych owoców', '2022-05-08 17:04:11', '2022-05-08 17:04:11', 77),
(195, '350g ogórka', '2022-05-08 17:10:42', '2022-05-08 17:10:42', 78),
(196, '1 papryka czerwona', '2022-05-08 17:10:42', '2022-05-08 17:10:42', 78),
(197, '1 sos sałatkowy Zioła ogrodowe Knorr', '2022-05-08 17:10:42', '2022-05-08 17:10:42', 78),
(198, '1 cebula ', '2022-05-08 17:10:43', '2022-05-08 17:10:43', 78),
(199, '1 papryka zółta', '2022-05-08 17:10:43', '2022-05-08 17:10:43', 78),
(200, '200g jogurtu', '2022-05-08 17:10:43', '2022-05-08 17:10:43', 78),
(201, '250g czarnej fasoli z puszki', '2022-05-08 17:10:43', '2022-05-08 17:10:43', 78),
(202, '60g sera feta', '2022-05-08 17:10:43', '2022-05-08 17:10:43', 78),
(203, 'lody o wybranym smaku', '2022-05-08 17:14:18', '2022-05-08 17:14:18', 79),
(204, 'wafle', '2022-05-08 17:14:18', '2022-05-08 17:14:18', 79);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RecipeId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `likes`
--

INSERT INTO `likes` (`id`, `createdAt`, `updatedAt`, `RecipeId`, `UserId`) VALUES
(110, '2022-05-08 17:14:34', '2022-05-08 17:14:34', 71, 29),
(111, '2022-05-08 17:14:35', '2022-05-08 17:14:35', 69, 29),
(113, '2022-05-08 17:14:37', '2022-05-08 17:14:37', 73, 29),
(114, '2022-05-08 17:14:41', '2022-05-08 17:14:41', 75, 29),
(116, '2022-05-08 17:17:55', '2022-05-08 17:17:55', 73, 30),
(117, '2022-05-08 17:20:56', '2022-05-08 17:20:56', 79, 30),
(119, '2022-05-08 17:21:33', '2022-05-08 17:21:33', 75, 28),
(120, '2022-05-08 17:22:23', '2022-05-08 17:22:23', 70, 28),
(121, '2022-05-08 17:24:05', '2022-05-08 17:24:05', 79, 28),
(122, '2022-05-08 17:24:32', '2022-05-08 17:24:32', 78, 31),
(124, '2022-05-08 17:26:31', '2022-05-08 17:26:31', 73, 31);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `recipe_category_id` int(11) NOT NULL,
  `recipe_description` varchar(255) NOT NULL,
  `prepare_time` varchar(255) NOT NULL,
  `cook_time` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `publishing_status` varchar(255) NOT NULL,
  `visibility` varchar(255) NOT NULL,
  `marked` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `recipes`
--

INSERT INTO `recipes` (`id`, `name`, `username`, `recipe_category_id`, `recipe_description`, `prepare_time`, `cook_time`, `rating`, `publishing_status`, `visibility`, `marked`, `createdAt`, `updatedAt`, `UserId`) VALUES
(69, 'Ekspresowe ciasto', 'Kinga02', 2, 'Ubij jaja, dodaj pozostałe składniki, a następnie całość zmiksuj. Ciasto wylej do foremki do pieczenia i piecz przez 45 min w 170-180 st C.', '10 min', '45 min', 6, 'none', 'PUBLIC', 1, '2022-05-08 16:28:55', '2022-05-08 16:28:55', 31),
(70, 'Omlet z pieczarkami i szpinakiem', 'Kinga02', 1, 'Roztrzep jaja, dodaj pozostałe składniki i dokładnie wymieszaj. Na rozgrzanej patelni podgrzej na oleju szpinak. Następnie dodaj wymieszane wcześniej składniki i smaż przez ok. 5 min na wolnym ogniu.', '10 min', '5 min', 5, 'none', 'PUBLIC', 1, '2022-05-08 16:34:15', '2022-05-08 16:34:15', 31),
(71, 'Kompot owocowy', 'Kinga02', 6, 'Przygotuj syrop z wody i cukru. Do gorącej wody dodaj przygotowane owoce. Gotuj do czasu zagotowana.', '10 min', '10 min', 3, 'none', 'PUBLIC', 0, '2022-05-08 16:37:49', '2022-05-08 16:37:57', 31),
(72, 'Kanapka z pomidorem', 'Kinga02', 1, 'Posmaruj chleb masłem, przykryj plasterkami pomidora i posyp solą.', '2 min', '4 min', 2, 'none', 'PRIVATE', 0, '2022-05-08 16:44:43', '2022-05-08 16:44:43', 31),
(73, 'Słodkie naleśniki', 'damian12', 2, 'Jaja ubij w misce z miodem, cukrem i solą. Dodaj pozostałe składniki i wymieszaj bez użycia miksera. Smaż na rozgrzanej patelni do momentu uzyskania złotego koloru po obu stronach.', '8 min', '15 min', 6, 'none', 'PUBLIC', 1, '2022-05-08 16:48:13', '2022-05-08 16:48:37', 28),
(75, 'Pikantne nuggetsy z kurczaka', 'Jakub656', 3, 'W misce roztrzep jaja i wymieszaj z mlekiem. Następnie dodaj panierkę i dokładnie wymieszaj. Opłukane mięso pokrój na niewielkie kawałki. Następnie obtaczaj w panierce i smaż na głębokim oleju na złoty kolor.', '20 min', '30 min', 6, 'none', 'PUBLIC', 1, '2022-05-08 16:58:36', '2022-05-08 16:58:36', 30),
(76, 'Kanapka z ogórkiem konserwowym', 'Jakub656', 1, 'Chleb posmaruj masłem. Przykryj ogórkami pokrojonymi w plasterki.', '2 min', '3 min', 4, 'none', 'PRIVATE', 1, '2022-05-08 17:00:07', '2022-05-08 17:00:07', 30),
(77, 'Kisiel z kawałkami owoców', 'Jakub656', 1, 'Zagotuj 1.5szk wody. W pozostałej wodzie wymieszaj zawartość opakowania z kisielem i wlej do gorącej wody. Wymieszaj do uzyskania jednolitej konsystencji. Dodaj owoce. Gotuj 1 min na wolnym ogniu ciągle mieszając.', '2 min', '5 min', 3, 'none', 'PRIVATE', 0, '2022-05-08 17:04:11', '2022-05-08 17:04:11', 30),
(78, 'Sałatka BBQ', 'krystian12', 7, 'Umyj i pokrój ogórka. Paprykę oczyść z gniazd nasiennych i pokrój w kostkę. Pokrój cebulę w drobną kosteczkę. Wymieszaj wszystkie składniki w misce.', '5 min', '10 min', 3, 'none', 'PUBLIC', 0, '2022-05-08 17:10:42', '2022-05-08 17:10:42', 29),
(79, 'Lodowe kanapki', 'krystian12', 2, 'Na wafle nałóż po kulce lodów. Całość przykryj drugim waflem i lekko dociśnij. Przed podaniem kanapki pokrój na pół i udekoruj.', '3 min', '2 min', 2, 'none', 'PUBLIC', 0, '2022-05-08 17:14:18', '2022-05-08 17:14:18', 29),
(81, 'Tytul Edytowy', 'damian12', 1, 'wfadfa sd gd sgd', '10 min', '19 min', 5, 'none', 'PRIVATE', 1, '2022-05-09 08:43:32', '2022-05-09 08:44:43', 28);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(28, 'damian12', '$2b$10$Nfsbo2bkglXZnZl.iClUnOWaQFxZi625VLJVYmEq5HTVCv/Olm/PO', '2022-05-08 16:21:20', '2022-05-08 16:21:20'),
(29, 'krystian12', '$2b$10$5Pio21s3UJYCtZums2I7wuZuiJAUMk5emd.yTOS.hD1WZWDm9ybYa', '2022-05-08 16:22:06', '2022-05-08 16:22:06'),
(30, 'Jakub656', '$2b$10$d1kw7CVarp3aTFPssUI1eebnurFcUwLNQLvm8LyY9zqgaflnPUOQG', '2022-05-08 16:22:27', '2022-05-08 16:22:27'),
(31, 'Kinga02', '$2b$10$jJ70/94HU99/R7CKya6Adeejyo81VZSSjt8TBOk3keVhXlF6Zefsq', '2022-05-08 16:23:42', '2022-05-08 16:23:42'),
(32, 'asd23', '$2b$10$oir05gDi0OdnIiXd/W7a/ePkWZzvOSa1FpEOVysV.lp9Wn/N.imvO', '2022-05-09 08:41:15', '2022-05-09 08:41:15');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `RecipeId` (`RecipeId`);

--
-- Indeksy dla tabeli `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `RecipeId` (`RecipeId`);

--
-- Indeksy dla tabeli `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `RecipeId` (`RecipeId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indeksy dla tabeli `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT dla tabeli `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;

--
-- AUTO_INCREMENT dla tabeli `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT dla tabeli `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`RecipeId`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`RecipeId`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`RecipeId`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
