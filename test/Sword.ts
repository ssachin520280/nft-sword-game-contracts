import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Sword", function () {
  async function deploySwordFixture() {
    // Get the signers
    const [owner, otherAccount] = await hre.ethers.getSigners();

    // Deploy the Sword contract
    const Sword = await hre.ethers.getContractFactory("Sword");
    const sword = await Sword.deploy();

    return { sword, owner, otherAccount };
  }

  describe("Minting", function () {
    it("Should mint a new sword and assign the correct owner", async function () {
      const { sword, owner } = await loadFixture(deploySwordFixture);

      // Mint a new sword
      const mintTx = await sword.mint();
      const tokenId = 0; // First token ID should be 0

      // Verify the owner of the token
      expect(await sword.ownerOf(tokenId)).to.equal(owner.address);
    });

    it("Should increment token IDs correctly", async function () {
      const { sword, owner } = await loadFixture(deploySwordFixture);

      // Mint multiple swords
      await sword.mint();
      await sword.mint();
      await sword.mint();

      // Verify ownership of all tokens
      expect(await sword.ownerOf(0)).to.equal(owner.address);
      expect(await sword.ownerOf(1)).to.equal(owner.address);
      expect(await sword.ownerOf(2)).to.equal(owner.address);
    });

    it("Should allow different accounts to mint", async function () {
      const { sword, owner, otherAccount } = await loadFixture(deploySwordFixture);

      // Mint a sword from another account
      await sword.connect(otherAccount).mint();
      const tokenId = 0;

      // Verify the owner is the other account
      expect(await sword.ownerOf(tokenId)).to.equal(otherAccount.address);
      expect(await sword.ownerOf(tokenId)).to.not.equal(owner.address);
    });
  });
});
