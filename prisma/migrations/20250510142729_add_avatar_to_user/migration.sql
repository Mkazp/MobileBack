-- AlterTable
ALTER TABLE `Card` ADD COLUMN `content` VARCHAR(191) NULL,
    ADD COLUMN `file_name` VARCHAR(191) NULL,
    ADD COLUMN `file_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `avatar_url` VARCHAR(191) NULL;
