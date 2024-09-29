import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, employeesData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Employee, Position } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";


const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Position",
    accessor: "position",
    className: "hidden md:table-cell",
  },
  {
    header: "Salary",
    accessor: "salary",
    className: "hidden md:table-cell",
  },
  {
    header: "Date of Birth",
    accessor: "birthdate",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: Employee & {position:Position}) => (
  <tr
    key={item.EmployeeId}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || "/avatar.png"}
        alt=""
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item?.email}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.position?.name}</td>
    <td className="hidden md:table-cell">{item.salary?.toString()}</td>
    <td className="hidden md:table-cell">{item.birthdate?.getDate() + "/" + item.birthdate?.getMonth() + "/" + item.birthdate?.getFullYear()}</td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/employees/${item.EmployeeId}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
            <Image src="/view.png" alt="" width={16} height={16} />
          </button>
        </Link>
        {role === "admin" && (
          // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
          //   <Image src="/delete.png" alt="" width={16} height={16} />
          // </button>
          <FormModal table="employee" type="delete" id={parseInt(item.EmployeeId)}/>
        )}
      </div>
    </td>
  </tr>
);

const EmployeeListPage = async ({
  searchParams,
} : {
  searchParams: {[key:string]: string  | undefined};
}) => {

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const [employees, count] = await prisma.$transaction(
    [

      prisma.employee.findMany({
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
        include: {
          position: true,  // Include the position relation
        },
      }),
      prisma.employee.count(), 
    ]
  ) 
  // console.log(employees)

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Employees</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="employee" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={employees} />
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default EmployeeListPage;
