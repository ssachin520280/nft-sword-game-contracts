# NFT Sword Game Contracts

A blockchain-based game system where players can mint sword NFTs and import/export them between the game world and their wallet.

## Overview

This project consists of two main smart contracts:
- `Sword`: An ERC721 NFT contract for minting and managing sword tokens
- `World`: A game world contract that can hold NFTs on behalf of players

## Prerequisites

- Node.js v18+
- npm/yarn
- A `.env` file with:
  ```
  SEPOLIA_URL=your_sepolia_rpc_url
  PRIVATE_KEY=your_wallet_private_key
  ```

## Installation

### Install dependencies
```bash
npm install
```

### Run test suite
```bash
npx hardhat test
```

## Deployment

The contracts are deployed using Hardhat Ignition modules. To deploy:

### Deploy to Sepolia testnet
```bash
npx hardhat ignition deploy ./ignition/modules/SwordModule.ts
npx hardhat ignition deploy ./ignition/modules/WorldModule.ts
```

## Contract Interactions

Several scripts are provided to interact with the deployed contracts:

### Check sword NFT balance
```bash
npx hardhat run scripts/checkSwords.ts
```

### Import sword to game world
```bash
npx hardhat run scripts/importSword.ts
```

### Export sword to game world
```bash
npx hardhat run scripts/exportSword.ts
```

## Contract Addresses (Sepolia)

- Sword: 0xb17ef91a01F269229296b42Fd1d82768443fAD18
- World: 0x266B0D35AF7dc889E9bE144ce41EB08568421803

## Testing

The test suite covers:
- Minting new sword NFTs
- Transferring ownership
- Importing/exporting between wallet and game world
- Authorization checks

Run tests with:
```bash
npx hardhat test
```

## Development

The project uses:
- Hardhat for development environment and testing
- OpenZeppelin for NFT implementation
- TypeScript for deployment scripts and tests
- Hardhat Ignition for deployment management

## License

ISC

## Current Implementation and Limitations

### Current Working
The system currently works as follows:
1. Users can mint sword NFTs
2. To move a sword into a game world:
   - Owner must first approve the World contract to handle their NFT
   - Owner then calls `importItem` on the World contract
3. To retrieve a sword from a game world:
   - Original owner calls `exportItem` on the World contract
   - NFT is transferred back to the owner

### Known Limitations
The main limitation is the approval workflow:
- Each World contract requires separate approval for NFT transfers
- For N different worlds, a user needs to make N separate approval transactions
- This becomes costly and cumbersome when:
  - Moving items between multiple worlds
  - Implementing cross-game compatibility
  - Creating new game worlds that want to accept existing swords

### 🤝 Call for Contributions

We're looking for innovative solutions to improve the NFT transfer workflow. Some areas to consider:

1. **Universal Approval System**
   - How can we implement a single approval that works across multiple world contracts?
   - What security considerations need to be addressed?

2. **Smart Contract Architecture**
   - Could a registry or proxy pattern help?
   - How to maintain individual world autonomy while reducing approval friction?

3. **Gas Optimization**
   - How can we minimize the number of transactions needed?
   - What patterns could reduce gas costs for users?

#### How to Contribute
1. Fork the repository
2. Create a new branch for your feature
3. Implement your solution
4. Add tests and documentation
5. Submit a Pull Request with:
   - Detailed description of your approach
   - Gas cost analysis
   - Security considerations
   - Any tradeoffs made

We welcome all creative solutions! Please ensure your PR includes:
- Clean, well-documented code
- Comprehensive test coverage
- Gas optimization analysis
- Security considerations

Join the discussion in our [Issues](https://github.com/ssachin520280/nft-sword-game-contracts/issues) section!



