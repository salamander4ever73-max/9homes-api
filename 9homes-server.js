// =============================================================================
// 9 Homes App Store - Self-Contained API Server
// =============================================================================
// Run: node 9homes-server.js
// This server includes ALL data embedded - no database needed!
// Works on any server, any platform, zero dependencies.
// =============================================================================

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;

// =============================================================================
// EMBEDDED DATABASE - All apps, categories, reviews, and banners
// =============================================================================

const categories = [
  { id: 1, name: 'Games', icon: '\uD83C\uDFAE', appCount: 0 },
  { id: 2, name: 'Social', icon: '\uD83D\uDC65', appCount: 6 },
  { id: 3, name: 'Communication', icon: '\uD83D\uDCAC', appCount: 4 },
  { id: 4, name: 'Entertainment', icon: '\uD83C\uDFAC', appCount: 6 },
  { id: 5, name: 'Tools', icon: '\uD83D\uDD27', appCount: 4 },
  { id: 6, name: 'Productivity', icon: '\uD83D\uDCCA', appCount: 4 },
  { id: 7, name: 'Education', icon: '\uD83D\uDCDA', appCount: 0 },
  { id: 8, name: 'Finance', icon: '\uD83D\uDCB0', appCount: 0 },
  { id: 9, name: 'Health', icon: '\u2764\uFE0F', appCount: 0 },
  { id: 10, name: 'Shopping', icon: '\uD83D\uDED2', appCount: 0 },
];

