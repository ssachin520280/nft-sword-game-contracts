import { ethers } from "hardhat";

async function main() {
  // Swords NFT contract address
  const swordsAddress = "0xb17ef91a01F269229296b42Fd1d82768443fAD18";
  
  // Get the first signer (account)
  const [account] = await ethers.getSigners();
//   const account = {address: "0x266B0D35AF7dc889E9bE144ce41EB08568421803"}
  console.log(account.address);

  // Get the Swords contract instance
  const Sword = await ethers.getContractFactory("Sword");
  const sword = Sword.attach(swordsAddress);
  // Get the balance
  const balance = await (sword as any).balanceOf(account.address);
  
  console.log(`NFT Balance for account ${account.address}: ${balance.toString()}`);
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
