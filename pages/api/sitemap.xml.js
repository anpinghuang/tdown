export default async function handler(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/xml');
    // Instructing the Vercel edge to cache the file
    res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');
  
    const routes = [
      '/'
      // Add more routes as needed
    ];
  
    const host = req.headers.host; // Get the host from the request
    const protocol = req.headers['x-forwarded-proto'] || 'http'; // Get the protocol from the request or default to http
  
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${routes.map(route => {
          const url = `${protocol}://${host}${route}`;
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
            </url>
          `;
        }).join('')}
      </urlset>`;
  
    res.end(xml);
  }
  