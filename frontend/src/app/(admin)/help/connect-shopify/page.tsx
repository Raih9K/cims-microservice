"use client";
import { ChevronLeftIcon, InfoIcon } from "@/icons";
import NextImage from "next/image";
import Link from "next/link";

export default function ConnectShopifyHelpPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-white select-none font-outfit">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/dashboard" className="hover:text-brand-500 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/settings/integrations" className="hover:text-brand-500 transition-colors">Integrations</Link>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-900 uppercase tracking-widest text-[10px]">Shopify Guide</span>
      </nav>

      <div className="max-w-3xl mx-auto py-12">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center border border-emerald-100 mb-6 shadow-sm">
            <NextImage src="https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg" width={40} height={40} className="w-10 h-10 object-contain" alt="" unoptimized />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">How to connect Shopify from wemonks CIMS</h1>
          <p className="text-lg text-gray-400 font-medium">Establish a secure, high-speed synchronization handshake with your Shopify store.</p>
        </div>

        <div className="space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-mono font-bold text-sm shadow-xl">01</span>
              <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">Generate API Credentials</h2>
            </div>
            <div className="pl-14 space-y-4">
              <p className="text-gray-500 leading-relaxed font-medium">To securely link your store, you must create a Private App in your Shopify Admin dashboard.</p>
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-3">
                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                  Navigate to <strong className="text-gray-800">Settings &gt; Apps and sales channels</strong>.
                </li>
                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                  Click <strong className="text-gray-800">Develop apps</strong> and then <strong className="text-gray-800">Create an app</strong>.
                </li>
                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                  Under <strong className="text-gray-800">Configuration</strong>, grant <strong className="text-brand-600 uppercase tracking-widest text-[10px] bg-brand-50 px-2 py-0.5 rounded">write_products</strong> and <strong className="text-brand-600 uppercase tracking-widest text-[10px] bg-brand-50 px-2 py-0.5 rounded">write_inventory</strong> permissions.
                </li>
                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                  Install the app and copy the <strong className="text-gray-800">Admin API access token</strong>.
                </li>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-mono font-bold text-sm shadow-xl">02</span>
              <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">Initialize Handshake</h2>
            </div>
            <div className="pl-14 space-y-4">
              <p className="text-gray-500 leading-relaxed font-medium">Return to the CIMS Integrations hub and enter your store details.</p>
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-3">
                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                  Select <strong className="text-gray-800">Shopify</strong> from the integration platform selector.
                </li>
                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                  Choose <strong className="text-gray-800">Manual Connection</strong>.
                </li>
                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                  Enter your <strong className="text-gray-800">.myshopify.com</strong> URL.
                </li>
                <li className="flex gap-3 text-sm text-gray-600 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                  Paste your <strong className="text-gray-800">Access Token</strong> into the handshake field.
                </li>
              </div>
            </div>
          </section>

          <section className="bg-brand-600 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-brand-600/30">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="relative z-10 flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/30">
                <InfoIcon className="w-7 h-7" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold uppercase tracking-widest text-white">Architectural Insight</h3>
                <p className="text-sm text-brand-100 leading-relaxed font-medium opacity-90">Once connected, CIMS will automatically perform a baseline sync. We recommend reviewing your <strong className="text-white">Synchronization Safeguards</strong> (Maximum Sync Quantity and Buffers) before enabling real-time inventory pulses.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col items-center">
          <Link
            href="/settings/integrations"
            className="group flex items-center gap-3 px-10 py-4 bg-brand-600 text-white rounded-[2rem] text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-brand-600/30 hover:bg-brand-700 hover:scale-105 transition-all"
          >
            Start Connection Hub
            <ChevronLeftIcon className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">Handcrafted by wemonks CIMS Architecture Team</p>
        </div>
      </div>
    </div>
  );
}
