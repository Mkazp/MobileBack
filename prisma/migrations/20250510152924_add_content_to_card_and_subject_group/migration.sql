/*
  Warnings:

  - You are about to drop the column `file_name` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `file_url` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Card` DROP COLUMN `file_name`,
    DROP COLUMN `file_url`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `avatar_url`;
