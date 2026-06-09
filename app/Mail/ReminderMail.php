<?php

namespace App\Mail;

use App\Models\Registration;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Registration $registration,
        public string $type, // '7d' | '1d' | '2h'
    ) {}

    public function envelope(): Envelope
    {
        $eventDate = Carbon::parse(config('event.date'));

        $subject = match ($this->type) {
            '7d' => '🗓 1 Week Until ' . config('event.name') . ' — Get Ready!',
            '1d' => '⏰ Tomorrow: ' . config('event.name') . ' — Final Reminder',
            '2h' => '🚨 Starting in 2 Hours: ' . config('event.name'),
            default => 'Reminder: ' . config('event.name'),
        };

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.reminder',
            with: [
                'registration' => $this->registration,
                'event'        => config('event'),
                'eventDate'    => Carbon::parse(config('event.date')),
                'type'         => $this->type,
            ],
        );
    }
}
