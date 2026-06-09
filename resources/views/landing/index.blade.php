@extends('layouts.app')

@section('title', config('event.name') . ' — Register Now')
@section('description', config('event.tagline'))

@section('content')

<!-- ============================================================
     TICKER BAR
     ============================================================ -->
<div class="bg-gold text-navy text-xs font-semibold py-2 ticker-wrap">
    <div class="ticker-inner">
        @for($i = 0; $i < 2; $i++)
        <span class="px-8">📈 EURUSD +0.24%</span>
        <span class="px-8">📉 GBPUSD -0.11%</span>
        <span class="px-8">📈 USDJPY +0.38%</span>
        <span class="px-8">📈 XAUUSD +0.92%</span>
        <span class="px-8">📉 USDCHF -0.07%</span>
        <span class="px-8">📈 AUDUSD +0.15%</span>
        <span class="px-8">🔥 LIMITED SEATS — Register Now!</span>
        <span class="px-8">📈 NZDUSD +0.19%</span>
        <span class="px-8">📉 USDCAD -0.04%</span>
        @endfor
    </div>
</div>

<!-- ============================================================
     NAVBAR
     ============================================================ -->
<nav x-data="{ open: false }" class="sticky top-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" class="flex items-center gap-2">
            <div class="w-9 h-9 bg-gold rounded-lg flex items-center justify-center font-black text-navy text-sm">FX</div>
            <span class="font-bold text-white text-lg hidden sm:block">{{ config('event.name') }}</span>
        </a>
        <div class="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#about"        class="hover:text-gold transition">About</a>
            <a href="#curriculum"   class="hover:text-gold transition">Curriculum</a>
            <a href="#instructor"   class="hover:text-gold transition">Instructor</a>
            <a href="#testimonials" class="hover:text-gold transition">Testimonials</a>
            <a href="#faq"          class="hover:text-gold transition">FAQ</a>
        </div>
        <div class="flex items-center gap-3">
            <a href="#register"
               class="hidden sm:inline-flex items-center gap-1 bg-gold hover:bg-gold-dark text-navy font-bold text-sm px-5 py-2 rounded-full transition transform hover:scale-105">
                Register Free →
            </a>
            <button @click="open = !open" class="md:hidden text-white p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
        </div>
    </div>
    <!-- Mobile Menu -->
    <div x-show="open" x-cloak class="md:hidden border-t border-white/10 bg-navy/98 px-4 pb-4">
        <a href="#about"        @click="open=false" class="block py-2 text-slate-300 hover:text-gold text-sm">About</a>
        <a href="#curriculum"   @click="open=false" class="block py-2 text-slate-300 hover:text-gold text-sm">Curriculum</a>
        <a href="#instructor"   @click="open=false" class="block py-2 text-slate-300 hover:text-gold text-sm">Instructor</a>
        <a href="#testimonials" @click="open=false" class="block py-2 text-slate-300 hover:text-gold text-sm">Testimonials</a>
        <a href="#faq"          @click="open=false" class="block py-2 text-slate-300 hover:text-gold text-sm">FAQ</a>
        <a href="#register"     @click="open=false" class="mt-2 block text-center bg-gold text-navy font-bold text-sm py-2.5 rounded-full">Register Free →</a>
    </div>
</nav>

<!-- ============================================================
     HERO
     ============================================================ -->
