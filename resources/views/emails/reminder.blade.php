<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Event Reminder</title>
<style>
  body { margin:0; padding:0; font-family: 'Inter', Arial, sans-serif; background:#f1f5f9; }
  .wrapper { max-width:600px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,.1); }
  .header  { padding:40px 30px; text-align:center; }
  .header.seven { background:linear-gradient(135deg,#0F172A,#1E3A5F); }
  .header.one   { background:linear-gradient(135deg,#0F172A,#1E293B); }
  .header.two   { background:linear-gradient(135deg,#0F172A,#7C3AED); }
  .header h1 { margin:0; color:#F59E0B; font-size:26px; font-weight:800; }
  .header .emoji { font-size:48px; margin-bottom:12px; display:block; }
  .header p { margin:8px 0 0; color:#94A3B8; font-size:14px; }
  .countdown { display:flex; justify-content:center; gap:16px; margin:20px 0 0; }
  .countdown .unit { text-align:center; }
  .countdown .num  { display:block; background:rgba(245,158,11,.2); color:#F59E0B; font-size:28px; font-weight:800; padding:10px 18px; border-radius:8px; border:1px solid rgba(245,158,11,.4); }
  .countdown .lbl  { color:#94A3B8; font-size:10px; text-transform:uppercase; letter-spacing:1px; margin-top:4px; }
  .body    { padding:36px 30px; }
  .body h2 { color:#0F172A; font-size:20px; margin:0 0 12px; }
  .body p  { color:#475569; line-height:1.7; margin:0 0 16px; }
  .urgent  { background:#FFF1F2; border:1px solid #FECDD3; border-radius:10px; padding:20px; text-align:center; margin:24px 0; }
  .urgent h3 { margin:0 0 8px; color:#BE123C; font-size:18px; font-weight:700; }
  .urgent p  { margin:0; color:#9F1239; font-size:14px; }
  .detail-card { background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:20px 24px; margin:24px 0; }
  .detail-row  { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #E2E8F0; }
  .detail-row:last-child { border-bottom:none; }
  .detail-label { color:#64748B; font-size:13px; font-weight:500; }
  .detail-value { color:#0F172A; font-size:13px; font-weight:600; }
  .cta-btn { display:block; width:fit-content; margin:24px auto 0; background:#F59E0B; color:#0F172A; font-weight:700; font-size:15px; padding:14px 36px; border-radius:8px; text-decoration:none; }
  .footer  { background:#0F172A; padding:24px 30px; text-align:center; }
  .footer p { color:#64748B; font-size:12px; margin:4px 0; }
  .social  { margin:12px 0; }
  .social a { color:#F59E0B; text-decoration:none; margin:0 8px; font-size:13px; }
</style>
</head>
<body>
<div class="wrapper">

  @php
    $headerClass = match($type) { '7d' => 'seven', '1d' => 'one', '2h' => 'two', default => 'one' };
    $emoji = match($type) { '7d' => '🗓', '1d' => '⏰', '2h' => '🚨', default => '📅' };
    $headline = match($type) {
        '7d' => '1 Week to Go!',
        '1d' => 'Tomorrow\'s the Day!',
        '2h' => 'Starting in 2 Hours!',
        default => 'Event Reminder'
    };
    $message = match($type) {
        '7d' => 'The FX Trading Masterclass is just 7 days away. Now is the perfect time to start preparing your questions and get excited!',
        '1d' => 'Your big day is almost here! The FX Trading Masterclass starts TOMORROW. Make sure you\'re all set and ready to trade.',
        '2h' => 'The event is starting in just 2 hours! Log in early, test your connection, and get ready to unlock powerful trading strategies.',
        default => 'This is your reminder for the upcoming event.'
    };
  @endphp

  <div class="header {{ $headerClass }}">
    <span class="emoji">{{ $emoji }}</span>
    <h1>{{ $headline }}</h1>
    <p>{{ $event['name'] }}</p>

    @if($type === '7d')
    <div class="countdown">
      <div class="unit"><span class="num">7</span><span class="lbl">Days</span></div>
      <div class="unit"><span class="num">00</span><span class="lbl">Hours</span></div>
      <div class="unit"><span class="num">00</span><span class="lbl">Mins</span></div>
    </div>
    @endif
  </div>

  <div class="body">
    <h2>Hey {{ $registration->name }}! {{ $emoji }}</h2>
    <p>{{ $message }}</p>

    @if($type === '2h')
    <div class="urgent">
      <h3>🚀 It's Happening NOW!</h3>
      <p>Join the event room early and connect with fellow traders.</p>
    </div>
    @endif

    <div class="detail-card">
      <div class="detail-row">
        <span class="detail-label">📅 Date</span>
        <span class="detail-value">{{ $eventDate->format('l, F j, Y') }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">⏰ Start Time</span>
        <span class="detail-value">{{ $eventDate->format('g:i A T') }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">📍 Location</span>
        <span class="detail-value">{{ $event['location'] }}</span>
      </div>
    </div>

    @if($type === '7d')
    <p><strong>This week's checklist:</strong></p>
    <ul style="color:#475569;line-height:2;padding-left:20px;">
      <li>Review basic forex concepts if you're new</li>
      <li>Write down 3 questions you want answered</li>
      <li>Tell a friend — they can still register!</li>
      <li>Ensure your tech (mic, camera, internet) is ready</li>
    </ul>
    @elseif($type === '1d')
    <p><strong>Final checklist for tomorrow:</strong></p>
    <ul style="color:#475569;line-height:2;padding-left:20px;">
      <li>✅ Test your Zoom / meeting link</li>
      <li>✅ Charge your laptop/devices</li>
      <li>✅ Prepare notebook & pen</li>
      <li>✅ Block your calendar — no distractions!</li>
    </ul>
    @endif

    <a href="{{ config('app.url') }}" class="cta-btn">
      @if($type === '2h') Join the Event Now → @else View Event Details → @endif
    </a>
  </div>

  <div class="footer">
    <div class="social">
      <a href="#">Twitter</a>
      <a href="#">Telegram</a>
      <a href="#">YouTube</a>
    </div>
    <p>© {{ date('Y') }} {{ $event['name'] }}. All rights reserved.</p>
    <p>You received this because you registered for our event. Reply to unsubscribe.</p>
  </div>
</div>
</body>
</html>
