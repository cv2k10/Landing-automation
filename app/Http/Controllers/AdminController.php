<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminController extends Controller
{
    public function index(): \Illuminate\View\View
    {
        $registrations = Registration::latest()->paginate(25);

        $stats = [
            'total'        => Registration::count(),
            'confirmed'    => Registration::whereNotNull('confirmation_sent_at')->count(),
            'beginner'     => Registration::where('experience_level', 'beginner')->count(),
            'intermediate' => Registration::where('experience_level', 'intermediate')->count(),
            'advanced'     => Registration::where('experience_level', 'advanced')->count(),
            'seats_left'   => max(0, config('event.seats') - Registration::count()),
        ];

        return view('admin.index', [
            'registrations' => $registrations,
            'stats'         => $stats,
            'event'         => config('event'),
            'eventDate'     => Carbon::parse(config('event.date')),
        ]);
    }

    public function export(): StreamedResponse
    {
        $headers = [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename="registrations-' . date('Y-m-d') . '.csv"',
        ];

        return response()->stream(function () {
            $handle = fopen('php://output', 'w');

            fputcsv($handle, ['ID', 'Name', 'Email', 'Phone', 'Experience Level', 'How They Heard', 'Registered At', 'Confirmation Sent']);

            Registration::orderBy('id')->chunk(200, function ($rows) use ($handle) {
                foreach ($rows as $r) {
                    fputcsv($handle, [
                        $r->id,
                        $r->name,
                        $r->email,
                        $r->phone ?? '',
                        $r->experience_level,
                        $r->referral_source ?? '',
                        $r->created_at->format('Y-m-d H:i:s'),
                        $r->confirmation_sent_at?->format('Y-m-d H:i:s') ?? 'Pending',
                    ]);
                }
            });

            fclose($handle);
        }, 200, $headers);
    }
}
