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
        console.log('🔍 Window cardano object:', window.cardano);
        
        // Enable Yoroi wallet with network specification
        console.log('🔗 Attempting to enable wallet for network:', network);
        const wallet = await window.cardano.yoroi.enable(network);
        console.log('🔗 Wallet enabled for network:', network);
        console.log('🔗 Wallet object:', wallet);
        console.log('🔗 Wallet methods available:', Object.keys(wallet));
        
        // Try different methods to get address
        let selectedAddress = '';
        
        // Method 1: Try getUsedAddresses
        try {
          console.log('📋 Method 1: Trying getUsedAddresses...');
          const usedAddresses = await wallet.getUsedAddresses();
          console.log('📋 Used addresses:', usedAddresses);
          
          if (usedAddresses && usedAddresses.length > 0) {
            selectedAddress = usedAddresses[0];
            console.log('✅ Found address via getUsedAddresses:', selectedAddress);
          }
        } catch (error) {
          console.log('❌ getUsedAddresses failed:', error);
        }
        
        // Method 2: Try getUnusedAddresses
        if (!selectedAddress) {
          try {
            console.log('📋 Method 2: Trying getUnusedAddresses...');
            const unusedAddresses = await wallet.getUnusedAddresses();
            console.log('📋 Unused addresses:', unusedAddresses);
            
            if (unusedAddresses && unusedAddresses.length > 0) {
              selectedAddress = unusedAddresses[0];
              console.log('✅ Found address via getUnusedAddresses:', selectedAddress);
            }
          } catch (error) {
            console.log('❌ getUnusedAddresses failed:', error);
          }
        }
        
        // Method 3: Try getChangeAddress
        if (!selectedAddress) {
          try {
            console.log('📋 Method 3: Trying getChangeAddress...');
            const changeAddress = await wallet.getChangeAddress();
            console.log('📋 Change address:', changeAddress);
            
            if (changeAddress) {
              selectedAddress = changeAddress;
              console.log('✅ Found address via getChangeAddress:', selectedAddress);
            }
          } catch (error) {
            console.log('❌ getChangeAddress failed:', error);
          }
        }
        
        // Method 4: Try getRewardAddresses
        if (!selectedAddress) {
          try {
            console.log('📋 Method 4: Trying getRewardAddresses...');
            const rewardAddresses = await wallet.getRewardAddresses();
            console.log('📋 Reward addresses:', rewardAddresses);
            
            if (rewardAddresses && rewardAddresses.length > 0) {
              selectedAddress = rewardAddresses[0];
              console.log('✅ Found address via getRewardAddresses:', selectedAddress);
            }
          } catch (error) {
            console.log('❌ getRewardAddresses failed:', error);
          }
        }
        
        // Method 5: Check if wallet has getAddress method
        if (!selectedAddress) {
          try {
            console.log('📋 Method 5: Trying wallet.getAddress...');
            if (wallet.getAddress) {
              selectedAddress = await wallet.getAddress();
              console.log('✅ Found address via getAddress:', selectedAddress);
            }
          } catch (error) {
            console.log('❌ getAddress failed:', error);
          }
        }
        
        if (selectedAddress) {
          console.log('🎯 Final selected address:', selectedAddress);
          console.log('📍 Address (first 10 chars):', selectedAddress.slice(0, 10));
          console.log('📍 Address (last 10 chars):', selectedAddress.slice(-10));
          console.log('📍 Full address length:', selectedAddress.length);
          setAddress(selectedAddress);
          
          // Show address in alert so user can see it
          alert(`Connected! Your wallet address: ${selectedAddress}`);
        } else {
          console.log('⚠️ No addresses found with any method');
          console.log('🔍 All wallet methods:', Object.keys(wallet));
          alert('Connected but could not find any addresses. Check console for details.');
        }
        
        setConnected(true);
        console.log('✅ Yoroi wallet connected successfully!');
      } else {
        console.log('❌ Yoroi extension not found');
        console.log('🔍 Window object:', typeof window);
        console.log('🔍 Window cardano:', window.cardano);
        console.log('🔍 Window cardano yoroi:', window.cardano?.yoroi);
        alert('Yoroi extension not found. Please install Yoroi extension first.');
      }
    } catch (error: any) {
      console.error('❌ Connection error:', error);
      console.error('❌ Error message:', error?.message);
      console.error('❌ Error stack:', error?.stack);
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
            <div>
              <p>Address: {address.slice(0, 10)}...{address.slice(-10)}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>Full: {address}</p>
            </div>
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