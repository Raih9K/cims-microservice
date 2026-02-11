import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { PencilIcon, UserCircleIcon } from "@/icons";
import Link from "next/link";

export default function OnboardingProfile() {
  const sellingPlatforms = [
    { id: "ebay", name: "eBay", logo: "/images/platforms/ebay.svg" },
    { id: "amazon", name: "Amazon", logo: "/images/platforms/amazon.svg" },
    { id: "etsy", name: "Etsy", logo: "/images/platforms/etsy.svg" },
    { id: "shopify", name: "Shopify", logo: "/images/platforms/shopify.svg" },
    { id: "bigcommerce", name: "Bigcommerce", logo: "/images/platforms/bigcommerce.svg" },
    { id: "woocommerce", name: "Woocommerce", logo: "/images/platforms/woocommerce.svg" },
    { id: "walmart", name: "Walmart", logo: "/images/platforms/walmart.svg" },
    { id: "facebook", name: "Facebook", logo: "/images/platforms/facebook.svg" },
    { id: "googleshopping", name: "Google Shopping", logo: "/images/platforms/google-shopping.svg" },
    { id: "tiktok", name: "Tiktok", logo: "/images/platforms/tiktok.svg" },
  ];

  return (
    <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 sm:p-12 mb-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Setting up your profile
      </h2>

      <div className="space-y-12">
        {/* Personal Information */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6 font-medium">Personal Information</h3>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group">
               <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                  <span className="text-gray-400 group-hover:opacity-0 transition-opacity">
                     <UserCircleIcon className="w-20 h-20" />
                  </span>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                     <PencilIcon className="text-white w-8 h-8" />
                  </div>
               </div>
               <button className="absolute bottom-1 right-1 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md border border-gray-100 dark:border-gray-600">
                  <PencilIcon className="w-4 h-4 text-brand-500" />
               </button>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
               <div className="space-y-2">
                  <Label>First name</Label>
                  <Input placeholder="Enter First Name" />
               </div>
               <div className="space-y-2">
                  <Label>Last name</Label>
                  <Input placeholder="Enter Last Name" />
               </div>
               <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                     Time zone: <span className="text-brand-500 font-medium cursor-pointer underline">(+06:00) Asia/Dhaka</span>
                     <PencilIcon className="w-3 h-3 text-brand-500" />
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* Business Information */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6 font-medium">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
               <Label>Business Name</Label>
               <Input placeholder="Business Name" />
            </div>
            <div className="space-y-2">
               <Label>Business Type</Label>
               <select className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all">
                  <option>Select Type</option>
                  <option>Retail</option>
                  <option>Wholesale</option>
               </select>
            </div>
            <div className="space-y-2">
               <Label>Number of Employees</Label>
               <select className="w-full h-11 px-4 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all">
                  <option>Number of Employees</option>
                  <option>1-10</option>
                  <option>11-50</option>
               </select>
            </div>
          </div>
        </section>

        {/* Selling Platforms */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6 font-medium">Where are you currently selling?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-4 gap-x-8">
            {sellingPlatforms.map((platform) => (
              <label key={platform.id} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 transition-all cursor-pointer" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{platform.name}</span>
              </label>
            ))}
          </div>
          <div className="mt-8 space-y-2">
             <Label>Other:</Label>
             <textarea className="w-full rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 p-4 min-h-[100px] outline-none focus:ring-2 focus:ring-brand-500" placeholder="Type here..."></textarea>
          </div>
        </section>

        <div className="flex justify-center gap-4 pt-8">
            <Link href="/onboarding" className="flex-1 max-w-[160px]">
               <Button variant="outline" className="w-full py-2.5 rounded-full font-semibold border-2 border-brand-500 text-brand-500 hover:bg-brand-50 transition-all">
                  Back
               </Button>
            </Link>
          <Link href="/onboarding/integrations" className="flex-1 max-w-[160px]">
            <Button className="w-full py-2.5 rounded-full font-semibold bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-200 transition-all">
              Next Step
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
