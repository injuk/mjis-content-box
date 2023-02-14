/*
  Warnings:

  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `book_id` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `item_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_book_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_user_id_fkey";

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "book_id",
ADD COLUMN     "item_id" INTEGER NOT NULL,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("user_id", "item_id");

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "reviews"("user_id");

-- CreateIndex
CREATE INDEX "reviews_item_id_idx" ON "reviews"("item_id");
