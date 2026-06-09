<?php

use App\Jobs\SendReminderEmails;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Send 7-day reminder daily at 9am
Schedule::job(new SendReminderEmails('7d'))->dailyAt('09:00')->name('reminder-7d')->withoutOverlapping();

// Send 1-day reminder daily at 9am
Schedule::job(new SendReminderEmails('1d'))->dailyAt('09:00')->name('reminder-1d')->withoutOverlapping();

// Send 2-hour reminder every 30 minutes (to catch the window)
Schedule::job(new SendReminderEmails('2h'))->everyThirtyMinutes()->name('reminder-2h')->withoutOverlapping();
