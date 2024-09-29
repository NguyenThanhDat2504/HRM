/*
  Warnings:

  - Added the required column `leaveDate` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeaveRequest" ADD COLUMN     "leaveDate" TIMESTAMP(3) NOT NULL;
