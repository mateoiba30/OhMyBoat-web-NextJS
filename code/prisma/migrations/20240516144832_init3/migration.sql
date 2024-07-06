/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CardPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idCompletePost" TEXT NOT NULL,
    "boat" BOOLEAN NOT NULL,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "modelo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VehiclePost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idPublisher" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "patente" TEXT NOT NULL,
    "kilometraje" TEXT NOT NULL,
    "cantPuertas" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BoatPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idPublisher" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "eslora" TEXT NOT NULL,
    "manga" TEXT NOT NULL,
    "metros" TEXT NOT NULL,
    "deuda" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idPublisher" TEXT NOT NULL,
    "idReviewed" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "description" TEXT NOT NULL
);
