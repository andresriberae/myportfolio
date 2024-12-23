-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(250) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `repositoryUrl` VARCHAR(250) NOT NULL,
    `projectUrl` VARCHAR(250) NOT NULL,
    `tools` JSON NOT NULL,
    `categories` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `project_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
