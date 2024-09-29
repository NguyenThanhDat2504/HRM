import { gender2, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Seed positions first
  await prisma.position.createMany({
    data: [
      { PosId: 1, name: 'Human Resources', desc: 'Handles employee-related tasks' },
      { PosId: 2, name: 'Software Developer', desc: 'Develops software solutions' },
      { PosId: 3, name: 'Quality Assurance', desc: 'Ensures product quality' },
      { PosId: 4, name: 'Team Lead', desc: 'Leads and manages a team' },
    ],
  });

  // ADMIN
  await prisma.admin.createMany({
    data: [
      { id: "admin1", username: "admin_james" },
      { id: "admin2", username: "admin_linda" },
    ],
  });

  // EMPLOYEE with more realistic data
  await prisma.employee.createMany({
    data: [
      {
        EmployeeId: "emp001",
        name: "Michael Scott",
        email: "michael.scott@dundermifflin.com",
        password: "password123",
        phone: "987-654-3211",
        address: "Scranton, PA",
        gender: gender2.Male,
        birthdate: new Date("1970-03-15"),
        salary: 75000,
        positionId: 4, // Team Lead
      },
      {
        EmployeeId: "emp002",
        name: "Pam Beesly",
        email: "pam.beesly@dundermifflin.com",
        password: "password123",
        phone: "987-654-3212",
        address: "Scranton, PA",
        gender: gender2.Female,
        birthdate: new Date("1980-03-25"),
        salary: 45000,
        positionId: 1, // HR
      },
      {
        EmployeeId: "emp003",
        name: "Jim Halpert",
        email: "jim.halpert@dundermifflin.com",
        password: "password123",
        phone: "987-654-3213",
        address: "Scranton, PA",
        gender: gender2.Male,
        birthdate: new Date("1978-10-01"),
        salary: 65000,
        positionId: 2, // Developer
      },
      {
        EmployeeId: "emp004",
        name: "Dwight Schrute",
        email: "dwight.schrute@dundermifflin.com",
        password: "password123",
        phone: "987-654-3214",
        address: "Scranton, PA",
        gender: gender2.Male,
        birthdate: new Date("1976-01-20"),
        salary: 70000,
        positionId: 3, // Tester (QA)
      },
      {
        EmployeeId: "emp005",
        name: "Angela Martin",
        email: "angela.martin@dundermifflin.com",
        password: "password123",
        phone: "987-654-3215",
        address: "Scranton, PA",
        gender: gender2.Female,
        birthdate: new Date("1974-06-12"),
        salary: 50000,
        positionId: 1, // HR
      },
    ],
  });

  // Leave Requests
  await prisma.leaveRequest.createMany({
    data: [
      {
        ReqId: 1,
        EmployeeId: 'emp001',
        reason: 'Vacation',
        status: 'Approved',
        dateSubmit: new Date("2023-06-01"),
        leaveDate: new Date("2023-08-01"),
      },
      {
        ReqId: 2,
        EmployeeId: 'emp002',
        reason: 'Maternity Leave',
        status: 'Pending',
        dateSubmit: new Date("2023-05-20"),
        leaveDate: new Date("2023-12-01"),
      },
      {
        ReqId: 3,
        EmployeeId: 'emp003',
        reason: 'Sick Leave',
        status: 'Approved',
        dateSubmit: new Date("2023-09-15"),
        leaveDate: new Date("2023-09-20"),
      },
      {
        ReqId: 4,
        EmployeeId: 'emp004',
        reason: 'Family Emergency',
        status: 'Declined',
        dateSubmit: new Date("2023-09-10"),
        leaveDate: new Date("2023-09-12"),
      },
      {
        ReqId: 5,
        EmployeeId: 'emp005',
        reason: 'Conference',
        status: 'Approved',
        dateSubmit: new Date("2023-07-01"),
        leaveDate: new Date("2023-07-15"),
      },
    ],
  });
  await prisma.employee.createMany({
    data: [
      {
        EmployeeId: "emp006",
        name: "Stanley Hudson",
        email: "stanley.hudson@dundermifflin.com",
        password: "password123",
        phone: "987-654-3216",
        address: "Scranton, PA",
        gender: gender2.Male,
        birthdate: new Date("1958-02-19"),
        salary: 48000,
        positionId: 1, // HR
      },
      {
        EmployeeId: "emp007",
        name: "Phyllis Vance",
        email: "phyllis.vance@dundermifflin.com",
        password: "password123",
        phone: "987-654-3217",
        address: "Scranton, PA",
        gender: gender2.Female,
        birthdate: new Date("1955-07-10"),
        salary: 45000,
        positionId: 1, // HR
      },
      {
        EmployeeId: "emp008",
        name: "Kevin Malone",
        email: "kevin.malone@dundermifflin.com",
        password: "password123",
        phone: "987-654-3218",
        address: "Scranton, PA",
        gender: gender2.Male,
        birthdate: new Date("1975-06-01"),
        salary: 43000,
        positionId: 3, // Tester
      },
      {
        EmployeeId: "emp009",
        name: "Oscar Martinez",
        email: "oscar.martinez@dundermifflin.com",
        password: "password123",
        phone: "987-654-3219",
        address: "Scranton, PA",
        gender: gender2.Male,
        birthdate: new Date("1973-02-11"),
        salary: 60000,
        positionId: 2, // Developer
      },
      {
        EmployeeId: "emp010",
        name: "Meredith Palmer",
        email: "meredith.palmer@dundermifflin.com",
        password: "password123",
        phone: "987-654-3220",
        address: "Scranton, PA",
        gender: gender2.Female,
        birthdate: new Date("1965-09-10"),
        salary: 41000,
        positionId: 1, // HR
      },
      {
        EmployeeId: "emp011",
        name: "Ryan Howard",
        email: "ryan.howard@dundermifflin.com",
        password: "password123",
        phone: "987-654-3221",
        address: "Scranton, PA",
        gender: gender2.Male,
        birthdate: new Date("1982-05-05"),
        salary: 51000,
        positionId: 2, // Developer
      },
      {
        EmployeeId: "emp012",
        name: "Kelly Kapoor",
        email: "kelly.kapoor@dundermifflin.com",
        password: "password123",
        phone: "987-654-3222",
        address: "Scranton, PA",
        gender: gender2.Female,
        birthdate: new Date("1980-09-25"),
        salary: 52000,
        positionId: 1, // HR
      },
      {
        EmployeeId: "emp013",
        name: "Creed Bratton",
        email: "creed.bratton@dundermifflin.com",
        password: "password123",
        phone: "987-654-3223",
        address: "Scranton, PA",
        gender: gender2.Male,
        birthdate: new Date("1943-11-01"),
        salary: 35000,
        positionId: 1, // HR
      },
      {
        EmployeeId: "emp014",
        name: "Andy Bernard",
        email: "andy.bernard@dundermifflin.com",
        password: "password123",
        phone: "987-654-3224",
        address: "Scranton, PA",
        gender: gender2.Male,
        birthdate: new Date("1973-07-22"),
        salary: 58000,
        positionId: 4, // Team Lead
      },
      {
        EmployeeId: "emp015",
        name: "Toby Flenderson",
        email: "toby.flenderson@dundermifflin.com",
        password: "password123",
        phone: "987-654-3225",
        address: "Scranton, PA",
        gender: gender2.Male,
        birthdate: new Date("1965-08-22"),
        salary: 62000,
        positionId: 1, // HR
      },
      {
        EmployeeId: "emp016",
        name: "Holly Flax",
        email: "holly.flax@dundermifflin.com",
        password: "password123",
        phone: "987-654-3226",
        address: "Nashua, NH",
        gender: gender2.Female,
        birthdate: new Date("1975-01-15"),
        salary: 58000,
        positionId: 1, // HR
      },
      {
        EmployeeId: "emp017",
        name: "Charles Miner",
        email: "charles.miner@dundermifflin.com",
        password: "password123",
        phone: "987-654-3227",
        address: "Stamford, CT",
        gender: gender2.Male,
        birthdate: new Date("1968-04-18"),
        salary: 90000,
        positionId: 4, // Team Lead
      },
      {
        EmployeeId: "emp018",
        name: "Jan Levinson",
        email: "jan.levinson@dundermifflin.com",
        password: "password123",
        phone: "987-654-3228",
        address: "New York, NY",
        gender: gender2.Female,
        birthdate: new Date("1964-05-13"),
        salary: 110000,
        positionId: 4, // Team Lead
      },
      {
        EmployeeId: "emp019",
        name: "David Wallace",
        email: "david.wallace@dundermifflin.com",
        password: "password123",
        phone: "987-654-3229",
        address: "New York, NY",
        gender: gender2.Male,
        birthdate: new Date("1962-01-21"),
        salary: 120000,
        positionId: 4, // Team Lead
      },
      {
        EmployeeId: "emp020",
        name: "Karen Filippelli",
        email: "karen.filippelli@dundermifflin.com",
        password: "password123",
        phone: "987-654-3230",
        address: "Utica, NY",
        gender: gender2.Female,
        birthdate: new Date("1977-04-15"),
        salary: 61000,
        positionId: 4, // Team Lead
      },
    ],
  });
  

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
