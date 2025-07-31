# Yoroi Wallet Demo

A React Vite demo application for connecting with Yoroi wallet using the Cardano Connect with Wallet library.

## Features

- 🔗 **Wallet Connection**: Connect to Yoroi wallet seamlessly
- 💰 **Balance Display**: View your current ADA balance
- 📍 **Address Display**: See your wallet address
- 🎨 **Modern UI**: Beautiful, responsive design with glassmorphism effects
- 📱 **Mobile Friendly**: Works perfectly on all device sizes

## Prerequisites

Before running this demo, make sure you have:

1. **Yoroi Wallet Extension**: Install the Yoroi wallet browser extension
   - [Chrome Extension](https://chrome.google.com/webstore/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb)
   - [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/yoroi/)

2. **Node.js**: Version 18 or higher
3. **npm**: Package manager

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd yoroi-wallet-demo
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Demo

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

3. Make sure you have the Yoroi wallet extension installed and set up

4. Click "Connect Yoroi Wallet" to connect your wallet

## How to Use

### Connecting Your Wallet

1. **Install Yoroi Extension**: First, install the Yoroi wallet browser extension
2. **Set Up Wallet**: Create or import a wallet in Yoroi
3. **Connect**: Click the "Connect Yoroi Wallet" button in the demo app
4. **Authorize**: Approve the connection request in your Yoroi wallet

### Viewing Wallet Information

Once connected, you can see:
- **Wallet Type**: Confirms you're connected to Yoroi
- **Wallet Address**: Your Cardano wallet address (truncated for privacy)
- **Balance**: Your current ADA balance in the wallet

### Disconnecting

Click the "Disconnect" button to disconnect your wallet from the demo app.

## Technical Details

This demo uses:
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Cardano Connect with Wallet**: Official Cardano Foundation library for wallet integration
- **CSS3**: Modern styling with gradients, glassmorphism, and responsive design

## Project Structure

```
yoroi-wallet-demo/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Styling for the app
│   ├── main.jsx         # Entry point with wallet provider
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Troubleshooting

### Common Issues

1. **Wallet Not Connecting**:
   - Ensure Yoroi extension is installed and unlocked
   - Check if you're on a supported browser (Chrome, Firefox, Edge)
   - Try refreshing the page and reconnecting

2. **Balance Not Showing**:
   - Make sure your wallet has some ADA
   - Check the browser console for any errors
   - Try disconnecting and reconnecting

3. **Extension Not Detected**:
   - Verify the Yoroi extension is properly installed
   - Try restarting your browser
   - Check if the extension is enabled

### Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Edge
- ❌ Safari (limited support)

## Development

To modify this demo:

1. **Adding Features**: Edit `src/App.jsx` to add new wallet functionality
2. **Styling**: Modify `src/App.css` for custom styling
3. **Dependencies**: Add new packages with `npm install`

## Security Notes

- This is a demo application for educational purposes
- Never share your wallet seed phrase or private keys
- The app only reads wallet information, it cannot send transactions
- Always verify wallet connections in your Yoroi extension

## License

This project is for demo purposes. Feel free to use and modify as needed.

## Support

For issues with:
- **Yoroi Wallet**: Visit [Yoroi Support](https://yoroi-wallet.com/support/)
- **Cardano Connect**: Check [Cardano Foundation Documentation](https://developers.cardano.org/)
- **This Demo**: Open an issue in the project repository
