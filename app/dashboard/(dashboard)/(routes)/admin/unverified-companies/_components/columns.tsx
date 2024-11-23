"use client"; // This makes the component a Client Component

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CompanyRow {
  id: string; 
  companyName: string;
  companyAddress: string;
  contactPerson: string;
  contactEmail: string;
  status: string;
}

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
  },
  {
    accessorKey: "companyAddress",
    header: "Company Address",
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
  },
  {
    accessorKey: "contactEmail",
    header: "Contact Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { original: CompanyRow } }) => {
      const { id, status } = row.original;
      const [loading, setLoading] = useState(false);
      const router = useRouter();

      const handleVerify = async () => {
        setLoading(true);
        try {
          await fetch(`/api/verify-company/${id}`, {
            method: "POST",
          });

          router.refresh();
        } catch (error) {
          console.error("Error verifying company:", error);
        } finally {
          setLoading(false);
        }
      };

      return status === "pending" ? (
        <Button onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </Button>
      ) : (
        "Verified"
      );
    },
  },
];