<section id="about" class="gradient-hero min-h-screen flex items-center relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <!-- Grid lines -->
        <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(245,158,11,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,.3) 1px,transparent 1px);background-size:60px 60px;"></div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-20 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <!-- Left: Copy -->
            <div class="animate-fade-in">
                <div class="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
                    <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span class="text-gold text-xs font-semibold uppercase tracking-wider">Live Training Event · {{ $eventDate->format('M j, Y') }}</span>
                </div>

                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                    Master <span class="text-gold">Forex Trading</span> in One Power-Packed Day
                </h1>

                <p class="text-slate-300 text-lg leading-relaxed mb-8">
                    Join elite traders and learn proven strategies used by professional market makers. From reading price action to executing high-probability trades — this masterclass covers everything.
                </p>

                <!-- Key stats -->
                <div class="flex flex-wrap gap-6 mb-10">
                    @foreach([['500+', 'Traders Trained'], ['94%', 'Success Rate'], ['$0', 'Entry Fee'], ['8hrs', 'Intensive Session']] as $stat)
                    <div class="text-center">
                        <div class="text-2xl font-black text-gold">{{ $stat[0] }}</div>
                        <div class="text-xs text-slate-400 font-medium">{{ $stat[1] }}</div>
                    </div>
                    @endforeach
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                    <a href="#register"
                       class="inline-flex items-center justify-center gap-2 bg-gold hover:bg-yellow-400 text-navy font-black text-base px-8 py-4 rounded-full shadow-lg glow-gold transition transform hover:scale-105">
                        🚀 Secure My Free Seat
                    </a>
                    <a href="#curriculum"
                       class="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold/50 text-white font-semibold text-base px-8 py-4 rounded-full transition">
                        View Curriculum ↓
                    </a>
                </div>

                @if($seatsLeft <= 20 && $seatsLeft > 0)
                <div class="mt-6 flex items-center gap-2 text-amber-400 text-sm font-medium">
                    <span class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                    Only {{ $seatsLeft }} seats remaining!
                </div>
                @elseif($seatsLeft === 0)
                <div class="mt-6 flex items-center gap-2 text-red-400 text-sm font-medium">
                    <span class="w-2 h-2 bg-red-400 rounded-full"></span>
                    All seats are filled. Join the waitlist below.
                </div>
                @endif
            </div>

            <!-- Right: Countdown + Event Card -->
            <div class="animate-slide-up lg:pl-8">
                <!-- Countdown Timer -->
                <div x-data="countdown('{{ $eventDate->toIso8601String() }}')"
                     class="gradient-card border border-gold/20 rounded-2xl p-6 mb-6 glow-gold-sm">
                    <div class="text-center mb-4">
                        <div class="text-gold text-xs font-bold uppercase tracking-widest mb-1">Event Starts In</div>
                        <div x-show="expired" class="text-2xl font-black text-white">🎯 Event Is Live Now!</div>
                    </div>
                    <div x-show="!expired" class="grid grid-cols-4 gap-3 text-center">
                        <template x-for="(unit, key) in units">
                            <div class="bg-navy/60 border border-white/10 rounded-xl p-3">
                                <div class="text-3xl font-black text-gold" x-text="String(time[key]).padStart(2,'0')"></div>
                                <div class="text-xs text-slate-400 mt-1 capitalize" x-text="key"></div>
                            </div>
                        </template>
                    </div>
                    <div class="mt-4 text-center text-xs text-slate-400">
                        {{ $eventDate->format('l, F j, Y · g:i A') }} · {{ $event['location'] }}
                    </div>
                </div>

                <!-- Event details card -->
                <div class="gradient-card border border-white/10 rounded-2xl p-6 space-y-4">
                    @foreach([
                        ['📅', 'Date', $eventDate->format('D, M j, Y')],
                        ['⏰', 'Time', $eventDate->format('g:i A') . ' – ' . \Carbon\Carbon::parse($event['end_date'] ?? $event['date'])->addHours(8)->format('g:i A')],
                        ['📍', 'Location', $event['location']],
                        ['🎫', 'Price', $event['price']],
                        ['👥', 'Seats', config('event.seats') . ' (limited)'],
                    ] as $detail)
                    <div class="flex items-center gap-3">
                        <span class="text-xl w-8 text-center">{{ $detail[0] }}</span>
                        <div>
                            <div class="text-xs text-slate-400">{{ $detail[1] }}</div>
                            <div class="text-white font-semibold text-sm">{{ $detail[2] }}</div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     WHAT YOU'LL LEARN
     ============================================================ -->
