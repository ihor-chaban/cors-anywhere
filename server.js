const fs = require('fs');
const cors_proxy = require('cors-anywhere');
const checkRateLimit = require('cors-anywhere/lib/rate-limit')(process.env.CORSANYWHERE_RATELIMIT || '');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

const originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
const originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);

const validApiKeys = process.env.API_KEYS ? process.env.API_KEYS.split(',') : [];
const removeHeaders = process.env.REMOVE_HEADERS ? process.env.REMOVE_HEADERS.split(',') : [];

if (validApiKeys.length === 0) {
  console.warn('Warning: No API keys are set. The server will not enforce API key validation.');
}

let addHeaders = {};
if (process.env.ADD_HEADERS) {
  try {
    addHeaders = JSON.parse(process.env.ADD_HEADERS);
  } catch (e) {
    console.error('Failed to parse HEADERS environment variable. Ensure it is valid JSON.');
    addHeaders = {};
  }
}

let httpsOptions = null;
if (process.env.KEY && process.env.CERT) {
  try {
    httpsOptions = {
      key: readTLSContent(process.env.KEY),
      cert: readTLSContent(process.env.CERT),
    };
    console.log('TLS certificates loaded successfully.');
  } catch (error) {
    console.error('Failed to load TLS certificates:', error.message);
  }
} else {
  console.log('Warning: TLS certificates not provided. Running without HTTPS.');
}

function checkApiKey(req, res, location) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('Unauthorized: API key is missing.');
    return true;
  }

  if (!validApiKeys.includes(apiKey)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden: Invalid API key.');
    return true;
  }

  delete req.headers['x-api-key'];
  return false;
}

function readTLSContent(tls) {
  try {
    if (tls.startsWith('-----')) {
      return tls;
    } else {
      return fs.readFileSync(tls);
    }
  } catch (error) {
    throw new Error(`Failed to read TLS content from ${tls}: ${error.message}`);
  }
}

function parseEnvList(env) {
  if (!env) {
    return [];
  }
  return env.split(',');
}

function handleShutdown() {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
}

const server = cors_proxy.createServer({
  checkRateLimit: checkRateLimit,
  handleInitialRequest: checkApiKey,
  httpProxyOptions: { xfwd: false },
  httpsOptions: httpsOptions,
  originBlacklist: originBlacklist,
  originWhitelist: originWhitelist,
  redirectSameOrigin: true,
  removeHeaders: removeHeaders.map(header => header.toLowerCase()),
  setHeaders: addHeaders,
});

server.listen(port, host, () => {
  console.log(`Running CORS Anywhere on ${host}:${port}`);
});

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);
