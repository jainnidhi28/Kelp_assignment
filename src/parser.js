const fs = require('fs');
const readline = require('readline');

// Helper: Convert flat object with dot notation into nested object
function nestObject(flatObj) {
  const nested = {};
  for (const key in flatObj) {
    const value = flatObj[key];
    const keys = key.split('.');
    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) {
        acc[k] = value;
      } else {
        acc[k] = acc[k] || {};
      }
      return acc[k];
    }, nested);
  }
  return nested;
}

async function parseCSV(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let headers = [];
  const users = [];

  for await (const line of rl) {
    if (!line.trim()) continue; 

    const row = line.split(',').map(val => val.trim());

    if (headers.length === 0) {
      headers = row;
    } else {
      const flatObj = {};
      headers.forEach((key, index) => {
        flatObj[key] = row[index];
      });

      const nested = nestObject(flatObj);
      const firstName = flatObj['name.firstName'];
      const lastName = flatObj['name.lastName'];
      const name = `${firstName} ${lastName}`;
      const age = parseInt(flatObj['age'], 10);

      const address = nested.address || null;

      delete flatObj['name.firstName'];
      delete flatObj['name.lastName'];
      delete flatObj['age'];
      Object.keys(flatObj).forEach(k => {
        if (k.startsWith('address.')) delete flatObj[k];
      });

      const additional_info = Object.keys(flatObj).length ? nestObject(flatObj) : null;

      users.push({ name, age, address, additional_info });
    }
  }

  return users;
}

module.exports = { parseCSV };