<section id="curriculum" class="bg-navy-800 py-20 border-t border-white/10">
    <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-14">
            <div class="text-gold text-xs font-bold uppercase tracking-widest mb-2">Curriculum</div>
            <h2 class="text-3xl sm:text-4xl font-black text-white">What You'll Learn</h2>
            <p class="text-slate-400 mt-3 max-w-xl mx-auto">A structured, no-fluff curriculum designed to take you from zero to executing profitable trades.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            @php
            $modules = [
                ['01', 'Forex Fundamentals', 'Currency pairs, pip values, lot sizes, margin & leverage explained clearly.', '📘', 'border-blue-500/30'],
                ['02', 'Technical Analysis', 'Support/resistance, trend lines, candlestick patterns & chart reading mastery.', '📊', 'border-green-500/30'],
                ['03', 'Price Action Trading', 'Raw price movement strategies — no indicators needed. Trade what you see.', '📈', 'border-gold/30'],
                ['04', 'Risk Management', 'Position sizing, stop-loss placement, risk-reward ratios. Protect your capital.', '🛡️', 'border-purple-500/30'],
                ['05', 'Entry & Exit Strategies', 'High-probability setups, precision entries, scaling out, and locking profits.', '🎯', 'border-amber-500/30'],
                ['06', 'Trading Psychology', 'Discipline, FOMO management, trading journal & building consistency.', '🧠', 'border-pink-500/30'],
            ];
            @endphp
            @foreach($modules as $mod)
            <div class="gradient-card border {{ $mod[4] }} rounded-xl p-6 hover:border-gold/50 transition-all duration-300 group">
                <div class="flex items-start gap-4">
                    <span class="text-3xl">{{ $mod[2] }}</span>
                    <div>
                        <div class="text-gold text-xs font-bold mb-1">Module {{ $mod[0] }}</div>
                        <h3 class="text-white font-bold text-base mb-2 group-hover:text-gold transition">{{ $mod[1] }}</h3>
                        <p class="text-slate-400 text-sm leading-relaxed">{{ $mod[3] }}</p>
                    </div>
                </div>
            </div>
            @endforeach
        </div>

        <!-- Bonuses -->
        <div class="mt-10 gradient-card border border-gold/20 rounded-2xl p-6 md:p-8">
            <div class="text-gold text-xs font-bold uppercase tracking-widest mb-3">🎁 What's Included (FREE)</div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                @foreach(['PDF Strategy Cheat Sheet', 'Trading Journal Template', 'Live Q&A Session', 'Private Trading Community Access'] as $bonus)
                <div class="flex items-center gap-2 text-sm text-slate-200">
                    <span class="w-5 h-5 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center text-green-400 text-xs flex-shrink-0">✓</span>
                    {{ $bonus }}
                </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     INSTRUCTOR
     ============================================================ -->
<section id="instructor" class="bg-navy py-20 border-t border-white/10">
    <div class="max-w-5xl mx-auto px-4">
        <div class="text-center mb-10">
            <div class="text-gold text-xs font-bold uppercase tracking-widest mb-2">Your Mentor</div>
            <h2 class="text-3xl sm:text-4xl font-black text-white">Meet Your Instructor</h2>
        </div>

        <div class="gradient-card border border-white/10 rounded-2xl overflow-hidden">
            <div class="md:flex">
                <!-- Avatar -->
                <div class="md:w-72 bg-gradient-to-br from-gold/20 to-navy-800 flex items-center justify-center p-10 flex-shrink-0">
                    <div class="w-40 h-40 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center text-navy font-black text-5xl shadow-2xl">
                        MK
                    </div>
                </div>
                <!-- Bio -->
                <div class="p-8 flex-1">
                    <h3 class="text-2xl font-black text-white">Marcus K. Wellington</h3>
                    <p class="text-gold font-semibold text-sm mt-1 mb-4">Senior Forex Analyst · 14 Years Experience</p>

                    <p class="text-slate-300 leading-relaxed mb-6">
                        Marcus is a veteran forex trader who started with a $500 account and built it to a multi-million dollar trading portfolio over 14 years. He has trained over 500 traders across Africa and the diaspora, with a focus on practical, real-world strategies that work in live market conditions.
                    </p>

                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        @foreach([['14+', 'Years Trading'], ['500+', 'Students'], ['$2M+', 'Managed Funds'], ['94%', 'Win Rate (2024)']] as $s)
                        <div class="bg-navy/50 rounded-xl p-3 text-center border border-white/5">
                            <div class="text-gold font-black text-xl">{{ $s[0] }}</div>
                            <div class="text-slate-400 text-xs mt-1">{{ $s[1] }}</div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     TESTIMONIALS
     ============================================================ -->
