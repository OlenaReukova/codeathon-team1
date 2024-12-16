import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        layout: {
          logoPlacement: "inside",
          socialButtonsPlacement: "bottom",
          showOptionalFields: true,
        },
        elements: {
          card: "lg:shadow-lg p-6 rounded-none sm:shadow-none sm:rounded-none",
          cardHeader: "text-lg font-semibold text-gray-800",
          formFieldInput:
            "mt-1 block w-full rounded-md shadow-sm border p-3 text-bg text-[#37AB87] border-[#37AB87]",
          formButtonPrimary:
            "bg-[#059669] text-white font-bold py-2 px-4 rounded hover:bg-[#037f57]",
          socialButtons: "flex justify-center space-x-4",
          footer: "text-sm text-gray-600 mt-4",
        },
      }}
    />
  );
}
