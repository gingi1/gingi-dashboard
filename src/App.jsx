import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stats, setStats] = useState({
    price: 'Wait for Launch',
    liquidity: 'No Pool',
    marketCap: 'Calculating...',
    priceChange: ''
  });

  // Die korrekte Luisli Gold Contract Address (LGOLD)
  const contractAddress = "0x0cae8b7e812e46145450ea0f3048d64f091820ae";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`);
        const data = await response.json();

        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          setStats({
            price: `$${parseFloat(pair.priceUsd).toFixed(10)}`,
            liquidity: `$${Math.round(pair.liquidity.usd).toLocaleString()}`,
            marketCap: `$${Math.round(pair.fdv).toLocaleString()}`,
            priceChange: pair.priceChange.h24
          });
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Alle 30 Sekunden aktualisieren
    return () => clearInterval(interval);
  }, [contractAddress]);

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

        {/* 📊 KARTE MIT LIVE DATEN */}
        <div className="card">
          <div className="status-badge">Live Market Data</div>
          <div className="stats-grid">
            <div className="stat-item">
              <span>Price:</span>
              <span className="stat-value">{stats.price}</span>
            </div>
            <div className="stat-item">
              <span>Liquidity:</span>
              <span className="stat-value">{stats.liquidity}</span>
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