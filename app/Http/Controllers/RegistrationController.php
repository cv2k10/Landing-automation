<?php

namespace App\Http\Controllers;

use App\Jobs\SendConfirmationEmail;
use App\Models\Registration;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RegistrationController extends Controller
{
    public function show(): \Illuminate\View\View
    {
        $eventDate = Carbon::parse(config('event.date'));
        $seatsLeft = config('event.seats') - Registration::count();

        return view('landing.index', [
            'event'     => config('event'),
            'eventDate' => $eventDate,
            'seatsLeft' => max(0, $seatsLeft),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'             => ['required', 'string', 'max:255'],
            'email'            => ['required', 'email', 'max:255', Rule::unique('registrations', 'email')],
            'phone'            => ['nullable', 'string', 'max:30'],
            'experience_level' => ['required', Rule::in(['beginner', 'intermediate', 'advanced'])],
            'referral_source'  => ['nullable', 'string', 'max:255'],
        ]);

        if (Registration::count() >= config('event.seats')) {
            return response()->json(['message' => 'Sorry, all seats are taken.'], 422);
        }

        $registration = Registration::create($validated);

        SendConfirmationEmail::dispatch($registration);

        return response()->json([
            'message' => 'Registration successful! Check your email for confirmation.',
            'name'    => $registration->name,
        ]);
    }
}
