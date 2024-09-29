"use server";

import { revalidatePath } from "next/cache";
import {
  leaveRequestSchema,
  employeeSchema,
  EmployeeSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

type CurrentState = { success: boolean; error: boolean };


export const createemployee = async (
    currentState: CurrentState,
    data: EmployeeSchema
  ) => {
    try {
      const user = await clerkClient.users.createUser({
        emailAddress: [data.email!],
        username: data.email,
        password: data.password,
        publicMetadata: { role: "employee" },
      });
  
      await prisma.employee.create({
        data: {
          EmployeeId: user.id,
          email: data.email!,
          password: data.password!,
          name: data.name,
          gender: data.gender, 
          phone: data.phone || null,
          address: data.address || null,
          birthdate: data.birthdate || null,
          salary: new Prisma.Decimal(5000), // Use a fixed salary for now
          positionId: 1, // Set default positionId or adjust based on input
          img: data.img || null,
        },
      });
  
      // revalidatePath("/list/employees");
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  
  export const updateemployee = async (
    currentState: CurrentState,
    data: EmployeeSchema
  ) => {
    if (!data.EmployeeId) {
      return { success: false, error: true };
    }
    try {
      const user = await clerkClient.users.updateUser(data.EmployeeId!, {
        username: data.email,
        ...(data.password !== "" && { password: data.password }),
      });
  
      await prisma.employee.update({
        where: {
          EmployeeId: data.EmployeeId,
        },
        data: {
          ...(data.password !== "" && { password: data.password }),
          email: data.email!,
          name: data.name,
          gender: data.gender,
          phone: data.phone || null,
          address: data.address || null,
          birthdate: data.birthdate || null,
          salary: new Prisma.Decimal(5000), // Optional salary logic can be modified
          img: data.img || null,
        },
      });
      // revalidatePath("/list/employees");
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  
  export const deleteemployee = async (
    currentState: CurrentState,
    data: FormData
  ) => {
    const id = data.get("id") as string;
    try {
      await clerkClient.users.deleteUser(id);
  
      await prisma.employee.delete({
        where: {
          EmployeeId: id,
        },
      });
  
      // revalidatePath("/list/employees");
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  
