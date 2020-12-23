const express = require('express');
const cors = require('cors');

const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

// create a transaction

app.post('/transaction', async (req, res) => {
    const sql = `INSERT INTO budget(payer, payee, amount, description, date, time) VALUES(?, ?, ?, ?, ?, ?)`;
    const { payer, payee, amount, description, date, time } = req.body;
    const params = [payer, payee, amount, description, date, time];
    db.run(sql, params, (err, _) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            bid: this.lastID,
        });
    });
});

// get all transactinos

app.get('/transaction', async (_, res) => {
    const sql = `SELECT * FROM budget`;
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        });
    });
});

// get a transaction

app.get('/transaction/:bid', async (req, res) => {
    const sql = `SELECT * FROM budget WHERE bid = ?`;
    const params = [req.params.bid];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row,
        });
    });
});

// update a transaction

app.patch('/transaction/:bid', (req, res) => {
    const sql = `UPDATE budget SET 
                payer = ?,
                payee = ?,
                amount = ?,
                description = ?,
                date = ?,
                time = ?
                WHERE bid = ?`;
    const { payer, payee, amount, description, date, time } = req.body;
    const params = [
        payer,
        payee,
        amount,
        description,
        date,
        time,
        req.params.bid,
    ];
    db.run(sql, params, (err, _) => {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }
        res.json({
            message: 'success',
            changes: this.changes,
        });
    });
});

// delete a transaction

app.delete('/transaction/:bid', (req, res) => {
    const sql = `DELETE FROM budget WHERE bid = ?`;
    const params = [req.params.bid];
    db.run(sql, params, (err, _) => {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }
        res.json({
            message: 'success',
            changes: this.changes,
        });
    });
});

app.listen(5000, () => {
    console.log('server started on port 5000');
});
