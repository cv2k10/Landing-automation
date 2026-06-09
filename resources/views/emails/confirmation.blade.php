<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Registration Confirmed</title>
<style>
  body { margin:0; padding:0; font-family: 'Inter', Arial, sans-serif; background:#f1f5f9; }
  .wrapper { max-width:600px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,.1); }
  .header  { background:linear-gradient(135deg,#0F172A,#1E293B); padding:40px 30px; text-align:center; }
  .header h1 { margin:0; color:#F59E0B; font-size:28px; font-weight:800; letter-spacing:-0.5px; }
  .header p  { margin:8px 0 0; color:#94A3B8; font-size:14px; }
  .badge   { display:inline-block; background:#10B981; color:#fff; border-radius:20px; padding:6px 20px; font-size:13px; font-weight:600; margin-top:16px; }
  .body    { padding:36px 30px; }
  .body h2 { color:#0F172A; font-size:20px; margin:0 0 12px; }
  .body p  { color:#475569; line-height:1.7; margin:0 0 16px; }
  .detail-card { background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:20px 24px; margin:24px 0; }
  .detail-row  { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #E2E8F0; }
  .detail-row:last-child { border-bottom:none; }
  .detail-label { color:#64748B; font-size:13px; font-weight:500; }
  .detail-value { color:#0F172A; font-size:13px; font-weight:600; }
  .cta-btn { display:block; width:fit-content; margin:24px auto 0; background:#F59E0B; color:#0F172A; font-weight:700; font-size:15px; padding:14px 36px; border-radius:8px; text-decoration:none; }
  .tips    { background:#FFF7ED; border-left:4px solid #F59E0B; padding:16px 20px; border-radius:0 8px 8px 0; margin:24px 0; }
  .tips h3 { margin:0 0 8px; color:#92400E; font-size:14px; font-weight:700; }
  .tips ul { margin:0; padding-left:18px; color:#78350F; font-size:13px; line-height:1.8; }
  .footer  { background:#0F172A; padding:24px 30px; text-align:center; }
  .footer p { color:#64748B; font-size:12px; margin:4px 0; }
  .social  { margin:12px 0; }
  .social a { color:#F59E0B; text-decoration:none; margin:0 8px; font-size:13px; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <p style="color:#F59E0B;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">Registration Confirmed</p>
    <h1>{{ $event['name'] }}</h1>
    <p>{{ $event['tagline'] }}</p>
    <span class="badge">✓ You're In!</span>
  </div>

  <div class="body">
    <h2>Hey {{ $registration->name }}! 🎉</h2>
    <p>Welcome aboard! Your seat is reserved for the <strong>{{ $event['name'] }}</strong>. Get ready to transform your trading journey.</p>

    <div class="detail-card">
      <div class="detail-row">
        <span class="detail-label">📅 Date</span>
        <span class="detail-value">{{ $eventDate->format('l, F j, Y') }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">⏰ Time</span>
        <span class="detail-value">{{ $eventDate->format('g:i A T') }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">📍 Location</span>
        <span class="detail-value">{{ $event['location'] }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">👤 Name</span>
        <span class="detail-value">{{ $registration->name }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">📧 Email</span>
        <span class="detail-value">{{ $registration->email }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">📊 Experience</span>
        <span class="detail-value">{{ ucfirst($registration->experience_level) }}</span>
      </div>
    </div>

    <div class="tips">
      <h3>📌 How to Prepare</h3>
      <ul>
        <li>Ensure you have a stable internet connection</li>
        <li>Download Zoom (if attending online) before the event</li>
        <li>Prepare your questions — Q&amp;A session included</li>
        <li>Have a notepad ready for key strategies</li>
      </ul>
    </div>

    <p>You'll receive reminder emails 7 days, 1 day, and 2 hours before the event so you never miss it.</p>

    <a href="{{ config('app.url') }}" class="cta-btn">Visit Event Page →</a>
  </div>

  <div class="footer">
    <div class="social">
      <a href="#">Twitter</a>
      <a href="#">Telegram</a>
      <a href="#">YouTube</a>
    </div>
    <p>© {{ date('Y') }} {{ $event['name'] }}. All rights reserved.</p>
    <p>You received this because you registered for our event.</p>
  </div>
</div>
</body>
</html>
