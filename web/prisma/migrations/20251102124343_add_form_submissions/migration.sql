-- CreateTable
CREATE TABLE "FormSubmission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "message" TEXT,
    "data" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed" BOOLEAN NOT NULL DEFAULT false
);




