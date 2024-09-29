import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { eventsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Employee, LeaveRequest } from "@prisma/client";
import Image from "next/image";


const columns = [
  {
    header: "Name",
    accessor: "EmployeeId",
  },
  {
    header: "Reason",
    accessor: "reason",
  },
  {
    header: "Status",
    accessor: "status",
  },
  {
    header: "Submitted Date",
    accessor: "dateSubmit",
  },
  {
    header: "Leave Date",
    accessor: "leaveDate",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: LeaveRequest & {Employee: Employee}) => (
  <tr
    key={item.ReqId}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.Employee?.name}</td>
    <td>{item.reason}</td>
    <td className="hidden md:table-cell">{item.status}</td>
    <td className="hidden md:table-cell">{item.dateSubmit?.getDate() + "/" + item.dateSubmit?.getMonth() + "/" + item.dateSubmit?.getFullYear()}</td>
    <td className="hidden md:table-cell">{item.leaveDate?.getDate() + "/" + item.leaveDate?.getMonth() + "/" + item.leaveDate?.getFullYear()}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="request" type="update" data={item} />
            <FormModal table="request" type="delete" id={item.ReqId} />
          </>
        )}
      </div>
    </td>
  </tr>
);


const LeaveRequestListPage = async ({
  searchParams,
} : {
  searchParams: {[key:string]: string  | undefined};
}) => {

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const [requests, count] = await prisma.$transaction(
    [

      prisma.leaveRequest.findMany({
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
        include: {
          Employee: true,  // Include the position relation
        },
      }),
      prisma.leaveRequest.count(), 
    ]
  ) 
  console.log(requests)


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="request" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={requests} />
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default LeaveRequestListPage;
