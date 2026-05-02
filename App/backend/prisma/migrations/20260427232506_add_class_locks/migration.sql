-- CreateTable
CREATE TABLE "ClassModuleLock" (
    "classId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "isUnlocked" BOOLEAN NOT NULL DEFAULT false,
    "unlockedAt" DATETIME,

    PRIMARY KEY ("classId", "moduleId"),
    CONSTRAINT "ClassModuleLock_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClassModuleLock_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
