"use client";
import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { FaPaypal } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function DonateAsIndividual() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [donorType, setDonorType] = useState<string>("anonymous");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const campaignName = searchParams.get("campaignName") || "";

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (agreed) {
        window.location.href = `https://sandbox.paypal.com/cgi-bin/webscr?cmd=_donations&business=sb-iqpee31411926@business.example.com&
      }`;
      } else {
        alert("You must agree to the disclaimer.");
      }
    },
    [agreed]
  );

  const toggleDisclaimer = () => setShowDisclaimer((prev) => !prev);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg lg:shadow-md ">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Donate as Individual
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="campaignName"
            className="block text-gray-700 mt-1 mb-1"
          >
            Campaign Name
          </label>
          <input
            type="text"
            id="campaignName"
            value={campaignName}
            readOnly
            className="border p-3 rounded-md w-full text-bg text-[#37AB87]  pl-2 border-[#37AB87] "
            aria-live="polite"
          />
        </div>

        <fieldset className=" p-4">
          <legend className="text-gray-700 font-medium">Donation Type</legend>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="anonymous"
              name="donorType"
              value="anonymous"
              checked={donorType === "anonymous"}
              onChange={() => setDonorType("anonymous")}
              className="form-radio h-5 w-5 text-blue-600 border-gray-300 rounded"
              aria-labelledby="anonymousLabel"
            />
            <label
              id="anonymousLabel"
              htmlFor="anonymous"
              className="ml-2 text-gray-700 mt-1 mb-1"
            >
              Donate Anonymously
            </label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="provideDetails"
              name="donorType"
              value="provideDetails"
              checked={donorType === "provideDetails"}
              onChange={() => setDonorType("provideDetails")}
              className="form-radio h-5 w-5 text-blue-600 border-gray-300 rounded"
              aria-labelledby="provideDetailsLabel"
            />
            <label
              id="provideDetailsLabel"
              htmlFor="provideDetails"
              className="ml-2 text-gray-700 mt-1 mb-1"
            >
              Provide Name and Email
            </label>
          </div>
        </fieldset>

        {donorType === "provideDetails" && (
          <>
            <div>
              <label htmlFor="email" className="block text-gray-700 mt-1 mb-1">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-3 rounded-md w-full text-bg text-[#37AB87]  pl-2 border-[#37AB87]"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-gray-700 mt-1 mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-3 rounded-md w-full text-bg text-[#37AB87]  pl-2 border-[#37AB87]"
                placeholder="Enter your full name"
              />
            </div>
          </>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed((prev) => !prev)}
            required
            className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
            id="agreement"
          />
          <label htmlFor="agreement" className="ml-2 text-gray-700 mt-1 mb-1">
            I agree to the{" "}
            <button
              type="button"
              onClick={toggleDisclaimer}
              className="text-blue-500 hover:underline"
            >
              disclaimer
            </button>
          </label>
        </div>
        <div className=" text-center p-2 mt-4 mb-4">
          <Button variant="success" size="lg" border="rounded" type="submit">
            Donate Now <FaPaypal className="ml-2 text-xl" />
          </Button>
        </div>
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
