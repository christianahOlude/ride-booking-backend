/*
  Warnings:

  - The values [CASH] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMMISSION_DEDUCTION,CASH_COLLECTED] on the enum `TxPurpose` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `companyName` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCardUrl` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basePrice` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('TRANSFER', 'CARD', 'WALLET');
ALTER TABLE "public"."Payment" ALTER COLUMN "paymentMethod" DROP DEFAULT;
ALTER TABLE "Payment" ALTER COLUMN "paymentMethod" TYPE "PaymentMethod_new" USING ("paymentMethod"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "public"."PaymentMethod_old";
ALTER TABLE "Payment" ALTER COLUMN "paymentMethod" SET DEFAULT 'TRANSFER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TxPurpose_new" AS ENUM ('TRIP_EARNINGS', 'COMMISSION_EARNED', 'WITHDRAWAL');
ALTER TABLE "Transaction" ALTER COLUMN "purpose" TYPE "TxPurpose_new" USING ("purpose"::text::"TxPurpose_new");
ALTER TYPE "TxPurpose" RENAME TO "TxPurpose_old";
ALTER TYPE "TxPurpose_new" RENAME TO "TxPurpose";
DROP TYPE "public"."TxPurpose_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_walletId_fkey";

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "idCardUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "paymentMethod" SET DEFAULT 'TRANSFER';

-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "negotiatedPrice" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "ownerWalletId" TEXT,
ALTER COLUMN "walletId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "basePrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CarOwner" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnerWallet" (
    "id" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "OwnerWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CarOwner_email_key" ON "CarOwner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CarOwner_phoneNumber_key" ON "CarOwner"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "OwnerWallet_ownerId_key" ON "OwnerWallet"("ownerId");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "CarOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerWallet" ADD CONSTRAINT "OwnerWallet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "CarOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_ownerWalletId_fkey" FOREIGN KEY ("ownerWalletId") REFERENCES "OwnerWallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
