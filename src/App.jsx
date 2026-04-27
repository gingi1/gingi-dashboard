import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stats, setStats] = useState({
    price: 'Loading...',
    liquidity: 'Loading...',
    holders: 'Loading...',
    marketCap: 'Loading...'
  });

  const contractAddress = "0x0caE8b7e812e46145450Ea0f3048D64F091820aE";

  useEffect(() => {
    // Später kommt hier die Live-Abfrage rein
  }, []);

  return (
    <div className="container">
      <div className="content-wrapper">
        
        {/* 🌕 MOND */}
        <div className="moon-container">
          <img 
            src="https://img.icons8.com/emoji/256/full-moon-emoji.png" 
            className="lgold-logo" 
            alt="Luisli Gold Moon" 
          />
        </div>

        {/* 👑 TITEL */}
        <h1 className="gold-title">LUISLI GOLD</h1>
        <p className="subtitle">The Golden Standard on Base 🔵</p>

        {/* 📊 KARTE */}
        <div className="card">
          <div className="status-badge">Live Market Data</div>
          <div className="stats-grid">
            <div className="stat-item">
              <span>Price:</span>
              <span className="stat-value">{stats.price}</span>
            </div>
            <div className="stat-item">
              <span>Liquidity:</span>
              <span className="stat-value">No Pool yet</span>
            </div>
            <div className="stat-item">
              <span>Market Cap:</span>
              <span className="stat-value">{stats.marketCap}</span>
            </div>
          </div>
        </div>

        {/* 🔗 SOCIALS */}
        <div className="social-links-container">
          <div className="social-links">
            <a href="https://x.com/GuenterWiestner" target="_blank" rel="noreferrer" className="social-button">𝕏</a>
            <a href="https://farcaster.xyz/gingi" target="_blank" rel="noreferrer" className="social-button">🟣 Farcaster</a>
            <a href="https://t.me/gingi_info" target="_blank" rel="noreferrer" className="social-button">Telegram</a>
            <a href={`https://dexscreener.com/base/${contractAddress}`} target="_blank" rel="noreferrer" className="social-button">📈 Chart</a>
          </div>
        </div>

        {/* 📝 FOOTER */}
        <footer className="footer">
          <p>© 2026 Luisli Gold Dashboard | Built on Base 🔵</p>
          <p className="ca-text">CA: {contractAddress}</p>
        </footer>

      </div>
    </div>
  );
}

export default App;