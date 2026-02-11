import Button from "@/components/ui/button/Button";
import Link from "next/link";

export default function OnboardingWelcome() {
  return (
    <div className="max-w-4xl w-full text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Welcome to 3Dsellers Platform!
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-12">
        You are one step closer to the best solution to enhance your eCommerce business.
      </p>

      <div className="relative mb-12 flex justify-center">
        {/* Placeholder for the large illustration in the image */}
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-theme-lg p-8 relative overflow-hidden min-h-[400px] flex items-center justify-center border border-gray-100 dark:border-gray-700">
           <div className="grid grid-cols-3 gap-4 w-full">
              <div className="col-span-2 space-y-4">
                 <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                 <div className="h-32 bg-gray-50 dark:bg-gray-900/50 rounded-lg animate-pulse"></div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-gray-50 dark:bg-gray-900/50 rounded-lg animate-pulse"></div>
                    <div className="h-20 bg-gray-50 dark:bg-gray-900/50 rounded-lg animate-pulse"></div>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="h-full bg-gray-50 dark:bg-gray-900/50 rounded-lg animate-pulse"></div>
              </div>
           </div>

           {/* Floating elements styling to match image */}
           <div className="absolute top-10 left-10 w-12 h-12 bg-yellow-400/20 rounded-full blur-xl"></div>
           <div className="absolute bottom-10 right-10 w-12 h-12 bg-blue-400/20 rounded-full blur-xl"></div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Let&apos;s get you started by setting up your profile, so we can tailor our app to meet all of your business needs.
        </p>
        <Link href="/onboarding/profile">
          <Button className="px-12 py-3 text-lg font-semibold bg-brand-500 hover:bg-brand-600 text-white rounded-full transition-all transform hover:scale-105 shadow-theme-md">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Floating steps info shown in the second image */}
      <div className="fixed right-10 bottom-10 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 hidden lg:block text-left">
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">Mastering The Basics</h3>
          <p className="text-sm text-gray-500">5 Steps, to make you feel at home!</p>
        </div>

        <div className="space-y-4 mb-6">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-xs border border-blue-200 dark:border-blue-800">1</div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Connect your integrations</span>
           </div>
           <div className="flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">2</div>
              <span className="text-sm font-semibold">Sync your listings</span>
           </div>
           <div className="flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">3</div>
              <span className="text-sm font-semibold">Invite your Team</span>
           </div>
        </div>

        <div className="text-xs text-center text-gray-400">
          About 7 minutes
        </div>
      </div>
    </div>
  );
}
