import React, { useState, useEffect } from 'react';
/* Importe für die Wallet-Funktion */
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, ConnectButton, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import './App.css';

/* Wallet-Konfiguration direkt in der Datei */
const config = getDefaultConfig({
  appName: 'Luisli Gold Dashboard',
  projectId: '3c5be352cc40f848518085e0cefef896', // Deine Projekt-ID
  chains: [base],
});

const queryClient = new QueryClient();

function App() {
  const [stats, setStats] = useState({
    price: '$0.00001161',
    liquidity: '$462',
    marketCap: '$244'
  });

  const contractAddress = "0x0cae8b7e812e46145450ea0f3048d64f091820ae";

  /* Daten-Abruf von Dexscreener */
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
            marketCap: `$${Math.round(pair.fdv).toLocaleString()}`
          });
        }
      } catch (error) {
        console.error("Datenfehler:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: '#FFD700', accentColorForeground: 'black' })}>
          
          {/* Das eigentliche Layout */}
          <div className="container">
            
            {/* Wallet Button oben rechts */}
            <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
              <ConnectButton label="Connect Wallet" />
            </div>

            <div className="content-wrapper">
              <div className="moon-container">
                <img 
                  src="https://img.icons8.com/emoji/256/full-moon-emoji.png"
                  className="lgold-logo"
                  alt="Luisli Gold Moon"
                />
              </div>

              <h1 className="gold-title">LUISLI GOLD</h1>
              <p className="subtitle">The Golden Standard on Base 🔵</p>

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
              <div className="info-section" style={{ 
  marginTop: '40px', 
  marginBottom: '60px', // Schiebt den Footer weiter nach unten
  textAlign: 'left', 
  padding: '25px', 
  backgroundColor: 'rgba(255,255,255,0.08)', 
  borderRadius: '16px',
  border: '1px solid rgba(255,255,255,0.1)' 
}}>
  <h2 style={{ color: '#ffffff', marginBottom: '15px', fontSize: '1.5rem' }}>Onchain Infrastructure & Vision</h2>
  <p style={{ color: '#e0e0e0', lineHeight: '1.6' }}>
    At <strong style={{ color: '#ffffff' }}>Luisli Gold ($LGOLD)</strong>, transparency and technical integrity are our core principles. 
    We are deeply integrated into the Base ecosystem, leveraging high-signal onchain architecture 
    to build a resilient and lasting protocol.
  </p>
  <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
    <li style={{ marginBottom: '12px', color: '#e0e0e0' }}>✅ <strong style={{ color: '#ffffff' }}>Smart Contract Verified:</strong> Our core protocol is live on Base Mainnet.</li>
    <li style={{ marginBottom: '12px', color: '#e0e0e0' }}>🔗 <strong style={{ color: '#ffffff' }}>Onchain Identity:</strong> Authenticated via Basename: <a href="https://base.org/name/gingi" target="_blank" rel="noreferrer" style={{ color: '#4da3ff', textDecoration: 'underline', fontWeight: 'bold' }}>gingi.base.eth</a>.</li>
    <li style={{ marginBottom: '12px', color: '#e0e0e0' }}>🚀 <strong style={{ color: '#ffffff' }}>Building for the Future:</strong> Focused on organic growth within the Base network.</li>
  </ul>
  <p style={{ marginTop: '20px', color: '#e0e0e0' }}>
    Track our journey on <a href={`https://basescan.org/address/${contractAddress}`} target="_blank" rel="noreferrer" style={{ color: '#4da3ff', textDecoration: 'underline', fontWeight: 'bold' }}>Basescan</a>.
  </p>
</div>
              <div className="social-links-container">
                <div className="social-links">
                  <a href="https://x.com/GuenterWiestner" target="_blank" rel="noreferrer" className="social-button">𝕏</a>
                  <a href="https://farcaster.xyz/gingi" target="_blank" rel="noreferrer" className="social-button">🟣 Farcaster</a>
                  <a href="https://t.me/gingi_info" target="_blank" rel="noreferrer" className="social-button">Telegram</a>
                  <a href={`https://dexscreener.com/base/${contractAddress}`} target="_blank" rel="noreferrer" className="social-button">📈 Chart</a>
                </div>
              </div>

              <footer className="footer" style={{ marginTop: '40px', padding: '20px', borderTop: '1px solid rgba(255, 215, 0, 0.1)' }}>
        <p>
          Built by 🔵 
          <a 
            href="https://www.base.org/name/gingi" 
            target="_blank" 
            rel="noreferrer"
            style={{ color: '#FFD700', textDecoration: 'none', fontWeight: 'bold', marginLeft: '5px' }}
          >
            gingi.base.eth
          </a>
        </p>
        <p>© 2026 Luisli Gold - The Golden Standard on Base</p>
        <p className="ca-text">CA: {contractAddress}</p>
      </footer>
            </div>
          </div>

        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;