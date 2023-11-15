-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "rubroId" TEXT NOT NULL DEFAULT 'clp00mxgt0000jedvsjybqxdd';

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_rubroId_fkey" FOREIGN KEY ("rubroId") REFERENCES "Rubro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
