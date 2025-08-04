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
  const [network, setNetwork] = useState('preprod'); // Default to preprod for testing
  const [wallet, setWallet] = useState<any>(null);
  
  // Transaction states
  const [showSendForm, setShowSendForm] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [utxos, setUtxos] = useState<any[]>([]);

  const handleConnect = async () => {
    try {
      setLoading(true);
      console.log('🔄 Starting Yoroi connection...');
      console.log('🌐 Network:', network);
      
      if (typeof window !== 'undefined' && window.cardano && window.cardano.yoroi) {
        console.log('✅ Yoroi extension found');
        
        const walletInstance = await window.cardano.yoroi.enable(network);
        console.log('🔗 Wallet enabled for network:', network);
        console.log('🔗 Wallet object:', walletInstance);
        console.log('🔗 Wallet methods available:', Object.keys(walletInstance));
        
        setWallet(walletInstance);
        
        // Try different methods to get address
        let selectedAddress = '';
        
        // Method 1: Try getUsedAddresses
        try {
          console.log('📋 Method 1: Trying getUsedAddresses...');
          const usedAddresses = await walletInstance.getUsedAddresses();
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
            const unusedAddresses = await walletInstance.getUnusedAddresses();
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
            const changeAddress = await walletInstance.getChangeAddress();
            console.log('📋 Change address:', changeAddress);
            
            if (changeAddress) {
              selectedAddress = changeAddress;
              console.log('✅ Found address via getChangeAddress:', selectedAddress);
            }
          } catch (error) {
            console.log('❌ getChangeAddress failed:', error);
          }
        }
        
        if (selectedAddress) {
          console.log('🎯 Final selected address:', selectedAddress);
          setAddress(selectedAddress);
          alert(`Connected! Your wallet address: ${selectedAddress}`);
          
          // Get UTXOs after connection
          await getWalletUTXOs(walletInstance);
        } else {
          console.log('⚠️ No addresses found with any method');
          alert('Connected but could not find any addresses. Check console for details.');
        }
        
        setConnected(true);
        console.log('✅ Yoroi wallet connected successfully!');
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

  const getWalletUTXOs = async (walletInstance: any) => {
    try {
      console.log('📋 Getting UTXOs...');
      const walletUtxos = await walletInstance.getUtxos();
      console.log('📋 Available UTXOs:', walletUtxos);
      setUtxos(walletUtxos || []);
      
      if (walletUtxos && walletUtxos.length > 0) {
        let totalBalance = 0;
        walletUtxos.forEach((utxo: any) => {
          if (utxo.amount && utxo.amount.lovelace) {
            totalBalance += parseInt(utxo.amount.lovelace);
          }
        });
        console.log('💰 Total balance:', totalBalance / 1000000, 'ADA');
        alert(`Wallet balance: ${totalBalance / 1000000} ADA`);
      } else {
        console.log('⚠️ No UTXOs found');
        alert('No test ADA found! Get test ADA from faucet:\n\n1. Go to: https://docs.cardano.org/cardano-testnet/tools/faucet/\n2. Enter your address: ' + address + '\n3. Request test ADA');
      }
    } catch (error) {
      console.error('❌ Error getting UTXOs:', error);
    }
  };

  const handleDisconnect = () => {
    console.log('🔌 Disconnecting wallet...');
    setConnected(false);
    setAddress('');
    setWallet(null);
    setShowSendForm(false);
    setUtxos([]);
    console.log('✅ Wallet disconnected');
  };

  const handleSendTransaction = async () => {
    if (!wallet || !recipientAddress || !amount) {
      alert('Please fill all fields and ensure wallet is connected');
      return;
    }

    if (utxos.length === 0) {
      alert('No test ADA available! Get test ADA from faucet first.');
      return;
    }

    try {
      setSending(true);
      console.log('🚀 Starting transaction...');
      console.log('📤 From:', address);
      console.log('📥 To:', recipientAddress);
      console.log('💰 Amount:', amount, 'ADA');

      // Convert ADA to Lovelace (1 ADA = 1,000,000 Lovelace)
      const amountInLovelace = parseFloat(amount) * 1000000;
      console.log('💰 Amount in Lovelace:', amountInLovelace);

      // Calculate total available balance from UTXOs
      let totalBalance = 0;
      utxos.forEach(utxo => {
        if (utxo.amount && utxo.amount.lovelace) {
          totalBalance += parseInt(utxo.amount.lovelace);
        }
      });
      console.log('💰 Total balance from UTXOs:', totalBalance, 'lovelace');

      // Get change address
      console.log('🔄 Getting change address...');
      const changeAddress = await wallet.getChangeAddress();
      console.log('🔄 Change address:', changeAddress);

      // Calculate change amount (total - amount - fee)
      const estimatedFee = 200000; // 0.2 ADA fee estimate
      const changeAmount = totalBalance - amountInLovelace - estimatedFee;
      console.log('💰 Change amount:', changeAmount, 'lovelace');

      if (changeAmount < 0) {
        throw new Error(`Insufficient balance. Need ${amountInLovelace + estimatedFee} lovelace, but have ${totalBalance} lovelace`);
      }

      // Create proper Cardano transaction structure
      const transaction = {
        inputs: utxos.slice(0, 1), // Use first UTXO as input
        outputs: [
          {
            address: recipientAddress,
            amount: {
              lovelace: amountInLovelace.toString()
            }
          },
          {
            address: changeAddress,
            amount: {
              lovelace: changeAmount.toString()
            }
          }
        ],
        metadata: {
          label: 'Yoroi Demo Transaction',
          message: `Sent ${amount} ADA via demo app`
        }
      };

      console.log('📝 Transaction object:', transaction);
      console.log('📤 Sending to:', recipientAddress);
      console.log('🔄 Change going to:', changeAddress);
      console.log('💰 Amount sent:', amountInLovelace, 'lovelace');
      console.log('💰 Change amount:', changeAmount, 'lovelace');

      // Try to sign the transaction
      console.log('✍️ Signing transaction...');
      const signedTx = await wallet.signTx(transaction, true);
      console.log('✍️ Transaction signed:', signedTx);

      // Submit the transaction
      console.log('📤 Submitting transaction...');
      const txHash = await wallet.submitTx(signedTx);
      console.log('✅ Transaction submitted! Hash:', txHash);

      alert(`Transaction successful! Hash: ${txHash}\n\nSent: ${amount} ADA\nTo: ${recipientAddress.slice(0, 20)}...\nChange: ${changeAmount / 1000000} ADA`);
      
      // Reset form and refresh UTXOs
      setRecipientAddress('');
      setAmount('');
      setShowSendForm(false);
      await getWalletUTXOs(wallet);
      
    } catch (error: any) {
      console.error('❌ Transaction error:', error);
      console.error('❌ Error details:', error?.message, error?.stack);
      alert('Transaction failed: ' + (error?.message || error));
    } finally {
      setSending(false);
    }
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
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <p>✅ Connected to Yoroi ({network})</p>
          {address && (
            <div style={{ marginBottom: 20 }}>
              <p>Your Address: {address.slice(0, 10)}...{address.slice(-10)}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>Full: {address}</p>
            </div>
          )}
          
          {/* UTXO Status */}
          <div style={{ marginBottom: 20, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <p><strong>Test ADA Status:</strong></p>
            {utxos.length > 0 ? (
              <p style={{ color: 'green' }}>✅ {utxos.length} UTXO(s) available</p>
            ) : (
              <div>
                <p style={{ color: 'red' }}>❌ No test ADA available</p>
                <p style={{ fontSize: '12px' }}>
                  Get test ADA from: <br/>
                  <a href="https://docs.cardano.org/cardano-testnet/tools/faucet/" target="_blank" rel="noopener noreferrer">
                    Cardano Testnet Faucet
                  </a>
                </p>
              </div>
            )}
          </div>
          
          {/* Send Transaction Form */}
          {showSendForm ? (
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginBottom: 20 }}>
              <h3>Send Transaction</h3>
              <div style={{ marginBottom: 10 }}>
                <label>Recipient Address:</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="addr_test1..."
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Amount (ADA):</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.1"
                  step="0.1"
                  min="0"
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button 
                  onClick={handleSendTransaction}
                  disabled={sending || !recipientAddress || !amount || utxos.length === 0}
                  style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  {sending ? 'Sending...' : 'Send Transaction'}
                </button>
                <button 
                  onClick={() => setShowSendForm(false)}
                  style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowSendForm(true)}
              disabled={utxos.length === 0}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: utxos.length > 0 ? '#2196F3' : '#ccc', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                marginBottom: 10 
              }}
            >
              {utxos.length > 0 ? 'Send Transaction' : 'No Test ADA Available'}
            </button>
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