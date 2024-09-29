"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { employeeSchema, EmployeeSchema } from "@/lib/formValidationSchemas"; // Replace with your employee schema
import { createemployee, updateemployee } from "@/lib/actions"; // Replace with your employee actions
import { useRouter } from "next/navigation";


const EmployeeForm = ({
  type,
  data,
  // setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  // setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeSchema>({
    resolver: zodResolver(employeeSchema),
  });

  const [img, setImg] = useState<any>();

  const [state, setState] = useState({
    success: false,
    error: false,
  });
  
  const formAction = async (formData: any) => {
    try {
      const result = type === "create" 
        ? await createemployee(state, formData) // Pass state as the first argument
        : await updateemployee(state, formData); // Pass state as the first argument
  
      if (result.success) {
        setState({ success: true, error: false });
      } else {
        setState({ success: false, error: true });
      }
    } catch (err) {
      setState({ success: false, error: true });
      console.error(err);
    }
  };
  
  

  const onSubmit = handleSubmit((formData) => {
    formAction({ ...formData, img: img?.secure_url });
  });

  const router = useRouter();


  const { positions } = relatedData || { positions: [] }; // Default to an empty array

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new employee" : "Update the employee"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Salary"
          name="salary"
          defaultValue={data?.salary}
          register={register}
          error={errors.salary}
          type="number"
        />
        <InputField
          label="Birthday"
          name="birthdate"
          defaultValue={data?.birthdate?.toISOString().split("T")[0]}
          register={register}
          error={errors.birthdate}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Gender</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gender")}
            defaultValue={data?.gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender?.message && (
            <p className="text-xs text-red-400">{errors.gender.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Position</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("positionId")}
          defaultValue={data?.positionId}
        >
          {positions.map((position: { PosId: number; name: string }) => ( // Updated to use `name`
            <option value={position.PosId} key={position.PosId}>
              {position.name} // Displaying the name instead of title
            </option>
          ))}
        </select>
        {errors.positionId?.message && (
          <p className="text-xs text-red-400">{errors.positionId.message}</p>
        )}
      </div>

        {/* <CldUploadWidget
          uploadPreset="employee_preset"
          onSuccess={(result, { widget }) => {
            setImg(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image src="/upload.png" alt="" width={28} height={28} />
                <span>Upload a photo</span>
              </div>
            );
          }}
        </CldUploadWidget> */}
      </div>
      {state.error && <span className="text-red-500">Something went wrong!</span>}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default EmployeeForm;
