import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [price, setPrice] = useState("Lade...");
  const [mcap, setMcap] = useState("Lade...");
  const [change, setChange] = useState(0);

  // Deine Contract Adresse
  const contractAddress = "0x0caE8b7e812e46145450Ea0f3048D64F091820aE";

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        // Wir fragen die Dexscreener API direkt ab
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`);
        const data = await response.json();
        
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          // Preis auf 8 Nachkommastellen runden
          setPrice("$" + parseFloat(pair.priceUsd).toFixed(8));
          // Market Cap (FDV) schön formatiert
          setMcap("$" + parseInt(pair.fdv).toLocaleString());
          // 24h Änderung
          setChange(pair.priceChange.h24);
        } else {
          // Falls noch keine Liquidität da ist
          setPrice("No Pool yet");
          setMcap("N/A");
        }
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
        setPrice("Error");
      }
    };

    fetchPrice();
    // Alle 30 Sekunden aktualisieren
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="logo-section">
          <img 
            src="https://img.icons8.com/emoji/160/full-moon-emoji.png" 
            className="lgold-logo" 
            alt="Luisli Gold Moon" 
          />
        </div>
        
        <h1 className="gold-title">Luisli Gold</h1>
        <p className="subtitle">The official Headquarters of $LGOLD on Base.</p>
        
        <div className="card">
          <div className="status-badge">Live on Base 🔵</div>
          <h2>Token Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span>Price (USD)</span>
              <strong style={{color: '#FFD700'}}>{price}</strong>
            </div>
            <div className="stat-item">
              <span>Market Cap</span>
              <strong>{mcap}</strong>
            </div>
            <div className="stat-item">
              <span>24h Change</span>
              <strong style={{color: change >= 0 ? '#00ff00' : '#ff4444'}}>
                {change >= 0 ? `+${change}` : change}%
              </strong>
            </div>
          </div>
        </div>

        {/* Deine integrierten Social Links */}
        <div className="social-links">
          {/* X (Twitter) Button */}
          <a href="https://x.com/GuenterWiestner" target="_blank" rel="noreferrer" className="social-button x-link">
            𝕏
          </a>
          
          {/* Farcaster Button */}
          <a href="https://farcaster.xyz/gingi" target="_blank" rel="noreferrer" className="social-button fc-link">
            🟣 Farcaster
          </a>

          {/* Telegram Button */}
          <a href="https://t.me/gingi_info" target="_blank" rel="noreferrer" className="social-button tg-link">
            Telegram
          </a>

          {/* Token Contract / Chart Button */}
          <a href={`https://dexscreener.com/base/${contractAddress}`} target="_blank" rel="noreferrer" className="social-button dex-link">
            📈 Chart
          </a>
        </div>

        <div className="footer">
          <p>© 2026 Luisli Gold Imperium</p>
          <p style={{fontSize: '0.6rem', opacity: 0.4, marginTop: '10px', letterSpacing: '1px'}}>
            CA: {contractAddress}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App