# CP113 (Cardano Protocol 113) Support in Yori Wallet Demo

## Overview

This enhanced Yori wallet demo now includes support for **CP113 (Cardano Protocol 113)** features, which introduces advanced transaction capabilities to the Cardano blockchain.

## CP113 Features Implemented

### 1. Protocol Version Detection
- Automatically detects the Cardano protocol version when connecting to the wallet
- Displays protocol version information in the UI
- Shows CP113 feature availability based on protocol version

### 2. Reference Inputs
- **What it is**: Allows transactions to reference UTXOs without consuming them
- **Benefit**: Enables more efficient transaction structures and complex smart contract interactions
- **Implementation**: Optional checkbox in the transaction form to enable reference inputs

### 3. Inline Datums
- **What it is**: Enables storing datum directly in transaction outputs
- **Benefit**: Reduces transaction size and improves efficiency for smart contracts
- **Implementation**: Text input field to specify inline datum data

### 4. Reference Scripts
- **What it is**: Allows scripts to be referenced rather than included in every transaction
- **Benefit**: Significantly reduces transaction size and fees
- **Implementation**: Text input field to specify reference script

### 5. Enhanced Transaction Structure
- **What it is**: Improved transaction format that supports all CP113 features
- **Benefit**: Better compatibility with modern Cardano applications
- **Implementation**: Separate transaction handler for CP113-enhanced transactions

## How to Use

### 1. Connect to Wallet
1. Install the Yoroi wallet extension
2. Click "Connect Yoroi" button
3. The wallet will automatically detect protocol version and CP113 support

### 2. View CP113 Information
- After connection, you'll see the protocol version displayed
- Click "Show CP113 Features" to see detailed information about available features

### 3. Send CP113 Transactions
1. Click "Send Transaction (CP113 Ready)" button
2. Fill in recipient address and amount
3. Optionally enable CP113 advanced options:
   - **Use Reference Inputs**: Check to enable reference input functionality
   - **Inline Datum**: Enter datum data to be included inline
   - **Reference Script**: Enter script reference data
4. Choose between:
   - **Send CP113 Transaction**: Uses CP113 features if enabled
   - **Send Standard Transaction**: Uses traditional transaction format

## Technical Details

### Protocol Version Detection
```typescript
const detectProtocolVersion = async (walletInstance: any) => {
  const params = await walletInstance.getProtocolParameters();
  const version = params.protocolVersion;
  const supportsCP113 = major >= 8; // Protocol version 8.0.0+
}
```

### CP113 Transaction Structure
```typescript
const transaction = {
  inputs: [...],
  outputs: [...],
  referenceInputs: [...], // CP113 feature
  referenceScripts: [...], // CP113 feature
  // Inline datums are included in outputs
}
```

## Requirements

- Yoroi wallet extension installed
- Cardano network with protocol version 8.0.0 or higher for full CP113 support
- Test ADA for transaction testing (available from Cardano testnet faucet)

## Network Support

- **Preprod**: Full CP113 support (recommended for testing)
- **Mainnet**: Full CP113 support (production use)

## Benefits of CP113

1. **Reduced Transaction Fees**: Reference scripts and inline datums reduce transaction size
2. **Improved Efficiency**: Reference inputs enable more complex transaction structures
3. **Better Smart Contract Support**: Enhanced capabilities for DeFi and dApp development
4. **Future-Proof**: Supports the latest Cardano protocol features

## Troubleshooting

- If CP113 features are not available, ensure you're connected to a network with protocol version 8.0.0+
- Check browser console for detailed error messages
- Ensure Yoroi wallet extension is properly installed and connected

## Development Notes

This implementation demonstrates how to integrate CP113 features into a Cardano wallet application. The code includes:

- Protocol version detection
- Conditional feature availability
- Enhanced transaction structures
- User-friendly interface for CP113 features

The implementation is designed to be backward compatible and will gracefully handle networks that don't support CP113 features.
