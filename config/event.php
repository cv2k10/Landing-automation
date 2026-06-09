<?php

return [
    'name'        => 'FX Trading Masterclass',
    'tagline'     => 'Master the Art of Forex Trading in One Intensive Weekend',
    'date'        => env('EVENT_DATE', '2026-07-15 09:00:00'),
    'end_date'    => env('EVENT_END_DATE', '2026-07-15 17:00:00'),
    'location'    => env('EVENT_LOCATION', 'Online via Zoom'),
    'seats'       => (int) env('EVENT_SEATS', 100),
    'price'       => env('EVENT_PRICE', 'FREE'),
    'admin_user'  => env('ADMIN_USER', 'admin'),
    'admin_pass'  => env('ADMIN_PASS', 'fx2026'),
];