const apps = [
  { id:1, pkg_name:'com.whatsapp', name:'WhatsApp Messenger', developer:'Meta Platforms, Inc.', category:'Communication', rating:4.3, downloads:5000000000, size:'85 MB', version:'2.24.1', description:'Simple. Reliable. Private. WhatsApp lets you message and call friends and family.', icon:'https://via.placeholder.com/192/25D366/FFFFFF?text=WA', featured:true },
  { id:2, pkg_name:'com.instagram.android', name:'Instagram', developer:'Meta Platforms, Inc.', category:'Social', rating:4.1, downloads:2000000000, size:'120 MB', version:'300.0', description:'Instagram is a simple way to capture and share the world\'s moments.', icon:'https://via.placeholder.com/192/E1306C/FFFFFF?text=IG', featured:true },
  { id:3, pkg_name:'com.zhiliaoapp.musically', name:'TikTok', developer:'ByteDance', category:'Entertainment', rating:4.5, downloads:3000000000, size:'150 MB', version:'32.0', description:'TikTok is the destination for short-form mobile video.', icon:'https://via.placeholder.com/192/000000/FFFFFF?text=TT', featured:true },
  { id:4, pkg_name:'org.telegram.messenger', name:'Telegram', developer:'Telegram FZ-LLC', category:'Communication', rating:4.6, downloads:1000000000, size:'65 MB', version:'10.8', description:'Telegram is a messaging app with a focus on speed and security.', icon:'https://via.placeholder.com/192/0088CC/FFFFFF?text=TG', featured:true },
  { id:5, pkg_name:'com.snapchat.android', name:'Snapchat', developer:'Snap Inc.', category:'Social', rating:4.0, downloads:1000000000, size:'95 MB', version:'12.76', description:'Share your day with friends using photos and videos that disappear.', icon:'https://via.placeholder.com/192/FFFC00/000000?text=SC', featured:false },
  { id:6, pkg_name:'com.facebook.katana', name:'Facebook', developer:'Meta Platforms, Inc.', category:'Social', rating:3.8, downloads:3000000000, size:'200 MB', version:'400.0', description:'Connect with friends and the world around you on Facebook.', icon:'https://via.placeholder.com/192/1877F2/FFFFFF?text=FB', featured:true },
  { id:7, pkg_name:'com.twitter.android', name:'X (Twitter)', developer:'X Corp.', category:'Social', rating:3.5, downloads:1000000000, size:'110 MB', version:'10.30', description:'Join the conversation on X. See what the world is talking about.', icon:'https://via.placeholder.com/192/000000/FFFFFF?text=X', featured:false },
  { id:8, pkg_name:'com.linkedin.android', name:'LinkedIn', developer:'LinkedIn Corporation', category:'Social', rating:4.2, downloads:500000000, size:'130 MB', version:'4.2', description:'Find jobs, build your professional network, and connect with opportunities.', icon:'https://via.placeholder.com/192/0A66C2/FFFFFF?text=LI', featured:false },
  { id:9, pkg_name:'com.android.chrome', name:'Google Chrome', developer:'Google LLC', category:'Tools', rating:4.2, downloads:5000000000, size:'180 MB', version:'120.0', description:'Browse fast on your Android phone and tablet with Google Chrome.', icon:'https://via.placeholder.com/192/4285F4/FFFFFF?text=GC', featured:true },
  { id:10, pkg_name:'com.google.android.gm', name:'Gmail', developer:'Google LLC', category:'Productivity', rating:4.3, downloads:3000000000, size:'75 MB', version:'2024.01', description:'Gmail is a secure, fast, and smart email app from Google.', icon:'https://via.placeholder.com/192/EA4335/FFFFFF?text=GM', featured:false },
  { id:11, pkg_name:'com.google.android.apps.maps', name:'Google Maps', developer:'Google LLC', category:'Tools', rating:4.4, downloads:5000000000, size:'160 MB', version:'2024.01', description:'Navigate your world faster with Google Maps.', icon:'https://via.placeholder.com/192/34A853/FFFFFF?text=MP', featured:true },
  { id:12, pkg_name:'com.google.android.youtube', name:'YouTube', developer:'Google LLC', category:'Entertainment', rating:4.2, downloads:5000000000, size:'140 MB', version:'19.0', description:'Watch videos, subscribe to channels, and share content.', icon:'https://via.placeholder.com/192/FF0000/FFFFFF?text=YT', featured:true },
  { id:13, pkg_name:'com.netflix.mediaclient', name:'Netflix', developer:'Netflix, Inc.', category:'Entertainment', rating:4.3, downloads:1000000000, size:'90 MB', version:'8.80', description:'Watch award-winning TV shows, movies, and documentaries.', icon:'https://via.placeholder.com/192/E50914/FFFFFF?text=NF', featured:true },
  { id:14, pkg_name:'com.spotify.music', name:'Spotify', developer:'Spotify AB', category:'Entertainment', rating:4.4, downloads:1000000000, size:'70 MB', version:'8.9', description:'With Spotify, you can listen to millions of songs and podcasts for free.', icon:'https://via.placeholder.com/192/1DB954/000000?text=SP', featured:true },
  { id:15, pkg_name:'com.microsoft.office.officehubrow', name:'Microsoft Office', developer:'Microsoft Corporation', category:'Productivity', rating:4.5, downloads:500000000, size:'250 MB', version:'16.0', description:'The Office app combines Word, Excel, and PowerPoint.', icon:'https://via.placeholder.com/192/D83B01/FFFFFF?text=MS', featured:false },
  { id:16, pkg_name:'com.google.android.apps.docs', name:'Google Drive', developer:'Google LLC', category:'Productivity', rating:4.2, downloads:1000000000, size:'55 MB', version:'2024.01', description:'Store, share, and access your files from anywhere.', icon:'https://via.placeholder.com/192/FBBC05/000000?text=GD', featured:false },
  { id:17, pkg_name:'com.discord', name:'Discord', developer:'Discord Inc.', category:'Communication', rating:4.3, downloads:500000000, size:'100 MB', version:'200.0', description:'Discord is the easiest way to communicate over voice, video, and text.', icon:'https://via.placeholder.com/192/5865F2/FFFFFF?text=DC', featured:false },
  { id:18, pkg_name:'com.tencent.mm', name:'WeChat', developer:'Tencent', category:'Communication', rating:4.2, downloads:1000000000, size:'200 MB', version:'8.0', description:'A fast and reliable messaging and calling app.', icon:'https://via.placeholder.com/192/07C160/FFFFFF?text=WX', featured:false },
  { id:19, pkg_name:'com.spotify.lite', name:'Spotify Lite', developer:'Spotify AB', category:'Entertainment', rating:4.1, downloads:100000000, size:'25 MB', version:'1.8', description:'A lighter version of Spotify that uses less storage and data.', icon:'https://via.placeholder.com/192/1DB954/000000?text=SL', featured:false },
  { id:20, pkg_name:'org.mozilla.firefox', name:'Firefox Browser', developer:'Mozilla', category:'Tools', rating:4.3, downloads:500000000, size:'80 MB', version:'120.0', description:'Browse the web privately and securely with Firefox.', icon:'https://via.placeholder.com/192/FF7139/FFFFFF?text=FF', featured:false },
  { id:21, pkg_name:'com.dropbox.android', name:'Dropbox', developer:'Dropbox, Inc.', category:'Productivity', rating:4.2, downloads:500000000, size:'90 MB', version:'370.0', description:'Back up photos, videos, docs, and other files to cloud storage.', icon:'https://via.placeholder.com/192/0061FF/FFFFFF?text=DB', featured:false },
  { id:22, pkg_name:'com.ubercab', name:'Uber', developer:'Uber Technologies, Inc.', category:'Tools', rating:4.1, downloads:500000000, size:'130 MB', version:'4.500', description:'Request a ride, hop in, and relax.', icon:'https://via.placeholder.com/192/000000/FFFFFF?text=UB', featured:false },
  { id:23, pkg_name:'com.pinterest', name:'Pinterest', developer:'Pinterest', category:'Social', rating:4.5, downloads:500000000, size:'80 MB', version:'12.0', description:'Discover recipes, home ideas, style inspiration and other ideas to try.', icon:'https://via.placeholder.com/192/BD081C/FFFFFF?text=PI', featured:false },
  { id:24, pkg_name:'com.shazam.android', name:'Shazam', developer:'Apple Inc.', category:'Entertainment', rating:4.4, downloads:500000000, size:'35 MB', version:'14.50', description:'Identify songs playing around you with Shazam.', icon:'https://via.placeholder.com/192/0088FF/FFFFFF?text=SZ', featured:false },
];

