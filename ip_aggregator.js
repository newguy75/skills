const fs = require('fs');
const path = require('path');
const geoip = require('fast-geoip');

// 1. Load the log file
const log = fs.readFileSync(path.resolve(__dirname, 'ip.txt'), 'utf-8');

// 2. Extract all IPv4 addresses (one per line or anywhere in the text)
const ips = log.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || [];

// 3. Aggregate counts by region
const counts = {};

async function run() {
  for (const ip of ips) {
    try {
      const info = await geoip.lookup(ip);
      // For Chinese IPs, info.country === 'CN' and info.region contains province
      const region = (info.country === 'CN' && info.region) ? info.region : (info.country || 'OTHER');
      counts[region] = (counts[region] || 0) + 1;
    } catch (err) {
      counts['ERROR'] = (counts['ERROR'] || 0) + 1;
      console.error(`Lookup failed for ${ip}:`, err.message);
    }
  }

  // 4. Output the aggregation
  console.log('\n📊 Counts by region:');
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([region, cnt]) => {
      console.log(`${region}: ${cnt}`);
    });
}

run();
