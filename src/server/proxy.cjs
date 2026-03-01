/**
 * Simple CORS proxy for AniList API
 * Run with: node src/server/proxy.cjs
 * * This server acts as a middleman to bypass browser CORS restrictions
 * by adding the necessary headers and forwarding requests to AniList.
 */

const http = require('http');
const https = require('https');

const PORT = 3001;

const server = http.createServer((req, res) => {
  // --- 1. CORS Configuration ---
  // Allow any origin to access this proxy (ideal for dev environments)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Type', 'application/json');

  // --- 2. Preflight Request Handling ---
  // Browsers send an OPTIONS request before a POST to check permissions
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // --- 3. Request Routing ---
  // Only handle POST requests specifically targeted at the /graphql endpoint
  if (req.method === 'POST' && req.url === '/graphql') {
    let body = '';

    // Collect the incoming stream of data from the frontend
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      // Prepare the outbound request to the AniList GraphQL API
      const options = {
        hostname: 'graphql.anilist.co',
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      };

      // --- 4. Outbound Request Execution ---
      const proxyReq = https.request(options, (proxyRes) => {
        let data = '';

        // Accumulate the response from AniList
        proxyRes.on('data', (chunk) => {
          data += chunk;
        });

        // Forward the final response back to the frontend
        proxyRes.on('end', () => {
          res.writeHead(proxyRes.statusCode);
          res.end(data);
        });
      });

      // --- 5. Error Handling ---
      proxyReq.on('error', (error) => {
        console.error('Proxy error:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Proxy error' }));
      });

      // Write the frontend's original body to the AniList request
      proxyReq.write(body);
      proxyReq.end();
    });
  } else {
    // Return 404 for any other methods or paths
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`✅ CORS proxy running on http://localhost:${PORT}`);
});