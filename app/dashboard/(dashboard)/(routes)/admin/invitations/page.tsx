"use client";

import { useOrganization } from "@clerk/nextjs";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const InvitationList = () => {
  const OrgInvitationsParams = {
    invitations: {
      pageSize: 5,
      keepPreviousData: true,
    },
  };

  const MembershipRequestsParams = {
    membershipRequests: {
      pageSize: 5,
      keepPreviousData: true,
    },
  };

  const { isLoaded, invitations } = useOrganization({
    ...OrgInvitationsParams,
    ...MembershipRequestsParams,
  });

  if (!isLoaded) {
    return <>Loading</>;
  }

  const invitedUsers = invitations?.data?.map((inv) => {
    return inv;
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={invitedUsers!} />
    </div>
  );
};

export default InvitationList;
