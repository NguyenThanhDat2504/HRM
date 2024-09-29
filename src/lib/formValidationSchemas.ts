import { z } from "zod";

export const employeeSchema = z.object({
    EmployeeId: z.string().optional(), // EmployeeId is the primary key in Prisma
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long!" })
      .optional()
      .or(z.literal("")), // Optional for updates, required for creation
    name: z.string().min(1, { message: "Name is required!" }), // Full name field
    email: z
      .string()
      .email({ message: "Invalid email address!" })
      .optional()
      .or(z.literal("")), // Optional email for updates
    phone: z.string().optional(), // Optional phone number
    address: z.string().optional(), // Address is optional in the model
    birthdate: z.coerce.date({ message: "Birthdate is required!" }), // Birthdate as a Date object
    gender: z.enum(["Male", "Female"], { message: "Gender is required!" }), // Matches enum `gender2` in Prisma
    salary: z.number().min(0, { message: "Salary must be a positive number!" }), // Salary field
    positionId: z.number().min(1, { message: "Position is required!" }), // positionId to match the Prisma relation
    img: z.string().optional(), // Optional employee image
  });
  

export type EmployeeSchema = z.infer<typeof employeeSchema>;

export const leaveRequestSchema = z.object({
    ReqId: z.coerce.number().optional(), // ReqId is optional for updates
    EmployeeId: z.string().min(1, { message: "Employee ID is required!" }), // EmployeeId is required
    reason: z.string().min(1, { message: "Reason is required!" }), // Reason for the leave
    status: z.enum(["Pending", "Approved", "Declined"]).default("Pending"), // Default status is Pending
    dateSubmit: z.coerce.date().optional(), // Optional, as it defaults to the current date
    leaveDate: z.coerce.date({ message: "Leave date is required!" }), // Required leave date
  });
  
  export type LeaveRequestSchema = z.infer<typeof leaveRequestSchema>;
  