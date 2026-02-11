"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const steps = [
    { title: "Welcome!", path: "/onboarding" },
    { title: "Profile", path: "/onboarding/profile" },
    { title: "Integrations", path: "/onboarding/integrations" },
  ];

  const currentStepIndex = steps.findIndex(step => pathname === step.path);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center relative">
            <div className="flex-1 flex justify-center">
               <nav className="flex items-center space-x-12 sm:space-x-24">
                  {steps.map((step, index) => {
                    const isActive = pathname === step.path;
                    const isCompleted = currentStepIndex > index;

                    return (
                      <div key={step.path} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                          isActive ? "bg-brand-500 text-white shadow-lg ring-4 ring-brand-50 dark:ring-brand-900/30" :
                          isCompleted ? "bg-success-500 text-white" :
                          "bg-gray-200 dark:bg-gray-700 text-gray-500"
                        }`}>
                          {isCompleted ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                          ) : index + 1}
                        </div>
                        <span className={`text-sm font-medium transition-colors duration-300 ${
                          isActive ? "text-brand-500" :
                          isCompleted ? "text-success-600" :
                          "text-gray-400"
                        }`}>{step.title}</span>
                      </div>
                    );
                  })}
               </nav>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center pt-12 pb-20 px-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
