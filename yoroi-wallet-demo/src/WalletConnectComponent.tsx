import React, { useState } from 'react';

// TypeScript declaration for window.cardano
declare global {
  interface Window {
    cardano?: {
      yoroi?: {
        enable(network?: string): Promise<any>;
      };
      eternl?: {
        enable(network?: string): Promise<any>;
      };
      nami?: {
        enable(network?: string): Promise<any>;
      };
      flint?: {
        enable(network?: string): Promise<any>;
      };
    };
  }
}

// CP113 Protocol Information
const CP113_FEATURES = {
  protocolVersion: '8.0.0',
  features: [
    'Reference Inputs',
    'Inline Datums', 
    'Reference Scripts',
    'Collateral Outputs',
    'Enhanced Transaction Structure'
  ],
  description: 'Cardano Protocol 113 introduces advanced transaction capabilities including reference inputs, inline datums, and reference scripts for improved efficiency and functionality.'
};

// Wallet Support Matrix
const WALLET_SUPPORT = {
  eternl: {
    name: 'Eternl (CCVault)',
    cp113Support: 'FULL',
    features: ['Reference Inputs', 'Inline Datums', 'Reference Scripts', 'Advanced Transaction Builder'],
    recommended: true
  },
  flint: {
    name: 'Flint',
    cp113Support: 'GOOD',
    features: ['Reference Inputs', 'Inline Datums', 'Basic Reference Scripts'],
    recommended: true
  },
  nami: {
    name: 'Nami',
    cp113Support: 'PARTIAL',
    features: ['Basic Reference Inputs', 'Limited Inline Datums'],
    recommended: false
  },
  yoroi: {
    name: 'Yoroi',
    cp113Support: 'LIMITED',
    features: ['Protocol Detection', 'Basic Transactions'],
    recommended: false
  }
};