<section id="testimonials" class="bg-navy-800 py-20 border-t border-white/10">
    <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-14">
            <div class="text-gold text-xs font-bold uppercase tracking-widest mb-2">Student Stories</div>
            <h2 class="text-3xl sm:text-4xl font-black text-white">Traders Who Transformed</h2>
        </div>

        <div x-data="{ active: 0 }" class="relative">
            <div class="grid md:grid-cols-3 gap-6">
                @php
                $testimonials = [
                    ['name' => 'Adaeze O.', 'role' => 'Full-Time Trader, Lagos', 'avatar' => 'AO', 'color' => 'from-pink-500 to-rose-600', 'text' => 'I attended Marcus\'s event last year with zero knowledge. Within 3 months I was making consistent returns. This masterclass is the real deal — no hype, just pure strategy.', 'stars' => 5],
                    ['name' => 'Kwame A.', 'role' => 'Engineer & Part-Time Trader', 'avatar' => 'KA', 'color' => 'from-blue-500 to-cyan-600', 'text' => 'As a busy engineer, I needed a system I could apply in 2 hours a day. Marcus\'s price action approach is exactly that. Turned my first $1,000 into $4,200 in 6 months.', 'stars' => 5],
                    ['name' => 'Fatima B.', 'role' => 'Forex Student, Abuja', 'avatar' => 'FB', 'color' => 'from-purple-500 to-violet-600', 'text' => 'The risk management module alone was worth it. I stopped blowing accounts once I understood proper position sizing. Marcus teaches with so much clarity and passion.', 'stars' => 5],
                ];
                @endphp
                @foreach($testimonials as $t)
                <div class="gradient-card border border-white/10 rounded-xl p-6 hover:border-gold/30 transition-all duration-300">
                    <!-- Stars -->
                    <div class="flex gap-1 mb-4">
                        @for($s = 0; $s < $t['stars']; $s++)
                        <span class="text-gold text-sm">★</span>
                        @endfor
                    </div>
                    <p class="text-slate-300 text-sm leading-relaxed mb-6 italic">"{{ $t['text'] }}"</p>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br {{ $t['color'] }} flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                            {{ $t['avatar'] }}
                        </div>
                        <div>
                            <div class="text-white font-semibold text-sm">{{ $t['name'] }}</div>
                            <div class="text-slate-400 text-xs">{{ $t['role'] }}</div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     REGISTRATION FORM
     ============================================================ -->
