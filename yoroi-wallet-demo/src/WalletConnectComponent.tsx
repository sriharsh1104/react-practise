import React, { useState } from 'react';

// TypeScript declaration for window.cardano
declare global {
  interface Window {
    cardano?: {
      yoroi?: {
        enable(network?: string): Promise<any>;
      };
    };
  }
}

const WalletConnectComponent = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState('mainnet'); // 'mainnet' or 'preprod'

  const handleConnect = async () => {
    try {
      setLoading(true);
      console.log('🔄 Starting Yoroi connection...');
      console.log('🌐 Network:', network);
      
      // Check if Yoroi extension is available
      if (typeof window !== 'undefined' && window.cardano && window.cardano.yoroi) {
        console.log('✅ Yoroi extension found');
        
        // Enable Yoroi wallet with network specification
        const wallet = await window.cardano.yoroi.enable(network);
        console.log('🔗 Wallet enabled for network:', network);
        console.log('🔗 Wallet object:', wallet);
        
        // Get wallet address
        const usedAddresses = await wallet.getUsedAddresses();
        console.log('📋 All used addresses:', usedAddresses);
        
        if (usedAddresses.length > 0) {
          const selectedAddress = usedAddresses[0];
          setAddress(selectedAddress);
          console.log('🎯 Selected address:', selectedAddress);
          console.log('📍 Address (first 10 chars):', selectedAddress.slice(0, 10));
          console.log('📍 Address (last 10 chars):', selectedAddress.slice(-10));
        }
        
        setConnected(true);
        console.log('✅ Yoroi wallet connected successfully!');
        alert(`Yoroi wallet connected to ${network}!`);
      } else {
        console.log('❌ Yoroi extension not found');
        alert('Yoroi extension not found. Please install Yoroi extension first.');
      }
    } catch (error: any) {
      console.error('❌ Connection error:', error);
      alert('Connection error: ' + (error?.message || error));
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    console.log('🔌 Disconnecting wallet...');
    setConnected(false);
    setAddress('');
    console.log('✅ Wallet disconnected');
  };

  const toggleNetwork = () => {
    const newNetwork = network === 'mainnet' ? 'preprod' : 'mainnet';
    setNetwork(newNetwork);
    console.log('🔄 Network switched to:', newNetwork);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      <div style={{ marginBottom: 20 }}>
        <p>Network: <strong>{network}</strong></p>
        <button 
          onClick={toggleNetwork}
          style={{ padding: '5px 10px', fontSize: '12px', marginBottom: 10 }}
        >
          Switch to {network === 'mainnet' ? 'Preprod' : 'Mainnet'}
        </button>
      </div>
      
      {!connected ? (
        <button 
          onClick={handleConnect} 
          disabled={loading}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          {loading ? 'Connecting...' : `Connect Yoroi (${network})`}
        </button>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p>✅ Connected to Yoroi ({network})</p>
          {address && (
            <p>Address: {address.slice(0, 10)}...{address.slice(-10)}</p>
          )}
          <button 
            onClick={handleDisconnect}
            style={{ padding: '10px 20px', fontSize: '16px', marginTop: '10px' }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnectComponent;