<?php

namespace App\Jobs;

use App\Mail\ReminderMail;
use App\Models\Registration;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendReminderEmails implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public string $type) {}

    public function handle(): void
    {
        $column = "reminder_{$this->type}_sent_at";

        Registration::pendingReminder($this->type)->each(function (Registration $reg) use ($column) {
            Mail::to($reg->email)->send(new ReminderMail($reg, $this->type));
            $reg->update([$column => now()]);
        });
    }
}
