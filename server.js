const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database(':memory:'); // Use in-memory DB for simplicity
db.serialize(() => {
  // Create tables
  db.run(`
    CREATE TABLE Players (
      PlayerID INTEGER PRIMARY KEY,
      Name TEXT,
      Position TEXT,
      Points INTEGER
    )
  `);

  db.run(`
    CREATE TABLE FantasyTeams (
      UserID INTEGER,
      PlayerID INTEGER,
      IsCaptain BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID)
    )
  `);

  // Insert sample data
  const players = [
    [1, 'Flekken', 'GK', 2],
    [2, 'Van Hecke', 'DEF', 2],
    [3, 'Robertson', 'DEF', 6],
    [4, 'Aina', 'DEF', 8],
    [5, 'M. Salah', 'MID', 13],
    [6, 'Saka', 'MID', 18],
    [7, 'Palmer', 'MID', 28],
    [8, 'B. Fernandes', 'MID', 9],
    [9, 'Cunha', 'FWD', 2],
    [10, 'Isak', 'FWD', 1],
    [11, 'João Pedro', 'FWD', 2],
  ];

  const stmt = db.prepare("INSERT INTO Players (PlayerID, Name, Position, Points) VALUES (?, ?, ?, ?)");
  players.forEach(player => stmt.run(...player));
  stmt.finalize();
});

// API Endpoints
app.get('/api/players', (req, res) => {
  db.all("SELECT * FROM Players", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
