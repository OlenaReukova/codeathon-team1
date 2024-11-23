"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useCallback, useEffect } from "react";
import parse from "html-react-parser";
import Spinner from "../../_components/spinner";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { TbBrandX } from "react-icons/tb";

interface Category {
  name: string;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
}

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isReadMore, setIsReadMore] = useState<boolean>(false);
  const [donationType, setDonationType] = useState<
    "individual" | "company" | null
  >(null);
  const [data, setData] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCampaignData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/campaigns/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch campaign data");
        }
        const campaignData: Campaign = await response.json();
        setData(campaignData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignData();
  }, [id]);

  const campaign = useMemo(() => data as Campaign, [data]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("Link copied!"))
      .catch((error) => console.error("Error copying link:", error));
  }, []);

  const toggleReadMore = useCallback(() => {
    setIsReadMore((prev) => !prev);
  }, []);

  const handleDonateNow = useCallback(() => {
    if (donationType) {
      router.push(
        `/campaigns/${id}/donate-as-${donationType}?campaignName=${encodeURIComponent(
          campaign?.title
        )}`
      );
    } else {
      alert("Please select a donation type.");
    }
  }, [donationType, id, campaign?.title, router]);

  if (loading) {
    return (
      <div className="m-6 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-slate-100 text-center">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="m-6 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-slate-100">
        <h1 className="text-2xl font-semibold text-gray-800">
          Campaign Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="m-6 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-slate-100">
      <header className="flex flex-col items-start mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {campaign.title}
        </h1>
        <p className="text-lg text-gray-600 mt-1">{campaign.category.name}</p>
      </header>

      <section className="mb-6">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />
        <p className="mt-4 text-gray-800 leading-relaxed">
          {isReadMore
            ? parse(campaign.description)
            : parse(`${campaign.description.slice(0, 200)}...`)}
          <button
            onClick={toggleReadMore}
            className="text-blue-500 hover:underline ml-1 transition-colors duration-200"
          >
            {isReadMore ? "Read Less" : "Read More"}
          </button>
        </p>
      </section>

      <section className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold text-gray-900">
            Share this campaign:
          </p>
          <div className="flex flex-wrap gap-4">
            <ShareButton
              platform="X"
              url={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `Check out this campaign: ${campaign.title}`
              )}&url=${encodeURIComponent(window.location.href)}`}
              icon={<TbBrandX />}
            />
            <ShareButton
              platform="Facebook"
              url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
              )}`}
              icon={<FaFacebookF />}
            />
            <ShareButton
              platform="LinkedIn"
              url={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                window.location.href
              )}&title=${encodeURIComponent(
                campaign.title
              )}&summary=${encodeURIComponent(
                campaign.description
              )}&source=LinkedIn`}
              icon={<FaLinkedinIn />}
            />
            <ShareButton
              platform="WhatsApp"
              url={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Check out this campaign: ${campaign.title} ${window.location.href}`
              )}`}
              icon={<FaWhatsapp />}
            />
            <ShareButton
              platform="Email"
              url={`mailto:?subject=${encodeURIComponent(
                `Check out this campaign: ${campaign.title}`
              )}&body=${encodeURIComponent(
                `I found this campaign and thought you might be interested in it: ${window.location.href}`
              )}`}
              icon={<FaEnvelope />}
            />
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy Link"
              className="text-[#37AB87] hover:text-[#2e8c6c] text-xl transition-colors duration-200"
            >
              <FiLink />
            </button>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <p className="text-xl font-semibold text-gray-900 mb-4">
          Select Donation Type
        </p>
        <div className="flex flex-col space-y-3 mb-6">
          {["individual", "company"].map((type) => (
            <label
              key={type}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="donation-type"
                value={type}
                checked={donationType === type}
                onChange={() =>
                  setDonationType(type as "individual" | "company")
                }
                className="h-5 w-5 text-[#37AB87] border-gray-300 rounded focus:ring-[#37AB87] transition-colors duration-200"
                aria-checked={donationType === type ? "true" : "false"}
              />
              <span className="text-gray-800 text-lg">
                Donate as {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </label>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleDonateNow}
            className="bg-[#059669] hover:bg-[#037f57] text-white text-sm py-2 px-5 w-36 mx-auto rounded-full transition-all duration-200"
          >
            Donate Now
          </button>
        </div>
      </section>
    </div>
  );
};

interface ShareButtonProps {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

const ShareButton: React.FC<ShareButtonProps> = ({ platform, url, icon }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
    aria-label={`Share on ${platform}`}
  >
    {icon}
  </a>
);

export default CampaignDetails;
