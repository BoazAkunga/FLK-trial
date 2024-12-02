import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch players from the backend
    axios.get('http://localhost:5000/api/players')
      .then(response => setPlayers(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="app">
      <h1>Fantasy League Team</h1>
      <div className="fantasy-pitch">
        {['GK', 'DEF', 'MID', 'FWD'].map(position => (
          <div key={position} className="player-row">
            {players.filter(player => player.Position === position).map(player => (
              <div key={player.PlayerID} className="player-card">
                <h3>{player.Name}</h3>
                <p>{player.Points} Points</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
