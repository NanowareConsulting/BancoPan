/*
  Warnings:

  - You are about to drop the column `total` on the `Loan` table. All the data in the column will be lost.
  - Changed the type of `cvv` on the `OldCreditCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "total";

-- AlterTable
ALTER TABLE "OldCreditCard" DROP COLUMN "cvv",
ADD COLUMN     "cvv" INTEGER NOT NULL;