const reviewNames = ['Ahmed','Sara','Mohammed','Fatima','Omar','Layla','Yusuf','Noor','Ali','Hassan','Maryam','Khalid','Nora','Ibrahim','Lina'];
const reviewTexts = ['Excellent app! Very useful.','Great app, works perfectly.','Best app in its category.','Good but could be improved.','Very reliable and fast.','Love this app! Highly recommend.','Does what it says perfectly.','Needs some bug fixes.','Amazing features and easy to use.','Best download this year.','Simple and clean interface.','Works great on my phone.','Recommended for everyone.','Could use some updates.','Perfect for daily use.'];

// Generate consistent reviews
const reviews = [];
let reviewId = 1;
for (const app of apps) {
  const count = 2 + (app.id % 3);
  let totalRating = 0;
  for (let i = 0; i < count; i++) {
    const rating = 3 + ((app.id + i) % 3);
    totalRating += rating;
    reviews.push({
      id: reviewId++,
      appId: app.id,
      user_name: reviewNames[(app.id + i) % reviewNames.length],
      rating: rating,
      text: reviewTexts[(app.id * 3 + i) % reviewTexts.length],
    });
  }
  app.rating = Math.round((totalRating / count) * 10) / 10;
}

const banners = [
  { id:1, title:'Welcome to 9 Homes', image_url:'https://via.placeholder.com/1200x400/E17117/FFFFFF?text=Welcome+to+9+Homes', target_url:'/api/v7/apps?sort=downloads&limit=10', position:1, active:true },
  { id:2, title:'Top Apps This Week', image_url:'https://via.placeholder.com/1200x400/FF6B00/FFFFFF?text=Top+Apps+This+Week', target_url:'/api/v7/apps?sort=rating&limit=10', position:2, active:true },
  { id:3, title:'New Arrivals', image_url:'https://via.placeholder.com/1200x400/FF9500/FFFFFF?text=New+Arrivals', target_url:'/api/v7/apps?sort=date&limit=10', position:3, active:true },
  { id:4, title:'Best Communication Apps', image_url:'https://via.placeholder.com/1200x400/25D366/FFFFFF?text=Best+Communication+Apps', target_url:'/api/v7/apps?category=Communication&limit=10', position:4, active:true },
];