const WalletConnectComponent = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState('preprod'); // Default to preprod for testing
  const [wallet, setWallet] = useState<any>(null);
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  
  // Transaction states
  const [showSendForm, setShowSendForm] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [utxos, setUtxos] = useState<any[]>([]);
  
  // CP113 specific states
  const [protocolVersion, setProtocolVersion] = useState<string>('');
  const [showCP113Info, setShowCP113Info] = useState(false);
  const [useReferenceInputs, setUseReferenceInputs] = useState(false);
  const [inlineDatum, setInlineDatum] = useState('');
  const [referenceScript, setReferenceScript] = useState('');
  const [showAdvancedCP113, setShowAdvancedCP113] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);

  // Detect Available Wallets
  const detectAvailableWallets = () => {
    const wallets: string[] = [];
    if (typeof window !== 'undefined' && window.cardano) {
      if (window.cardano.eternl) wallets.push('eternl');
      if (window.cardano.flint) wallets.push('flint');
      if (window.cardano.nami) wallets.push('nami');
      if (window.cardano.yoroi) wallets.push('yoroi');
    }
    setAvailableWallets(wallets);
    console.log('🔍 Available wallets:', wallets);
    return wallets;
  };

  // CP113 Protocol Detection
  const detectProtocolVersion = async (walletInstance: any) => {
    try {
      console.log('🔍 Detecting Cardano protocol version...');
      
      // Try to get protocol parameters
      if (walletInstance.getProtocolParameters) {
        const params = await walletInstance.getProtocolParameters();
        console.log('📋 Protocol parameters:', params);
        
        if (params && params.protocolVersion) {
          const version = params.protocolVersion;
          setProtocolVersion(version);
          console.log('✅ Protocol version detected:', version);
          
          // Check if CP113 is supported (protocol version >= 8.0.0)
          const [major, minor] = version.split('.').map(Number);
          const supportsCP113 = major >= 8;
          
          if (supportsCP113) {
            console.log('✅ CP113 features are supported!');
            alert('🎉 CP113 (Cardano Protocol 113) is supported!\n\nFeatures available:\n• Reference Inputs\n• Inline Datums\n• Reference Scripts\n• Collateral Outputs');
          } else {
            console.log('⚠️ CP113 features not supported in this protocol version');
            alert('⚠️ CP113 features not available in protocol version ' + version);
          }
        }
      } else {
        console.log('⚠️ Protocol parameters not available');
        setProtocolVersion('Unknown');
      }
    } catch (error) {
      console.error('❌ Error detecting protocol version:', error);
      setProtocolVersion('Error');
    }
  };

  const connectWallet = async (walletType: string = 'eternl') => {
    try {
      setLoading(true);
      console.log(`🔄 Starting ${walletType} connection...`);
      console.log('🌐 Network:', network);
      
      // Detect available wallets first
      const available = detectAvailableWallets();
      
      if (typeof window !== 'undefined' && window.cardano && (window.cardano as any)[walletType]) {
        console.log(`✅ ${walletType} extension found`);
        
        const walletInstance = await (window.cardano as any)[walletType].enable(network);
        console.log('🔗 Wallet enabled for network:', network);
        console.log('🔗 Wallet object:', walletInstance);
        console.log('🔗 Wallet methods available:', Object.keys(walletInstance));
        
        setWallet(walletInstance);
        setSelectedWallet(walletType);
        
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
          
          // Detect protocol version and CP113 support
          await detectProtocolVersion(walletInstance);
        } else {
          console.log('⚠️ No addresses found with any method');
          alert('Connected but could not find any addresses. Check console for details.');
        }
        
        setConnected(true);
        console.log(`✅ ${walletType} wallet connected successfully!`);
      } else {
        console.log(`❌ ${walletType} extension not found`);
        alert(`${walletType} extension not found. Please install ${walletType} extension first.`);
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

  // CP113 Enhanced Transaction Function
  const handleCP113Transaction = async () => {
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
      console.log('🚀 Starting CP113-enhanced transaction...');
      console.log('📤 From:', address);
      console.log('📥 To:', recipientAddress);
      console.log('💰 Amount:', amount, 'ADA');
      console.log('🔗 Using Reference Inputs:', useReferenceInputs);
      console.log('📝 Inline Datum:', inlineDatum);
      console.log('📜 Reference Script:', referenceScript);

      // Convert ADA to Lovelace
      const amountInLovelace = parseFloat(amount) * 1000000;
      
      // Calculate total available balance
      let totalBalance = 0;
      utxos.forEach(utxo => {
        if (utxo.amount && utxo.amount.lovelace) {
          totalBalance += parseInt(utxo.amount.lovelace);
        }
      });

      const estimatedFee = 200000;
      const changeAmount = totalBalance - amountInLovelace - estimatedFee;

      if (changeAmount < 0) {
        throw new Error(`Insufficient balance. Need ${amountInLovelace + estimatedFee} lovelace, but have ${totalBalance} lovelace`);
      }

      // Get change address
      const changeAddress = await wallet.getChangeAddress();

      // Create CP113-enhanced transaction structure
      const transaction: any = {
        inputs: utxos.slice(0, 1),
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
        ]
      };

      // Add CP113 features if enabled
      if (useReferenceInputs && utxos.length > 1) {
        transaction.referenceInputs = [utxos[1]]; // Use second UTXO as reference
        console.log('🔗 Added reference input');
      }

      if (inlineDatum) {
        transaction.outputs[0].datum = {
          inline: inlineDatum
        };
        console.log('📝 Added inline datum');
      }

      if (referenceScript) {
        transaction.referenceScripts = [referenceScript];
        console.log('📜 Added reference script');
      }

      console.log('📝 CP113 Transaction object:', transaction);

      // Sign and submit transaction
      const signedTx = await wallet.signTx(transaction, true);
      const txHash = await wallet.submitTx(signedTx);

      console.log('✅ CP113 transaction submitted! Hash:', txHash);
      alert(`CP113 Transaction successful!\n\nHash: ${txHash}\nSent: ${amount} ADA\nFeatures used: ${[
        useReferenceInputs ? 'Reference Inputs' : '',
        inlineDatum ? 'Inline Datum' : '',
        referenceScript ? 'Reference Script' : ''
      ].filter(Boolean).join(', ') || 'Standard Transaction'}`);

      // Reset form
      setRecipientAddress('');
      setAmount('');
      setInlineDatum('');
      setReferenceScript('');
      setUseReferenceInputs(false);
      setShowSendForm(false);
      await getWalletUTXOs(wallet);

    } catch (error: any) {
      console.error('❌ CP113 Transaction error:', error);
      alert('CP113 Transaction failed: ' + (error?.message || error));
    } finally {
      setSending(false);
    }
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <button 
            onClick={() => connectWallet('eternl')} 
            disabled={loading}
            style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            {loading ? 'Connecting...' : `Connect Eternl (${network}) - RECOMMENDED`}
          </button>
          
          <button 
            onClick={() => connectWallet('flint')} 
            disabled={loading}
            style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            {loading ? 'Connecting...' : `Connect Flint (${network})`}
          </button>
          
          <button 
            onClick={() => connectWallet('yoroi')} 
            disabled={loading}
            style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            {loading ? 'Connecting...' : `Connect Yoroi (${network}) - LIMITED CP113`}
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <p>✅ Connected to {WALLET_SUPPORT[selectedWallet as keyof typeof WALLET_SUPPORT]?.name || selectedWallet} ({network})</p>
          {selectedWallet && (
            <div style={{ marginBottom: 10, padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
              <p style={{ fontSize: '12px', margin: 0 }}>
                <strong>CP113 Support:</strong> {WALLET_SUPPORT[selectedWallet as keyof typeof WALLET_SUPPORT]?.cp113Support}
              </p>
              <p style={{ fontSize: '11px', margin: 0, color: '#666' }}>
                Features: {WALLET_SUPPORT[selectedWallet as keyof typeof WALLET_SUPPORT]?.features.join(', ')}
              </p>
            </div>
          )}
          {address && (
            <div style={{ marginBottom: 20 }}>
              <p>Your Address: {address.slice(0, 10)}...{address.slice(-10)}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>Full: {address}</p>
            </div>
          )}
          
          {/* Protocol Version & CP113 Status */}
          <div style={{ marginBottom: 20, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <p><strong>Protocol Version:</strong> {protocolVersion || 'Detecting...'}</p>
            {protocolVersion && protocolVersion !== 'Unknown' && protocolVersion !== 'Error' && (
              <div>
                <button 
                  onClick={() => setShowCP113Info(!showCP113Info)}
                  style={{ padding: '5px 10px', fontSize: '12px', marginBottom: 10 }}
                >
                  {showCP113Info ? 'Hide' : 'Show'} CP113 Features
                </button>
                {showCP113Info && (
                  <div style={{ fontSize: '12px', textAlign: 'left' }}>
                    <p><strong>CP113 Features:</strong></p>
                    <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                      {CP113_FEATURES.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <p style={{ fontSize: '11px', color: '#666' }}>{CP113_FEATURES.description}</p>
                  </div>
                )}
              </div>
            )}
          </div>

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

              {/* CP113 Advanced Options */}
              {protocolVersion && protocolVersion !== 'Unknown' && protocolVersion !== 'Error' && (
                <div style={{ marginBottom: 10, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                  <button 
                    onClick={() => setShowAdvancedCP113(!showAdvancedCP113)}
                    style={{ padding: '5px 10px', fontSize: '12px', marginBottom: 10 }}
                  >
                    {showAdvancedCP113 ? 'Hide' : 'Show'} CP113 Advanced Options
                  </button>
                  
                  {showAdvancedCP113 && (
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ marginBottom: '10px' }}>
                        <label>
                          <input
                            type="checkbox"
                            checked={useReferenceInputs}
                            onChange={(e) => setUseReferenceInputs(e.target.checked)}
                            style={{ marginRight: '5px' }}
                          />
                          Use Reference Inputs (CP113)
                        </label>
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label>Inline Datum (CP113):</label>
                        <input
                          type="text"
                          value={inlineDatum}
                          onChange={(e) => setInlineDatum(e.target.value)}
                          placeholder="Optional datum data"
                          style={{ width: '100%', padding: '5px', marginTop: '2px', fontSize: '11px' }}
                        />
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        <label>Reference Script (CP113):</label>
                        <input
                          type="text"
                          value={referenceScript}
                          onChange={(e) => setReferenceScript(e.target.value)}
                          placeholder="Optional script reference"
                          style={{ width: '100%', padding: '5px', marginTop: '2px', fontSize: '11px' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={handleCP113Transaction}
                  disabled={sending || !recipientAddress || !amount || utxos.length === 0}
                  style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  {sending ? 'Sending...' : 'Send CP113 Transaction'}
                </button>
                <button 
                  onClick={handleSendTransaction}
                  disabled={sending || !recipientAddress || !amount || utxos.length === 0}
                  style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  {sending ? 'Sending...' : 'Send Standard Transaction'}
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
              {utxos.length > 0 ? 'Send Transaction (CP113 Ready)' : 'No Test ADA Available'}
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