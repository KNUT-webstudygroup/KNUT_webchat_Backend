-- CreateTable
CREATE TABLE `USERS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loginId` VARCHAR(191) NOT NULL,
    `pw` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(32) NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountFindQuest` (
    `loginId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `questindex` INTEGER NOT NULL,
    `quest` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,

    INDEX `AccountFindQuest_email_questindex_idx`(`email`, `questindex`),
    PRIMARY KEY (`email`, `questindex`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
