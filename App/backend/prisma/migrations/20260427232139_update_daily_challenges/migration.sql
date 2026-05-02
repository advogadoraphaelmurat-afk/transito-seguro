/*
  Warnings:

  - You are about to drop the column `requirement` on the `DailyChallenge` table. All the data in the column will be lost.
  - Added the required column `type` to the `DailyChallenge` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyChallenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "content" TEXT,
    "rewardXp" INTEGER NOT NULL DEFAULT 10,
    "rewardCoins" INTEGER NOT NULL DEFAULT 5,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DailyChallenge" ("date", "id", "title") SELECT "date", "id", "title" FROM "DailyChallenge";
DROP TABLE "DailyChallenge";
ALTER TABLE "new_DailyChallenge" RENAME TO "DailyChallenge";
CREATE UNIQUE INDEX "DailyChallenge_date_key" ON "DailyChallenge"("date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
