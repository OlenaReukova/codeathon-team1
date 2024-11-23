import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";

interface CompanyRow {
  id: string; 
  companyName: string;
  companyAddress: string;
  contactPerson: string;
  contactEmail: string;
  status: string;
}

const CompaniesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const companies = await db.company.findMany({
    where: { status: "pending" },
    orderBy: {
      id: "desc",
    },
  });


  const formattedCompanies: CompanyRow[] = companies.map((company) => ({
    id: String(company.id),
    companyName: company.companyName,
    companyAddress: company.companyAddress,
    contactPerson: company.contactPerson,
    contactEmail: company.contactEmail,
    status: company.status,
  }));

  return (
    <div className="p-6">
      <DataTable columns={columns} data={formattedCompanies} />
    </div>
  );
};

export default CompaniesPage;
