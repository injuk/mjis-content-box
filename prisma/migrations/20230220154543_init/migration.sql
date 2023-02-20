-- CreateEnum
CREATE TYPE "USER_ROLES" AS ENUM ('ADMIN', 'USER', 'GUEST');

-- CreateEnum
CREATE TYPE "REVIEW_DOMAINS" AS ENUM ('BOOK', 'MOVIE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "role" "USER_ROLES" NOT NULL DEFAULT 'USER',
    "email" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "original_title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "publisher" VARCHAR(100),
    "published_at" DATE,
    "isbn" VARCHAR(20) NOT NULL,
    "genre" VARCHAR(20),
    "cover_url" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" INTEGER NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "user_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "domain" "REVIEW_DOMAINS" NOT NULL,
    "rating" INTEGER NOT NULL,
    "content" TEXT,
    "has_spoiler" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("user_id","item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "books_author_isbn_key" ON "books"("author", "isbn");

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "reviews"("user_id");

-- CreateIndex
CREATE INDEX "reviews_item_id_idx" ON "reviews"("item_id");
