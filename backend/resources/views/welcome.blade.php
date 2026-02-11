<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name', 'CIMS') }}</title>
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <!-- Scripts -->
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                darkMode: 'class',
                theme: {
                    extend: {
                        fontFamily: {
                            sans: ['Outfit', 'sans-serif'],
                        },
                        colors: {
                            brand: {
                                50: '#eff4ff',
                                100: '#dbe6fe',
                                200: '#bfd3fe',
                                300: '#93bbfd',
                                400: '#609afa',
                                500: '#3b82f6',
                                600: '#2563eb',
                                700: '#1d4ed8',
                                800: '#1e40af',
                                900: '#1e3a8a',
                                950: '#172554',
                            }
                        }
                    }
                }
            }
        </script>
    </head>
    <body class="bg-gray-900 text-white font-sans antialiased selection:bg-brand-500 selection:text-white">

        <!-- Navigation -->
        <nav class="fixed w-full z-50 top-0 left-0 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                            <span class="font-bold text-white">C</span>
                        </div>
                        <span class="font-bold text-xl tracking-tight">CIMS</span>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a href="#features" class="hover:text-brand-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
                            <a href="#about" class="hover:text-brand-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                            <a href="https://wemonks.org" target="_blank" class="hover:text-brand-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center gap-4">
                            @auth
                                <a href="http://localhost:3000" class="text-sm font-medium text-gray-300 hover:text-white transition-colors">Dashboard</a>
                            @else
                                <a href="http://localhost:3000/signin" class="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:bg-gray-800 px-4 py-2 rounded-lg border border-transparent hover:border-gray-700">Log in</a>
                                <a href="http://localhost:3000/signup" class="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold transition-all">Get Started</a>
                            @endauth
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <div class="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
            <div class="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
                <div class="absolute top-20 left-1/4 w-72 h-72 bg-brand-500/20 rounded-full blur-[100px]"></div>
                <div class="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"></div>
            </div>

            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 mb-8 animate-fade-in-up">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span class="text-xs font-medium text-gray-300 uppercase tracking-wider">v2.0 Now Available</span>
                </div>

                <h1 class="text-5xl sm:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    Simplify Your <br />
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-purple-400">Inventory Management</span>
                </h1>

                <p class="mt-4 text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                    CIMS provides a powerful, intuitive interface to track stock, manage orders, and analyze performance.
                    Built for modern businesses that demand efficiency.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="http://localhost:3000/signup" class="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2">
                        Start Free Trial
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </a>
                    <a href="#demo" class="w-full sm:w-auto px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold text-lg transition-all border border-gray-700 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Watch Demo
                    </a>
                </div>

                <!-- Dashboard Preview -->
                <div class="mt-20 relative mx-auto max-w-5xl">
                    <div class="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-600 rounded-2xl blur opacity-20"></div>
                    <div class="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                        <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900/50">
                            <div class="flex gap-1.5">
                                <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                        </div>
                        <div class="aspect-video bg-gray-800/50 flex items-center justify-center text-gray-500">
                            <!-- Placeholder for Dashboard Image -->
                            <div class="text-center">
                                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                <p>Interactive Dashboard UI would appear here in production</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bento Grid Features -->
        <section id="features" class="py-24 bg-gray-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-white">Everything You Need</h2>
                    <p class="mt-4 text-gray-400">Streamline your operations with our comprehensive toolset</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Feature 1 -->
                    <div class="md:col-span-2 p-8 rounded-3xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800 transition-colors group">
                        <div class="flex items-start justify-between">
                            <div>
                                <div class="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-6 group-hover:scale-110 transition-transform">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                </div>
                                <h3 class="text-xl font-bold text-white mb-2">Real-time Analytics</h3>
                                <p class="text-gray-400">Get instant insights into your stock levels, sales trends, and inventory valuation. customized reports help you make data-driven decisions.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Feature 2 -->
                    <div class="p-8 rounded-3xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800 transition-colors group">
                        <div class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                        <p class="text-gray-400">Optimized for speed, CIMS ensures updates happen instantly across all devices.</p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="p-8 rounded-3xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800 transition-colors group">
                        <div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Secure & Reliable</h3>
                        <p class="text-gray-400">Enterprise-grade security keeps your data safe with daily backups.</p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="md:col-span-2 p-8 rounded-3xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800 transition-colors group">
                        <div class="flex items-start justify-between">
                            <div>
                                <div class="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                </div>
                                <h3 class="text-xl font-bold text-white mb-2">Automated Workflows</h3>
                                <p class="text-gray-400">Set up reorder points, low stock alerts, and automated purchase orders to never run out of stock again.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-950 border-t border-gray-800 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <div class="flex items-center gap-2 mb-4 md:mb-0">
                        <div class="w-6 h-6 rounded bg-brand-500 flex items-center justify-center">
                            <span class="font-bold text-white text-xs">C</span>
                        </div>
                        <span class="font-bold text-lg tracking-tight">CIMS</span>
                    </div>
                    <div class="flex gap-6 text-sm text-gray-400">
                        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" class="hover:text-white transition-colors">Twitter</a>
                    </div>
                </div>
                <div class="mt-8 text-center text-xs text-gray-600">
                    &copy; 2026 wemonks.org. All rights reserved.
                </div>
            </div>
        </footer>
    </body>
</html>
