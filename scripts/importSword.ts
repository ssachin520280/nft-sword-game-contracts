import { ethers } from "hardhat";

async function main() {
  const tokenId = 0; // The token ID we want to import
  const swordAddress = "0xb17ef91a01F269229296b42Fd1d82768443fAD18";
  const worldAddress = "0x266B0D35AF7dc889E9bE144ce41EB08568421803";

  // Get the Sword contract instance
  const sword = await ethers.getContractAt("Sword", swordAddress);
  
  // Get the World contract instance
  const world = await ethers.getContractAt("World", worldAddress);

  console.log("Approving World contract to transfer Sword NFT...");
  const approveTx = await sword.approve(worldAddress, tokenId);
  await approveTx.wait();
  console.log("Approval successful!");

  console.log("Importing Sword into World...");
  const importTx = await world.importItem(swordAddress, tokenId);
  await importTx.wait();
  console.log("Import successful!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
