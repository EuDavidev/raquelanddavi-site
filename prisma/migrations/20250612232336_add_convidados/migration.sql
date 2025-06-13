/*
  Warnings:

  - Added the required column `categoriaId` to the `Presente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Presente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `presente` ADD COLUMN `categoriaId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `descricao` TEXT NULL,
    ADD COLUMN `imagem` VARCHAR(255) NULL,
    ADD COLUMN `link` VARCHAR(255) NULL,
    ADD COLUMN `preco` DOUBLE NULL,
    ADD COLUMN `reservadoPor` VARCHAR(100) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Categoria_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Convidado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NULL,
    `confirmado` BOOLEAN NOT NULL DEFAULT false,
    `mensagem` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Presente` ADD CONSTRAINT `Presente_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
