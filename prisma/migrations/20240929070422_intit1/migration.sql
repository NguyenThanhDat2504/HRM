/*
  Warnings:

  - You are about to drop the column `position` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `password` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LeaveRequestStatus" AS ENUM ('Pending', 'Approved', 'Declined');

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "position",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "positionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "LeaveRequest" (
    "ReqId" SERIAL NOT NULL,
    "EmployeeId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "LeaveRequestStatus" NOT NULL,
    "dateSubmit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaveRequest_pkey" PRIMARY KEY ("ReqId")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("PosId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_EmployeeId_fkey" FOREIGN KEY ("EmployeeId") REFERENCES "Employee"("EmployeeId") ON DELETE RESTRICT ON UPDATE CASCADE;