<section id="register" class="bg-navy py-20 border-t border-white/10">
    <div class="max-w-2xl mx-auto px-4">
        <div class="text-center mb-10">
            <div class="text-gold text-xs font-bold uppercase tracking-widest mb-2">Reserve Your Seat</div>
            <h2 class="text-3xl sm:text-4xl font-black text-white">Register Now — It's Free</h2>
            <p class="text-slate-400 mt-3">
                @if($seatsLeft > 0)
                    <span class="text-amber-400 font-semibold">{{ $seatsLeft }} seats remaining</span> — don't miss out!
                @else
                    Event is fully booked. Leave your email below to join the waitlist.
                @endif
            </p>
        </div>

        <div x-data="registrationForm()"
             class="gradient-card border border-gold/20 rounded-2xl p-8 shadow-2xl glow-gold-sm">

            <!-- Success State -->
            <div x-show="success" x-cloak class="text-center py-8">
                <div class="text-6xl mb-4">🎉</div>
                <h3 class="text-2xl font-black text-white mb-2">You're Registered!</h3>
                <p class="text-slate-300 mb-1">Thanks, <strong x-text="successName" class="text-gold"></strong>!</p>
                <p class="text-slate-400 text-sm">A confirmation email is on its way. Check your inbox (and spam just in case).</p>
                <div class="mt-6 p-4 bg-navy/60 border border-green-500/30 rounded-xl text-sm text-green-400">
                    ✓ You'll receive reminder emails 7 days, 1 day, and 2 hours before the event.
                </div>
            </div>

            <!-- Form -->
            <form x-show="!success" @submit.prevent="submit()" class="space-y-5">
                <!-- Name -->
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">Full Name *</label>
                    <input x-model="form.name" type="text" placeholder="e.g. John Smith"
                           :class="errors.name ? 'border-red-500' : 'border-white/10 focus:border-gold'"
                           class="w-full bg-navy/60 border rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none transition">
                    <p x-show="errors.name" x-text="errors.name" class="text-red-400 text-xs mt-1"></p>
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">Email Address *</label>
                    <input x-model="form.email" type="email" placeholder="you@example.com"
                           :class="errors.email ? 'border-red-500' : 'border-white/10 focus:border-gold'"
                           class="w-full bg-navy/60 border rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none transition">
                    <p x-show="errors.email" x-text="errors.email" class="text-red-400 text-xs mt-1"></p>
                </div>

                <!-- Phone -->
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">Phone Number <span class="text-slate-500 normal-case">(optional)</span></label>
                    <input x-model="form.phone" type="tel" placeholder="+234 800 000 0000"
                           class="w-full bg-navy/60 border border-white/10 focus:border-gold rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none transition">
                </div>

                <!-- Experience Level -->
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">Trading Experience *</label>
                    <div class="grid grid-cols-3 gap-3">
                        @foreach(['beginner' => ['📘','Beginner','New to forex'], 'intermediate' => ['📊','Intermediate','Some experience'], 'advanced' => ['🎯','Advanced','Active trader']] as $val => $exp)
                        <label :class="form.experience_level === '{{ $val }}' ? 'border-gold bg-gold/10 text-gold' : 'border-white/10 text-slate-300 hover:border-white/30'"
                               class="cursor-pointer border rounded-xl p-3 text-center transition-all">
                            <input type="radio" x-model="form.experience_level" value="{{ $val }}" class="sr-only">
                            <div class="text-xl mb-1">{{ $exp[0] }}</div>
                            <div class="text-xs font-bold">{{ $exp[1] }}</div>
                            <div class="text-xs opacity-60 mt-0.5">{{ $exp[2] }}</div>
                        </label>
                        @endforeach
                    </div>
                    <p x-show="errors.experience_level" x-text="errors.experience_level" class="text-red-400 text-xs mt-1"></p>
                </div>

                <!-- Referral Source -->
                <div>
                    <label class="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">How Did You Hear About Us? <span class="text-slate-500 normal-case">(optional)</span></label>
                    <select x-model="form.referral_source"
                            class="w-full bg-navy/60 border border-white/10 focus:border-gold rounded-lg px-4 py-3 text-white text-sm focus:outline-none transition appearance-none">
                        <option value="">Select one...</option>
                        <option value="Social Media">Social Media (Instagram/Twitter/Facebook)</option>
                        <option value="WhatsApp">WhatsApp Group</option>
                        <option value="Telegram">Telegram Channel</option>
                        <option value="Friend/Colleague">Friend or Colleague</option>
                        <option value="Google Search">Google Search</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <!-- General Error -->
                <div x-show="generalError" class="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm" x-text="generalError"></div>

                <!-- Submit -->
                <button type="submit" :disabled="loading"
                        class="w-full bg-gold hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed text-navy font-black text-base py-4 rounded-full shadow-lg transition transform hover:scale-[1.02] active:scale-[0.98]">
                    <span x-show="!loading">🚀 Secure My Free Seat Now</span>
                    <span x-show="loading" class="flex items-center justify-center gap-2">
                        <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"></path>
                        </svg>
                        Processing...
                    </span>
                </button>

                <p class="text-center text-xs text-slate-500">
                    🔒 Your info is secure. No spam — only event updates.
                </p>
            </form>
        </div>
    </div>
</section>

<!-- ============================================================
     FAQ
     ============================================================ -->
<section id="faq" class="bg-navy-800 py-20 border-t border-white/10">
    <div class="max-w-3xl mx-auto px-4">
        <div class="text-center mb-12">
            <div class="text-gold text-xs font-bold uppercase tracking-widest mb-2">FAQ</div>
            <h2 class="text-3xl font-black text-white">Frequently Asked Questions</h2>
        </div>

        <div x-data="{ open: null }" class="space-y-3">
            @php
            $faqs = [
                ['Is this event really free?', 'Yes, 100% free. No hidden charges, no upsells during the session. Just pure education.'],
                ['Do I need prior trading experience?', 'No! The curriculum is structured to serve all levels — from absolute beginners to experienced traders looking to sharpen their edge.'],
                ['Will the session be recorded?', 'Registered participants will receive a recording link within 48 hours after the event, available for 7 days.'],
                ['What do I need to attend?', 'A stable internet connection, a device (phone, tablet, or laptop), and a notepad. We\'ll send the joining link to your email.'],
                ['How many people will attend?', 'We cap attendance at ' . config('event.seats') . ' participants to ensure quality interaction and Q&A time.'],
                ['Will there be a Q&A session?', 'Yes! The last 60 minutes are dedicated entirely to live Q&A where Marcus addresses your specific questions and scenarios.'],
                ['What if I can\'t attend live?', 'Register anyway — you\'ll receive the replay link. However, we strongly recommend attending live for the Q&A session.'],
            ];
            @endphp
            @foreach($faqs as $i => $faq)
            <div class="gradient-card border border-white/10 rounded-xl overflow-hidden">
                <button @click="open = open === {{ $i }} ? null : {{ $i }}"
                        class="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition">
                    <span class="text-white font-semibold text-sm pr-4">{{ $faq[0] }}</span>
                    <span :class="open === {{ $i }} ? 'rotate-45 text-gold' : 'text-slate-400'"
                          class="text-xl flex-shrink-0 transition-transform">+</span>
                </button>
                <div x-show="open === {{ $i }}" x-cloak
                     class="px-6 pb-5 text-slate-300 text-sm leading-relaxed border-t border-white/5">
                    <p class="pt-3">{{ $faq[1] }}</p>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>

