"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { FaPaypal } from "react-icons/fa";

const COMPANIES = ["Company A", "Company B", "Company C", "Company D"];

export default function DonateAsCompany() {
  const [email, setEmail] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [newCompanyName, setNewCompanyName] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const campaignName = searchParams.get("campaignName") || "";

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate that new company name is provided if "Other" is selected
      if (companyName === "Other" && newCompanyName.trim() === "") {
        alert("Please enter a new company name.");
        return;
      }

      if (agreed) {

        window.location.href = `https://sandbox.paypal.com/cgi-bin/webscr?cmd=_donations&business=sb-iqpee31411926@business.example.com&item_name=${encodeURIComponent(
          campaignName
        )}`;
      } else {
        alert("You must agree to the disclaimer.");
      }
    },
    [agreed, campaignName, companyName, newCompanyName]
  );

  const toggleDisclaimer = () => setShowDisclaimer((prev) => !prev);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Donate as Company
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="campaignName" className="block text-gray-700">
            Campaign Name
          </label>
          <input
            type="text"
            id="campaignName"
            value={campaignName}
            readOnly
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
            aria-live="polite"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-gray-700">
            Company Name
          </label>
          <select
            id="companyName"
            value={companyName}
            onChange={(e) => {
              const value = e.target.value;
              setCompanyName(value);
              if (value !== "Other") setNewCompanyName("");
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="" disabled>
              Select a company
            </option>
            {COMPANIES.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>

          {companyName === "Other" && (
            <div className="mt-2">
              <label htmlFor="newCompanyName" className="block text-gray-700">
                Enter New Company Name
              </label>
              <input
                type="text"
                id="newCompanyName"
                placeholder="e.g., Your New Company"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required={companyName === "Other"}
              />
              {newCompanyName.trim() === "" && (
                <p className="text-red-600 mt-1">
                  New company name cannot be empty.
                </p>
              )}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => {
                setAgreed((prev) => !prev);
              }}
              required
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
            <span className="ml-2 text-gray-700">
              I agree to the{" "}
              <button
                type="button"
                onClick={toggleDisclaimer}
                className="text-blue-500 hover:underline"
              >
                disclaimer
              </button>
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#059669] hover:bg-[#037f57] text-white text-sm py-2 px-5 w-full rounded-full flex items-center justify-center focus:outline-none focus:ring focus:ring-blue-300 transition duration-150"
        >
          Donate Now <FaPaypal className="ml-2 text-xl" />
        </button>
      </form>

      {showDisclaimer && (
        <div className="mt-4 p-4 bg-gray-100 border rounded-md">
          <h2 className="font-semibold">Disclaimer</h2>
          <p className="mt-2 text-gray-600">
            Your donations support the specified campaign and help make a
            difference. By agreeing, you consent to share your data with the
            campaign organizers for processing your donation and communicating
            future updates. Please ensure that you agree with these terms before
            proceeding.
          </p>
          <button
            onClick={toggleDisclaimer}
            className="mt-2 text-blue-500 hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
