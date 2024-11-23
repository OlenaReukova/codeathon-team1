// app/dashboard/(dashboard)/(routes)/admin/roles/page.tsx
"use client";

import { useOrganization } from "@clerk/nextjs";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import SelectRole from "./_components/select-role";

const ManageRoles = () => {
  const { isLoaded, memberships } = useOrganization({
    memberships: {
      pageSize: 5,
      keepPreviousData: true,
    },
  });

  const organizationUsers = memberships?.data?.map((mem) => {
    return mem;
  });

  if (!isLoaded) {
    return <>Loading</>;
  }

  return (
    <div className="p-6">
      <SelectRole /> 
      <DataTable columns={columns} data={organizationUsers!} />
    </div>
  );
};


export default ManageRoles;
