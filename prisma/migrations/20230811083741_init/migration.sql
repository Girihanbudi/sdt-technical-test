/*
  Warnings:

  - You are about to drop the `MailEventLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MailEventLog";

-- CreateTable
CREATE TABLE "EventLog" (
    "id" SERIAL NOT NULL,
    "StartedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "EndedAt" TIMESTAMP(3) NOT NULL,
    "objective" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "log" TEXT,

    CONSTRAINT "EventLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MailLog" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "objective" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "response" TEXT,

    CONSTRAINT "MailLog_pkey" PRIMARY KEY ("id")
);
