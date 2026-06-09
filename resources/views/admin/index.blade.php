<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin — {{ $event['name'] }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config = { theme: { extend: { fontFamily: { sans: ['Inter','sans-serif'] } } } }</script>
</head>
<body class="font-sans bg-slate-100 text-slate-800 antialiased">

<!-- Top Bar -->
<header class="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
    <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-sm text-slate-900">FX</div>
        <div>
            <div class="font-bold text-sm">{{ $event['name'] }}</div>
            <div class="text-xs text-slate-400">Admin Dashboard · {{ $eventDate->format('M j, Y') }}</div>
        </div>
    </div>
    <a href="{{ route('admin.export') }}"
       class="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm px-4 py-2 rounded-lg transition">
        ↓ Export CSV
    </a>
</header>

<main class="max-w-7xl mx-auto px-4 py-8">

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        @php
        $statCards = [
            ['label' => 'Total Registrations', 'value' => $stats['total'],        'color' => 'bg-blue-50 border-blue-200',    'text' => 'text-blue-700'],
            ['label' => 'Confirmed Emails',    'value' => $stats['confirmed'],    'color' => 'bg-green-50 border-green-200',  'text' => 'text-green-700'],
            ['label' => 'Seats Remaining',     'value' => $stats['seats_left'],   'color' => 'bg-amber-50 border-amber-200',  'text' => 'text-amber-700'],
            ['label' => 'Beginners',           'value' => $stats['beginner'],     'color' => 'bg-slate-50 border-slate-200',  'text' => 'text-slate-700'],
            ['label' => 'Intermediate',        'value' => $stats['intermediate'], 'color' => 'bg-purple-50 border-purple-200','text' => 'text-purple-700'],
            ['label' => 'Advanced',            'value' => $stats['advanced'],     'color' => 'bg-red-50 border-red-200',      'text' => 'text-red-700'],
        ];
        @endphp
        @foreach($statCards as $card)
        <div class="border rounded-xl p-4 {{ $card['color'] }}">
            <div class="text-2xl font-bold {{ $card['text'] }}">{{ $card['value'] }}</div>
            <div class="text-xs text-slate-500 mt-1 font-medium">{{ $card['label'] }}</div>
        </div>
        @endforeach
    </div>

    <!-- Fill Rate Bar -->
    @php $fillPct = $stats['total'] > 0 ? min(100, round($stats['total'] / config('event.seats') * 100)) : 0; @endphp
    <div class="bg-white rounded-xl border border-slate-200 p-5 mb-6 shadow-sm">
        <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-semibold text-slate-700">Registration Fill Rate</span>
            <span class="text-sm font-bold text-amber-600">{{ $fillPct }}% ({{ $stats['total'] }}/{{ config('event.seats') }} seats)</span>
        </div>
        <div class="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div class="h-3 rounded-full transition-all duration-500
                @if($fillPct >= 90) bg-red-500 @elseif($fillPct >= 60) bg-amber-500 @else bg-green-500 @endif"
                style="width: {{ $fillPct }}%"></div>
        </div>
    </div>

    <!-- Registrations Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 class="font-semibold text-slate-800">All Registrations</h2>
            <span class="text-xs text-slate-400">{{ $registrations->total() }} total · Page {{ $registrations->currentPage() }} of {{ $registrations->lastPage() }}</span>
        </div>

        @if($registrations->isEmpty())
        <div class="text-center py-16 text-slate-400">
            <div class="text-4xl mb-3">📋</div>
            <p class="font-medium">No registrations yet.</p>
            <p class="text-sm mt-1">Share your landing page to start collecting registrations.</p>
        </div>
        @else
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                    <tr>
                        <th class="px-4 py-3 text-left">#</th>
                        <th class="px-4 py-3 text-left">Name</th>
                        <th class="px-4 py-3 text-left">Email</th>
                        <th class="px-4 py-3 text-left">Phone</th>
                        <th class="px-4 py-3 text-left">Level</th>
                        <th class="px-4 py-3 text-left">Referred By</th>
                        <th class="px-4 py-3 text-left">Registered</th>
                        <th class="px-4 py-3 text-left">Email Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @foreach($registrations as $reg)
                    <tr class="hover:bg-slate-50 transition-colors">
                        <td class="px-4 py-3 text-slate-400">{{ $reg->id }}</td>
                        <td class="px-4 py-3 font-medium text-slate-800">{{ $reg->name }}</td>
                        <td class="px-4 py-3 text-slate-600">{{ $reg->email }}</td>
                        <td class="px-4 py-3 text-slate-500">{{ $reg->phone ?? '—' }}</td>
                        <td class="px-4 py-3">
                            @php
                            $levelClasses = [
                                'beginner'     => 'bg-green-100 text-green-700',
                                'intermediate' => 'bg-blue-100 text-blue-700',
                                'advanced'     => 'bg-purple-100 text-purple-700',
                            ];
                            @endphp
                            <span class="px-2 py-1 rounded-full text-xs font-medium {{ $levelClasses[$reg->experience_level] ?? '' }}">
                                {{ ucfirst($reg->experience_level) }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-slate-500">{{ $reg->referral_source ?? '—' }}</td>
                        <td class="px-4 py-3 text-slate-500 text-xs">{{ $reg->created_at->format('M j, Y H:i') }}</td>
                        <td class="px-4 py-3">
                            @if($reg->confirmation_sent_at)
                                <span class="flex items-center gap-1 text-green-600 text-xs font-medium">
                                    <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Sent
                                </span>
                            @else
                                <span class="flex items-center gap-1 text-amber-500 text-xs font-medium">
                                    <span class="w-1.5 h-1.5 bg-amber-400 rounded-full"></span> Pending
                                </span>
                            @endif
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        @if($registrations->hasPages())
        <div class="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-400">Showing {{ $registrations->firstItem() }}–{{ $registrations->lastItem() }} of {{ $registrations->total() }}</span>
            <div class="flex gap-2">
                @if($registrations->onFirstPage())
                    <span class="px-3 py-1.5 text-xs bg-slate-100 text-slate-400 rounded-lg cursor-not-allowed">← Prev</span>
                @else
                    <a href="{{ $registrations->previousPageUrl() }}" class="px-3 py-1.5 text-xs bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition">← Prev</a>
                @endif
                @if($registrations->hasMorePages())
                    <a href="{{ $registrations->nextPageUrl() }}" class="px-3 py-1.5 text-xs bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition">Next →</a>
                @else
                    <span class="px-3 py-1.5 text-xs bg-slate-100 text-slate-400 rounded-lg cursor-not-allowed">Next →</span>
                @endif
            </div>
        </div>
        @endif
        @endif
    </div>

    <!-- Scheduler Info -->
    <div class="mt-6 bg-slate-900 rounded-xl p-5 text-sm text-slate-300">
        <div class="font-semibold text-white mb-3 flex items-center gap-2">⚙️ Automation Status</div>
        <div class="grid md:grid-cols-3 gap-3 text-xs">
            <div class="bg-slate-800 rounded-lg p-3">
                <div class="text-amber-400 font-semibold mb-1">7-Day Reminder</div>
                <div>Sends daily at 09:00 to registrants 7 days before event</div>
            </div>
            <div class="bg-slate-800 rounded-lg p-3">
                <div class="text-amber-400 font-semibold mb-1">1-Day Reminder</div>
                <div>Sends daily at 09:00 to registrants 1 day before event</div>
            </div>
            <div class="bg-slate-800 rounded-lg p-3">
                <div class="text-amber-400 font-semibold mb-1">2-Hour Reminder</div>
                <div>Sends every 30 min within the 2-hour window before event</div>
            </div>
        </div>
        <div class="mt-3 text-xs text-slate-500">
            Add to cron: <code class="bg-slate-700 px-2 py-0.5 rounded text-slate-300">* * * * * php {{ base_path() }}/artisan schedule:run >> /dev/null 2>&1</code>
        </div>
    </div>
</main>

</body>
</html>
