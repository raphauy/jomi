-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_rubroId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "rubroId" DROP NOT NULL,
ALTER COLUMN "rubroId" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_rubroId_fkey" FOREIGN KEY ("rubroId") REFERENCES "Rubro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
