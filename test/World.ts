import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("World", function () {
  async function deployWorldFixture() {
    // Get the signers
    const [owner, otherAccount] = await hre.ethers.getSigners();

    // Deploy the World contract
    const World = await hre.ethers.getContractFactory("World");
    const world = await World.deploy();

    // Deploy the Sword contract
    const Sword = await hre.ethers.getContractFactory("Sword");
    const sword = await Sword.deploy();

    // Mint a sword for testing
    const mintTx = await sword.mint();
    const tokenId = 0; // First token ID will be 0
    
    // Approve World contract to transfer the sword
    await sword.approve(await world.getAddress(), tokenId);

    return { world, sword, owner, otherAccount, tokenId };
  }

  describe("Item Management", function () {
    it("should import item and verify ownership transfer", async function () {
      const { world, sword, owner, tokenId } = await loadFixture(deployWorldFixture);

      // Check initial ownership
      expect(await sword.ownerOf(tokenId)).to.equal(owner.address);

      // Import the sword into the world
      await world.importItem(await sword.getAddress(), tokenId);

      // Verify the sword is now owned by the World contract
      expect(await sword.ownerOf(tokenId)).to.equal(await world.getAddress());
    });

    it("should prevent unauthorized export and allow owner to export", async function () {
      const { world, sword, owner, otherAccount, tokenId } = await loadFixture(deployWorldFixture);

      // Import the sword first
      await world.importItem(await sword.getAddress(), tokenId);

      // Try to export with other account (should fail)
      await expect(
        world.connect(otherAccount).exportItem(await sword.getAddress(), tokenId)
      ).to.be.revertedWith("You are not the owner of this item");

      // Export with correct owner
      await world.exportItem(await sword.getAddress(), tokenId);

      // Verify the sword is back to original owner
      expect(await sword.ownerOf(tokenId)).to.equal(owner.address);
    });
  });
});
