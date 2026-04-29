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

              <div className="social-links-container">
                <div className="social-links">
                  <a href="https://x.com/GuenterWiestner" target="_blank" rel="noreferrer" className="social-button">𝕏</a>
                  <a href="https://farcaster.xyz/gingi" target="_blank" rel="noreferrer" className="social-button">🟣 Farcaster</a>
                  <a href="https://t.me/gingi_info" target="_blank" rel="noreferrer" className="social-button">Telegram</a>
                  <a href={`https://dexscreener.com/base/${contractAddress}`} target="_blank" rel="noreferrer" className="social-button">📈 Chart</a>
                </div>
              </div>

              <footer className="footer">
                <p>© 2026 Luisli Gold Dashboard | Built on Base 🔵</p>
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