const pool = require('./db');

async function insertUsers(users) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const user of users) {
      await client.query(
        `INSERT INTO users (name, age, address, additional_info)
         VALUES ($1, $2, $3, $4)`,
        [
          user.name,
          user.age,
          user.address ? JSON.stringify(user.address) : null,
          user.additional_info ? JSON.stringify(user.additional_info) : null,
        ]
      );
    }

    await client.query('COMMIT');
    console.log(`Inserted ${users.length} users into DB`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error inserting users:', err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { insertUsers };