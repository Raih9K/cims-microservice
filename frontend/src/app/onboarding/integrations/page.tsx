import Button from "@/components/ui/button/Button";
import Image from "next/image";
import Link from "next/link";

export default function OnboardingIntegrations() {
  const platforms = [
    { name: "eBay", logo: "https://www.vectorlogo.zone/logos/ebay/ebay-ar21.svg" },
    { name: "Amazon", logo: "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg" },
    { name: "Etsy", logo: "https://www.vectorlogo.zone/logos/etsy/etsy-ar21.svg" },
    { name: "Shopify", logo: "https://www.vectorlogo.zone/logos/shopify/shopify-ar21.svg" },
    { name: "Bigcommerce", logo: "https://www.vectorlogo.zone/logos/bigcommerce/bigcommerce-ar21.svg" },
    { name: "Woocommerce", logo: "https://www.vectorlogo.zone/logos/woocommerce/woocommerce-ar21.svg" },
    { name: "Walmart", logo: "https://www.vectorlogo.zone/logos/walmart/walmart-ar21.svg" },
    { name: "Meta", logo: "https://www.vectorlogo.zone/logos/facebook/facebook-ar21.svg" },
    { name: "Google Shopping", logo: "https://www.vectorlogo.zone/logos/google/google-ar21.svg" },
    { name: "Tiktok", logo: "https://www.vectorlogo.zone/logos/tiktok/tiktok-ar21.svg" },
  ];

  return (
    <div className="max-w-4xl w-full">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-12">
        <div className="p-8 sm:p-12">
           <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
             Let&apos;s Connect Your Selling Accounts
           </h2>
           <p className="text-center text-gray-500 mb-12">Please select the integration you would like to connect:</p>

           {/* Hot Offers Banner */}
           <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl p-4 mb-12 relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <div className="flex items-center gap-3 mb-2">
                 <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Offer</span>
                 <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    🔥 Hot offers exclusive for 3Dsellers users:
                 </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                 <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">S</span>
                    <span>Shopify: Get first 3 months of for $1. <a href="#" className="text-brand-500 hover:underline">Claim Offer Now</a></span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">W</span>
                    <span>Walmart: Up to $75K in incentives! <a href="#" className="text-brand-500 hover:underline">Claim Offer Now</a></span>
                 </div>
              </div>
           </div>

           {/* Integrations Grid */}
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
              {platforms.map((platform) => (
                 <div key={platform.name} className="group cursor-pointer">
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 h-32 flex flex-col items-center justify-center gap-4 transition-all hover:shadow-lg hover:border-brand-200 dark:hover:border-brand-800 transform hover:-translate-y-1">
                       <Image src={platform.logo} alt={platform.name} width={120} height={32} className="h-8 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" unoptimized />
                       <span className="text-xs font-semibold text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">Add Account</span>
                    </div>
                 </div>
              ))}
           </div>

           <div className="flex justify-center gap-4">
              <Link href="/onboarding/profile" className="flex-1 max-w-[160px]">
                 <Button variant="outline" className="w-full py-2.5 rounded-full font-semibold border-2 border-brand-500 text-brand-500 hover:bg-brand-50 transition-all">
                    Back
                 </Button>
              </Link>
              <Link href="/" className="flex-1 max-w-[200px]">
                 <Button className="w-full py-2.5 rounded-full font-semibold bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-200 transition-all">
                    Finish
                 </Button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
