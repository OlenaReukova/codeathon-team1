import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SearchInput } from "@/components/search-input";
import { getCampaigns } from "@/actions/get-campaigns";
import { CampaignsList } from "@/components/campaigns-list";
import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

interface CampaignWithProgressWithCategory {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  fund: number | null;
  isPublished: boolean;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
  category: { id: string; name: string } | null;
  campaigns: { id: string }[]; 
  progress: number | null; 
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  console.log("categories", categories);

  const campaignsData = await getCampaigns({
    ...searchParams,
  });

  const campaigns: CampaignWithProgressWithCategory[] = campaignsData.map(
    (campaign) => ({
      ...campaign,
      campaigns: [], 
      progress: null, 
    })
  );

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        {campaigns.length !== 0 && <Categories items={categories} />}
        <CampaignsList items={campaigns} />
      </div>
    </>
  );
};

export default SearchPage;
