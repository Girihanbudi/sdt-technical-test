-- CreateTable
CREATE TABLE "MailEventLog" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "objective" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "error" TEXT,
    "response" TEXT,

    CONSTRAINT "MailEventLog_pkey" PRIMARY KEY ("id")
);
