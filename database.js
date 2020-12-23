const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/budget.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to SQLite database.');
        db.run(
            `CREATE TABLE budget(
                bid INTEGER PRIMARY KEY,
                payer TEXT,
                payee TEXT,
                amount INTEGER,
                description TEXT,
                date TEXT,
                time TEXT
                )`,
            (err) => {
                if (err) {
                    console.error('Table exist');
                }
            }
        );
    }
});

// `CREATE TABLE budget(bid INTEGER PRIMARY KEY, payer TEXT, payee TEXT, amount INTEGER, description TEXT)`,

// `INSERT INTO budget(payer, payee, amount, description) VALUES(?),(?),(?),(?)`,
//     ['self', 'rawal', 100, 'meal'],
// `SELECT * FROM budget`

module.exports = db;