// =============================================================================
// CORS HEADERS
// =============================================================================
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json; charset=utf-8',
};

// =============================================================================
// ROUTER
// =============================================================================

function jsonResponse(data, statusCode = 200) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(data),
  };
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

async function handleRequest(req, res) {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;
  const query = parsed.query;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    return res.end();
  }

  // Route: API Root
  if (pathname === '/api/' || pathname === '/api') {
    return send(res, jsonResponse({
      info: '9 Homes App Store API v7',
      version: '1.0.0',
      endpoints: ['/api/v7/apps','/api/v7/app','/api/v7/categories','/api/v7/banners','/api/v7/ratings'],
      stats: { totalApps: apps.length, totalCategories: categories.length, totalReviews: reviews.length, totalBanners: banners.length },
    }));
  }

  // Route: List Apps
  if (pathname === '/api/v7/apps') {
    let list = [...apps];

    // Search
    if (query.q) {
      const q = query.q.toLowerCase();
      list = list.filter(a => a.name.toLowerCase().includes(q) || a.pkg_name.toLowerCase().includes(q) || a.developer.toLowerCase().includes(q));
    }

    // Category filter
    if (query.category) {
      list = list.filter(a => a.category === query.category);
    }

    // Sort
    if (query.sort === 'rating') list.sort((a,b) => b.rating - a.rating);
    else if (query.sort === 'downloads') list.sort((a,b) => b.downloads - a.downloads);
    else if (query.sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));

    // Pagination
    const offset = parseInt(query.offset) || 0;
    const limit = parseInt(query.limit) || 20;
    const total = list.length;
    list = list.slice(offset, offset + limit);

    return send(res, jsonResponse({
      data: {
        list: list.map(a => ({
          pkg_name: a.pkg_name, name: a.name, developer: a.developer,
          category: a.category, icon: a.icon, rating: a.rating,
          downloads: a.downloads, size: a.size, version: a.version,
          featured: a.featured,
          updated: new Date().toISOString(),
        })),
        total, offset, limit,
      },
      ok: true,
    }));
  }

  // Route: Single App
  if (pathname === '/api/v7/app') {
    const pkg = query.package_name || query.pkg_name;
    if (!pkg) return send(res, jsonResponse({ error: 'package_name query parameter is required' }, 400));

    const app = apps.find(a => a.pkg_name === pkg);
    if (!app) return send(res, jsonResponse({ error: 'App not found' }, 404));

    const appReviews = reviews.filter(r => r.appId === app.id);
    return send(res, jsonResponse({
      data: {
        ...app,
        screenshots: [],
        apk_url: null,
        reviews: appReviews,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      },
      ok: true,
    }));
  }

  // Route: Categories
  if (pathname === '/api/v7/categories') {
    return send(res, jsonResponse({
      data: { list: categories },
      ok: true,
    }));
  }

  // Route: Banners
  if (pathname === '/api/v7/banners') {
    return send(res, jsonResponse({
      data: { list: banners.filter(b => b.active) },
      ok: true,
    }));
  }

  // Route: Ratings
  if (pathname === '/api/v7/ratings') {
    if (req.method === 'POST') {
      const body = await parseBody(req);
      const pkg = body.package_name;
      if (!pkg) return send(res, jsonResponse({ error: 'package_name is required' }, 400));

      const app = apps.find(a => a.pkg_name === pkg);
      if (!app) return send(res, jsonResponse({ error: 'App not found' }, 404));

      const newReview = {
        id: reviewId++,
        appId: app.id,
        user_name: body.user_name || 'Anonymous',
        rating: body.rating || 5,
        text: body.text || '',
      };
      reviews.push(newReview);
      return send(res, jsonResponse({ data: newReview, ok: true }));
    }

    const pkg = query.package_name || query.pkg_name;
    if (!pkg) return send(res, jsonResponse({ error: 'package_name is required' }, 400));
    const app = apps.find(a => a.pkg_name === pkg);
    if (!app) return send(res, jsonResponse({ error: 'App not found' }, 404));

    const appReviews = reviews.filter(r => r.appId === app.id);
    return send(res, jsonResponse({ data: { list: appReviews }, ok: true }));
  }

  // Route: Admin Stats
  if (pathname === '/api/admin/stats') {
    return send(res, jsonResponse({
      data: {
        totalApps: apps.length,
        totalDownloads: apps.reduce((s,a) => s + a.downloads, 0),
        totalCategories: categories.length,
        totalReviews: reviews.length,
        totalBanners: banners.length,
        recentApps: apps.slice(-3).reverse().map(a => ({ id: a.id, name: a.name, packageName: a.pkg_name, category: a.category, downloads: a.downloads, rating: a.rating })),
      },
    }));
  }

  // Route: Admin Apps
  if (pathname === '/api/admin/apps') {
    if (req.method === 'POST') {
      const body = await parseBody(req);
      const newApp = {
        id: apps.length + 1,
        pkg_name: body.packageName || body.pkg_name,
        name: body.name,
        developer: body.developer || '',
        category: body.category || 'Tools',
        rating: body.rating || 0,
        downloads: body.downloads || 0,
        size: body.size || '0 MB',
        version: body.version || '1.0',
        description: body.description || '',
        icon: body.icon || '',
        featured: body.featured || false,
      };
      apps.push(newApp);
      return send(res, jsonResponse({ data: newApp, ok: true }));
    }
    return send(res, jsonResponse({ data: apps }));
  }

  // Route: Health check
  if (pathname === '/health' || pathname === '/') {
    return send(res, jsonResponse({
      status: 'ok',
      service: '9 Homes API',
      uptime: process.uptime(),
      apps: apps.length,
      version: '1.0.0',
    }));
  }

  // 404
  return send(res, jsonResponse({ error: 'Not found', path: pathname }, 404));
}

function send(res, response) {
  res.writeHead(response.statusCode, response.headers);
  res.end(response.body);
}

// =============================================================================
// START SERVER
// =============================================================================
const server = http.createServer(handleRequest);

server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║   9 Homes App Store API - Running!    ║');
  console.log('  ╠══════════════════════════════════════╣');
  console.log('  ║  Port:     ' + String(PORT).padEnd(26) + '║');
  console.log('  ║  Apps:     ' + String(apps.length).padEnd(26) + '║');
  console.log('  ║  Reviews:  ' + String(reviews.length).padEnd(26) + '║');
  console.log('  ║  Banners:  ' + String(banners.length).padEnd(26) + '║');
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
  console.log('  API Endpoints:');
  console.log('    GET  /api/v7/apps          - List all apps');
  console.log('    GET  /api/v7/app?package_name=X - App details');
  console.log('    GET  /api/v7/categories    - Categories');
  console.log('    GET  /api/v7/banners       - Banners');
  console.log('    POST /api/v7/ratings       - Add review');
  console.log('');
});
