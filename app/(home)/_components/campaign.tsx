"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { Campaign, Category } from "@prisma/client";
import parse from "html-react-parser";
import Spinner from "./spinner";

type CampaignWithProgressWithCategory = Campaign & {
  category: Category | null;
  campaigns: { id: string }[];
};

interface CampaignApiResponse {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  fund: number;
  category: { name: string };
}

interface CampaignsListProps {
  items: CampaignWithProgressWithCategory[];
}

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  fund: number;
  category: string;
}

const CampaignCard = ({
  id,
  title,
  description,
  imageUrl,
}: CampaignCardProps) => {
  const truncatedBody =
    description.length > 300 ? `${description.slice(0, 300)}...` : description;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 text-sm flex-1">{parse(truncatedBody)}</p>
      </div>
      <div className="p-4 border-t border-gray-200 text-center">
        <Link href={`/campaigns/${id}`}>
          <Button variant="success" size="lg">
            Donate now
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Campaigns = ({ items }: CampaignsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 3;
  const [data, setData] = useState<CampaignApiResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/campaigns");
        const campaigns = await response.json();
        setData(campaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();

    return () => {
      setData(null);
      setCurrentPage(1);
      setIsLoading(true);
    };
  }, []);

  const uniqueCategories = Array.from(
    new Set(data?.map((campaign) => campaign.category.name))
  );

  const filteredCampaigns =
    data?.filter((campaign) => {
      const matchesSearch = campaign.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        category === "" || campaign.category.name === category;
      return matchesSearch && matchesCategory;
    }) || [];

  const totalPages = Math.ceil(filteredCampaigns.length / campaignsPerPage);
  const currentCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * campaignsPerPage,
    currentPage * campaignsPerPage
  );

  return (
    <div>
      <div className="bg-[#059669] text-white text-center py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Donate to BIG Alliance
        </h1>
        <p className="text-base md:text-lg">
          People in crisis need your help. Your donation will change lives.
        </p>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-3 rounded-md w-full text-sm pl-12 focus:border-[#37AB87] focus:ring-[#37AB87] transition-all"
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 116.15 13.65z"
              />
            </svg>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-md w-full md:w-48 text-sm focus:border-[#059669] focus:ring-[#059669] transition-all"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <Spinner />
        ) : currentCampaigns && currentCampaigns.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  id={campaign.id}
                  title={campaign.title}
                  description={campaign.description}
                  imageUrl={campaign.imageUrl}
                  fund={campaign.fund}
                  category={campaign.category.name}
                />
              ))}
            </div>
            <div className="flex justify-between items-center mt-8">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center bg-[none] hover:bg-[none] text-[#059669] hover:text-[#037f57] text-sm py-2 px-5 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#037f57] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center bg-[none] hover:bg-[none] text-[#059669] hover:text-[#037f57] text-sm py-2 px-5 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#037f57] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No campaigns found. Try adjusting your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
