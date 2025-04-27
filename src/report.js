const pool = require('./db');

async function generateAgeDistributionReport() {
  const client = await pool.connect();

  try {
    const res = await client.query('SELECT age FROM users');
    const ages = res.rows.map(row => row.age);

    const total = ages.length;
    let group1 = 0, group2 = 0, group3 = 0, group4 = 0;

    for (const age of ages) {
      if (age < 20) group1++;
      else if (age <= 40) group2++;
      else if (age <= 60) group3++;
      else group4++;
    }

    console.log('\nAge-Group Distribution Report');
    console.log('Age-Group\t% Distribution');
    console.log(`< 20\t\t${((group1 / total) * 100).toFixed(2)}`);
    console.log(`20 to 40\t${((group2 / total) * 100).toFixed(2)}`);
    console.log(`40 to 60\t${((group3 / total) * 100).toFixed(2)}`);
    console.log(`> 60\t\t${((group4 / total) * 100).toFixed(2)}\n`);

  } catch (err) {
    console.error('Error generating report:', err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { generateAgeDistributionReport };