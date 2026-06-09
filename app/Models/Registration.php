<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'experience_level',
        'referral_source',
    ];

    protected $casts = [
        'confirmation_sent_at' => 'datetime',
        'reminder_7d_sent_at'  => 'datetime',
        'reminder_1d_sent_at'  => 'datetime',
        'reminder_2h_sent_at'  => 'datetime',
    ];

    public function scopePendingReminder(object $query, string $type): object
    {
        $eventDate = Carbon::parse(config('event.date'));
        $column    = "reminder_{$type}_sent_at";

        $windowStart = match ($type) {
            '7d'  => $eventDate->copy()->subDays(7)->startOfDay(),
            '1d'  => $eventDate->copy()->subDay()->startOfDay(),
            '2h'  => $eventDate->copy()->subHours(2)->subMinutes(30),
            default => now(),
        };

        $windowEnd = match ($type) {
            '7d'  => $eventDate->copy()->subDays(7)->endOfDay(),
            '1d'  => $eventDate->copy()->subDay()->endOfDay(),
            '2h'  => $eventDate->copy()->subHours(2)->addMinutes(30),
            default => now(),
        };

        return $query
            ->whereNull($column)
            ->whereNotNull('confirmation_sent_at')
            ->whereBetween(now(), [$windowStart, $windowEnd]);
    }
}
