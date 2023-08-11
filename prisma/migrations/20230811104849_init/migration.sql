/*
  Warnings:

  - You are about to drop the column `objective` on the `MailLog` table. All the data in the column will be lost.
  - Added the required column `topic` to the `MailLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MailLog" DROP COLUMN "objective",
ADD COLUMN     "topic" TEXT NOT NULL;