<!-- ============================================================
     FOOTER CTA + FOOTER
     ============================================================ -->
<section class="gradient-hero border-t border-white/10 py-16">
    <div class="max-w-3xl mx-auto px-4 text-center">
        <h2 class="text-3xl sm:text-4xl font-black text-white mb-4">
            Don't Miss This <span class="text-gold">Free</span> Opportunity
        </h2>
        <p class="text-slate-300 mb-8">Spots are limited. Join hundreds of traders taking the first step to financial freedom.</p>
        <a href="#register"
           class="inline-flex items-center gap-2 bg-gold hover:bg-yellow-400 text-navy font-black text-lg px-10 py-4 rounded-full shadow-xl glow-gold transition transform hover:scale-105">
            🎯 Register Now — It's Free
        </a>
        <p class="text-slate-500 text-xs mt-4">{{ $eventDate->format('l, F j, Y · g:i A') }} · {{ $event['location'] }}</p>
    </div>
</section>

<footer class="bg-navy border-t border-white/10 py-8">
    <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div class="flex items-center gap-2">
            <div class="w-7 h-7 bg-gold rounded-md flex items-center justify-center font-black text-navy text-xs">FX</div>
            <span>{{ config('event.name') }}</span>
        </div>
        <div class="flex gap-5">
            <a href="#" class="hover:text-gold transition">Privacy Policy</a>
            <a href="#" class="hover:text-gold transition">Terms</a>
            <a href="#" class="hover:text-gold transition">Contact</a>
        </div>
        <p>© {{ date('Y') }} {{ config('event.name') }}. All rights reserved.</p>
    </div>
</footer>

@endsection

@push('scripts')
<script>
function countdown(targetDateStr) {
    return {
        time: { days: 0, hours: 0, minutes: 0, seconds: 0 },
        units: ['days', 'hours', 'minutes', 'seconds'],
        expired: false,
        init() {
            this.tick();
            setInterval(() => this.tick(), 1000);
        },
        tick() {
            const diff = new Date(targetDateStr) - new Date();
            if (diff <= 0) { this.expired = true; return; }
            this.time.days    = Math.floor(diff / 86400000);
            this.time.hours   = Math.floor((diff % 86400000) / 3600000);
            this.time.minutes = Math.floor((diff % 3600000) / 60000);
            this.time.seconds = Math.floor((diff % 60000) / 1000);
        }
    };
}

function registrationForm() {
    return {
        form: { name: '', email: '', phone: '', experience_level: '', referral_source: '' },
        errors: {},
        generalError: '',
        loading: false,
        success: false,
        successName: '',
        async submit() {
            this.errors = {};
            this.generalError = '';
            this.loading = true;
            try {
                const res = await fetch('{{ route('register') }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                    body: JSON.stringify(this.form),
                });
                const data = await res.json();
                if (res.ok) {
                    this.success = true;
                    this.successName = data.name;
                } else if (res.status === 422) {
                    this.errors = data.errors || {};
                    if (data.message && !data.errors) this.generalError = data.message;
                } else {
                    this.generalError = data.message || 'Something went wrong. Please try again.';
                }
            } catch {
                this.generalError = 'Network error. Please check your connection and try again.';
            } finally {
                this.loading = false;
            }
        }
    };
}
</script>
@endpush
