<?php

namespace App\Mail;

use App\Models\Registration;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Registration $registration) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'You\'re Registered! ' . config('event.name') . ' — ' . \Carbon\Carbon::parse(config('event.date'))->format('M j, Y'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.confirmation',
            with: [
                'registration' => $this->registration,
                'event'        => config('event'),
                'eventDate'    => \Carbon\Carbon::parse(config('event.date')),
            ],
        );
    }
}
