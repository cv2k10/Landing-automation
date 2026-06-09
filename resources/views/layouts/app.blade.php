<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', config('event.name'))</title>
    <meta name="description" content="@yield('description', config('event.tagline'))">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Inter', 'sans-serif'] },
                    colors: {
                        navy:  { DEFAULT: '#0F172A', 800: '#1E293B', 700: '#334155', 600: '#475569' },
                        gold:  { DEFAULT: '#F59E0B', light: '#FCD34D', dark: '#D97706' },
                        green: { trade: '#10B981' },
                    },
                    animation: {
                        'fade-in': 'fadeIn .6s ease-out',
                        'slide-up': 'slideUp .6s ease-out',
                        'pulse-slow': 'pulse 3s ease-in-out infinite',
                    },
                    keyframes: {
                        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                    }
                }
            }
        }
    </script>
    <style>
        [x-cloak] { display: none !important; }
        .gradient-hero { background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%); }
        .gradient-card { background: linear-gradient(145deg, #1E293B, #0F172A); }
        .gold-border  { border-image: linear-gradient(90deg, #F59E0B, #FCD34D, #F59E0B) 1; }
        .chart-line   { background: linear-gradient(90deg, transparent, #F59E0B, transparent); }
        .glow-gold    { box-shadow: 0 0 30px rgba(245, 158, 11, 0.3); }
        .glow-gold-sm { box-shadow: 0 0 15px rgba(245, 158, 11, 0.2); }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ticker-wrap  { overflow: hidden; }
        .ticker-inner { display: flex; animation: ticker 25s linear infinite; white-space: nowrap; }
    </style>
    @stack('head')
</head>
<body class="font-sans bg-navy text-white antialiased">

    @yield('content')

    <!-- Alpine.js -->
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    @stack('scripts')
</body>
</html>
