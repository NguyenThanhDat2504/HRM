"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  EmployeeId: z.string().min(1, { message: "Employee ID is required!" }),
  reason: z.string().min(1, { message: "Reason is required!" }),
  status: z.enum(["Pending", "Approved", "Declined"], { message: "Status is required!" }),
  leaveDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format!" })
    .transform((val) => new Date(val)),
});

type Inputs = z.infer<typeof schema>;

const LeaveRequestForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a new leave request" : "Update leave request"}</h1>
      <span className="text-xs text-gray-400 font-medium">Leave Request Information</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Employee ID"
          name="EmployeeId"
          defaultValue={data?.EmployeeId}
          register={register}
          error={errors?.EmployeeId}
        />
        <InputField
          label="Reason"
          name="reason"
          defaultValue={data?.reason}
          register={register}
          error={errors?.reason}
        />
        <div className="hidden">
            <label className="text-xs text-gray-500">Status</label>
            <input
                type="hidden"
                {...register("status")}
                defaultValue={data?.status || "Pending"} // Default to 'Pending' if no status is provided
            />
            {errors.status?.message && (
                <p className="text-xs text-red-400">
                {errors.status.message.toString()}
                </p>
            )}
        </div>

        <InputField
            label="Leave Date"
            name="leaveDate"
            defaultValue={data?.leaveDate ? data.leaveDate.toISOString().split('T')[0] : ''} // Format date to YYYY-MM-DD
            register={register}
            error={errors.leaveDate}
            type="date"
        />

        <InputField
          label="Describe your reason"
          name="desc"
          defaultValue={data?.desc}
          register={register}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default LeaveRequestForm;
