/*
  Warnings:

  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CardGroups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubjectGroups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CardGroups` DROP FOREIGN KEY `_CardGroups_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CardGroups` DROP FOREIGN KEY `_CardGroups_B_fkey`;

-- DropForeignKey
ALTER TABLE `_SubjectGroups` DROP FOREIGN KEY `_SubjectGroups_A_fkey`;

-- DropForeignKey
ALTER TABLE `_SubjectGroups` DROP FOREIGN KEY `_SubjectGroups_B_fkey`;

-- DropTable
DROP TABLE `Group`;

-- DropTable
DROP TABLE `_CardGroups`;

-- DropTable
DROP TABLE `_SubjectGroups`;

-- CreateTable
CREATE TABLE `SubjectGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectId` INTEGER NOT NULL,
    `groupName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SubjectGroup_subjectId_groupName_key`(`subjectId`, `groupName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubjectGroup` ADD CONSTRAINT `SubjectGroup_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
