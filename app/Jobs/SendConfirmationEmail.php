<?php

namespace App\Jobs;

use App\Mail\ConfirmationMail;
use App\Models\Registration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendConfirmationEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public function __construct(public Registration $registration) {}

    public function handle(): void
    {
        Mail::to($this->registration->email)
            ->send(new ConfirmationMail($this->registration));

        $this->registration->update(['confirmation_sent_at' => now()]);
    }
}
